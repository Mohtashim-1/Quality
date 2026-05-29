# Copyright (c) 2026, mohtashim and contributors

import json

import frappe
from frappe import _
from frappe.utils import add_days, flt, today

from quality_addon.quality_addon.report.quality_order_sheet_data import (
	_fetch_daily_checking_rows,
	_fetch_final_inspection_rows,
	_fetch_inline_stitching_rows,
	build_progress_data,
	get_merged_rows,
)


@frappe.whitelist()
def get_order_sheet_quality_dashboard(order_sheet, from_date=None, to_date=None):
	"""Quality dashboard for a single Order Sheet — all linked quality data, no date filter."""
	if not order_sheet:
		frappe.throw(_("Order Sheet is required"))

	if not frappe.db.exists("Order Sheet", order_sheet):
		frappe.throw(_("Order Sheet {0} not found").format(order_sheet))

	frappe.has_permission("Order Sheet", doc=order_sheet, ptype="read", throw=True)

	# Always scope to this order sheet only (ignore date filters for form dashboard).
	filters = {"order_sheet": order_sheet}

	merged_rows = get_merged_rows(filters)
	by_source = _aggregate_by_source(filters)
	summary = _build_summary(order_sheet, merged_rows, by_source)
	details = _build_details(merged_rows)
	trend = _get_trend(order_sheet)
	documents = _get_linked_documents(order_sheet)
	filters = {"order_sheet": order_sheet}
	defect_categories = _get_defect_categories(filters)
	inspection_summary = _get_inspection_summary(filters)
	operator_performance = _get_operator_performance(filters)

	return {
		"order_sheet": order_sheet,
		"summary": summary,
		"by_source": by_source,
		"details": details,
		"trend": trend,
		"documents": documents,
		"progress_rows": build_progress_data(merged_rows),
		"defect_categories": defect_categories,
		"inspection_summary": inspection_summary,
		"operator_performance": operator_performance,
	}


def _parse_filters(filters=None):
	if filters is None:
		return {}
	if isinstance(filters, str):
		try:
			filters = json.loads(filters)
		except (json.JSONDecodeError, TypeError):
			filters = {}
	return filters or {}


def _parent_conditions(filters, parent_alias, date_field="reporting_date"):
	"""Build WHERE clause + values for parent quality documents."""
	conditions = [f"{parent_alias}.docstatus < 2"]
	values = {}
	if filters.get("order_sheet"):
		conditions.append(f"{parent_alias}.order_sheet = %(order_sheet)s")
		values["order_sheet"] = filters["order_sheet"]
	if filters.get("from_date"):
		conditions.append(f"{parent_alias}.{date_field} >= %(from_date)s")
		values["from_date"] = filters["from_date"]
	if filters.get("to_date"):
		conditions.append(f"{parent_alias}.{date_field} <= %(to_date)s")
		values["to_date"] = filters["to_date"]
	return " AND ".join(conditions), values


@frappe.whitelist()
def get_quality_dashboard_data(filters=None):
	"""Standalone Quality Dashboard page — filters: from_date, to_date, order_sheet (optional)."""
	filters = _parse_filters(filters)
	if not filters.get("from_date") and not filters.get("to_date") and not filters.get("order_sheet"):
		filters["to_date"] = today()
		filters["from_date"] = add_days(filters["to_date"], -30)

	merged_rows = get_merged_rows(filters)
	by_source = _aggregate_by_source(filters)
	inspection_summary = _get_inspection_summary(filters)
	operator_performance = _get_operator_performance(filters)
	defect_categories = _get_defect_categories(filters)
	trend = _get_trend_filtered(filters)

	inspected_qty = flt(inspection_summary.get("pcs_checked"))
	defect_qty = flt(inspection_summary.get("total_defects"))

	doc_counts = {}
	for label, doctype in _SOURCE_DOCTYPE.items():
		doc_counts[label] = _count_parent_docs_filtered(doctype, filters)

	return {
		"filters": filters,
		"summary": {
			"pcs_checked": inspected_qty,
			"major": flt(inspection_summary.get("major")),
			"minor": flt(inspection_summary.get("minor")),
			"critical": flt(inspection_summary.get("critical")),
			"total_defects": defect_qty,
			"defect_rate": flt(inspection_summary.get("defect_rate")),
			"daily_checking_count": doc_counts.get("Daily Checking", 0),
			"inline_stitching_count": doc_counts.get("Inline Stitching", 0),
			"final_inspection_count": doc_counts.get("Final Inspection", 0),
		},
		"by_source": by_source,
		"inspection_summary": inspection_summary,
		"operator_performance": operator_performance,
		"defect_categories": defect_categories,
		"trend": trend,
		"details": _build_details(merged_rows)[:200],
	}


def _get_inspection_summary(filters):
	"""Total pcs checked and severity totals from all quality child tables."""
	dc_where, dc_vals = _parent_conditions(filters, "parent_dc")
	inline_where, inline_vals = _parent_conditions(filters, "parent_is")
	fi_where, fi_vals = _parent_conditions(filters, "parent_fi")

	dc = frappe.db.sql(
		f"""
		SELECT
			SUM(GREATEST(COALESCE(ct.audit_qty, 0), COALESCE(ct.sample_qty, 0))) AS pcs_checked,
			SUM(COALESCE(ct.major, 0)) AS major,
			SUM(COALESCE(ct.minor, 0)) AS minor,
			SUM(COALESCE(ct.critical, 0)) AS critical,
			SUM(COALESCE(ct.major, 0) + COALESCE(ct.minor, 0) + COALESCE(ct.critical, 0)) AS defect_qty
		FROM `tabDaily Checking Inspection CT` ct
		INNER JOIN `tabDaily Checking` parent_dc ON ct.parent = parent_dc.name
		WHERE {dc_where}
		""",
		dc_vals,
		as_dict=True,
	)
	inline = frappe.db.sql(
		f"""
		SELECT
			SUM(COALESCE(ct.no_of_pcs, 0)) AS pcs_checked,
			SUM(COALESCE(ct.total_defect_pcs, 0)) AS defect_qty
		FROM `tabInline Stitching CT` ct
		INNER JOIN `tabInline Stitching` parent_is ON ct.parent = parent_is.name
		WHERE {inline_where}
		""",
		inline_vals,
		as_dict=True,
	)
	fi = frappe.db.sql(
		f"""
		SELECT
			SUM(GREATEST(COALESCE(ct.audit_qty, 0), COALESCE(ct.qty, 0))) AS pcs_checked,
			SUM(COALESCE(ct.major, 0)) AS major,
			SUM(COALESCE(ct.minor, 0)) AS minor,
			SUM(COALESCE(ct.critical, 0)) AS critical,
			SUM(COALESCE(ct.major, 0) + COALESCE(ct.minor, 0) + COALESCE(ct.critical, 0)) AS defect_qty
		FROM `tabFinal Inspection Report CT` ct
		INNER JOIN `tabFinal Inspection` parent_fi ON ct.parent = parent_fi.name
		WHERE {fi_where}
		""",
		fi_vals,
		as_dict=True,
	)

	def _row(rows):
		return rows[0] if rows else {}

	d = _row(dc)
	i = _row(inline)
	f = _row(fi)

	pcs = flt(d.get("pcs_checked")) + flt(i.get("pcs_checked")) + flt(f.get("pcs_checked"))
	major = flt(d.get("major")) + flt(f.get("major"))
	minor = flt(d.get("minor")) + flt(f.get("minor"))
	critical = flt(d.get("critical")) + flt(f.get("critical"))
	defect_qty = flt(d.get("defect_qty")) + flt(i.get("defect_qty")) + flt(f.get("defect_qty"))
	severity_total = major + minor + critical

	return {
		"pcs_checked": pcs,
		"major": major,
		"minor": minor,
		"critical": critical,
		"total_defects": defect_qty,
		"severity_total": severity_total,
		"defect_rate": (defect_qty / pcs * 100) if pcs else 0,
		"by_source": {
			"Daily Checking": {
				"pcs_checked": flt(d.get("pcs_checked")),
				"major": flt(d.get("major")),
				"minor": flt(d.get("minor")),
				"critical": flt(d.get("critical")),
				"defect_qty": flt(d.get("defect_qty")),
			},
			"Inline Stitching": {
				"pcs_checked": flt(i.get("pcs_checked")),
				"major": 0,
				"minor": 0,
				"critical": 0,
				"defect_qty": flt(i.get("defect_qty")),
			},
			"Final Inspection": {
				"pcs_checked": flt(f.get("pcs_checked")),
				"major": flt(f.get("major")),
				"minor": flt(f.get("minor")),
				"critical": flt(f.get("critical")),
				"defect_qty": flt(f.get("defect_qty")),
			},
		},
	}


def _get_operator_performance(filters):
	"""Operator / checker wise pcs, severity, and defects — sorted worst first."""
	rows = []
	unknown = _("Not Set")
	dc_where, dc_vals = _parent_conditions(filters, "parent_dc")
	inline_where, inline_vals = _parent_conditions(filters, "parent_is")
	dc_vals["unknown"] = unknown
	inline_vals["unknown"] = unknown

	dc_rows = frappe.db.sql(
		f"""
		SELECT
			COALESCE(NULLIF(TRIM(ct.checker_name), ''), %(unknown)s) AS person_name,
			'Daily Checking' AS source,
			SUM(GREATEST(COALESCE(ct.audit_qty, 0), COALESCE(ct.sample_qty, 0))) AS pcs_checked,
			SUM(COALESCE(ct.major, 0)) AS major,
			SUM(COALESCE(ct.minor, 0)) AS minor,
			SUM(COALESCE(ct.critical, 0)) AS critical,
			SUM(COALESCE(ct.major, 0) + COALESCE(ct.minor, 0) + COALESCE(ct.critical, 0)) AS defect_qty,
			COUNT(*) AS line_count
		FROM `tabDaily Checking Inspection CT` ct
		INNER JOIN `tabDaily Checking` parent_dc ON ct.parent = parent_dc.name
		WHERE {dc_where}
		GROUP BY COALESCE(NULLIF(TRIM(ct.checker_name), ''), %(unknown)s)
		""",
		dc_vals,
		as_dict=True,
	)
	rows.extend(dc_rows)

	inline_rows = frappe.db.sql(
		f"""
		SELECT
			COALESCE(NULLIF(TRIM(ct.operator_name), ''), %(unknown)s) AS person_name,
			'Inline Stitching' AS source,
			SUM(COALESCE(ct.no_of_pcs, 0)) AS pcs_checked,
			0 AS major,
			0 AS minor,
			0 AS critical,
			SUM(COALESCE(ct.total_defect_pcs, 0)) AS defect_qty,
			COUNT(*) AS line_count
		FROM `tabInline Stitching CT` ct
		INNER JOIN `tabInline Stitching` parent_is ON ct.parent = parent_is.name
		WHERE {inline_where}
		GROUP BY COALESCE(NULLIF(TRIM(ct.operator_name), ''), %(unknown)s)
		""",
		inline_vals,
		as_dict=True,
	)
	rows.extend(inline_rows)

	merged = {}
	for row in rows:
		name = row.person_name or _("Not Set")
		if name not in merged:
			merged[name] = {
				"operator": name,
				"sources": [],
				"pcs_checked": 0,
				"major": 0,
				"minor": 0,
				"critical": 0,
				"defect_qty": 0,
				"line_count": 0,
			}
		entry = merged[name]
		src = row.source
		if src and src not in entry["sources"]:
			entry["sources"].append(src)
		entry["pcs_checked"] += flt(row.pcs_checked)
		entry["major"] += flt(row.major)
		entry["minor"] += flt(row.minor)
		entry["critical"] += flt(row.critical)
		entry["defect_qty"] += flt(row.defect_qty)
		entry["line_count"] += int(row.line_count or 0)

	operators = []
	for entry in merged.values():
		pcs = flt(entry["pcs_checked"])
		defects = flt(entry["defect_qty"])
		severity = flt(entry["major"]) + flt(entry["minor"]) + flt(entry["critical"])
		rate = (defects / pcs * 100) if pcs else 0
		operators.append(
			{
				"operator": entry["operator"],
				"sources": ", ".join(entry["sources"]) or "—",
				"pcs_checked": pcs,
				"major": flt(entry["major"]),
				"minor": flt(entry["minor"]),
				"critical": flt(entry["critical"]),
				"severity_total": severity,
				"defect_qty": defects,
				"defect_rate": rate,
				"line_count": entry["line_count"],
			}
		)

	# Worst = highest defect rate (min pcs threshold), then highest defect qty
	operators.sort(
		key=lambda r: (r["defect_rate"], r["defect_qty"], r["pcs_checked"]),
		reverse=True,
	)

	for idx, op in enumerate(operators):
		op["rank"] = idx + 1
		if idx == 0 and (op["defect_qty"] > 0 or op["defect_rate"] > 0):
			op["status_key"] = "worst"
			op["status"] = _("Worst")
		elif op["defect_rate"] >= 5:
			op["status_key"] = "high"
			op["status"] = _("High")
		elif op["defect_rate"] > 0:
			op["status_key"] = "watch"
			op["status"] = _("Watch")
		else:
			op["status_key"] = "ok"
			op["status"] = _("OK")

	worst = operators[0] if operators and operators[0].get("defect_qty", 0) > 0 else None

	return {
		"operators": operators,
		"worst_operator": worst.get("operator") if worst else None,
		"worst_defect_rate": worst.get("defect_rate") if worst else 0,
	}


def _get_defect_categories(filters):
	"""Weaving / finishing / sewing defect qty totals from child inspection rows."""
	from quality_addon.quality_addon.page.daily_stitching_dash.daily_stitching_dash import (
		get_defect_breakdown,
	)

	breakdown_filters = {}
	if filters.get("order_sheet"):
		breakdown_filters["order_sheet"] = filters["order_sheet"]
	if filters.get("from_date"):
		breakdown_filters["from_date"] = filters["from_date"]
	if filters.get("to_date"):
		breakdown_filters["to_date"] = filters["to_date"]

	raw_rows = get_defect_breakdown(breakdown_filters)
	if not raw_rows or not raw_rows[0]:
		return {"weaving": {}, "finishing": {}, "sewing": {}, "totals": {}}

	r = raw_rows[0]

	def _n(key):
		return flt(r.get(key))

	weaving = {
		"miss_pick": _n("miss_pick_total"),
		"fly_yarn": _n("fly_yarn_total"),
		"incorrect_construct": _n("incorrect_total"),
		"registration_out": _n("reg_out_total"),
		"miss_print": _n("miss_print_total"),
		"bowing": _n("bowing_total"),
		"touching": _n("touching_total"),
		"streaks": _n("streaks_total"),
		"salvage": _n("salvage_total"),
		"smash": _n("smash_total"),
		"weaving_other": _n("owp_total"),
	}
	finishing = {
		"clipper_cut": _n("cc_total"),
		"un_cut": _n("un_cut_total"),
		"needle_hole": _n("nh_total"),
		"finishing_other": _n("finishing_other_total"),
		"oil_stain": _n("os_total"),
		"wash_mark": _n("wm_total"),
		"dust_mark": _n("dm_total"),
	}
	sewing = {
		"missing_wrong_label": _n("mwl_total"),
		"uneven_stitch": _n("us_total"),
		"wrong_thread": _n("wt_total"),
		"puckering": _n("p_total"),
		"sewing_other": _n("sewing_other_total"),
		"broken_loose_stitch": _n("bls_total"),
		"open_hem_sem": _n("ohs_total"),
		"bad_stitch": _n("bs_total"),
		"short_size": _n("ss_total"),
		"wrong_direction": _n("wd_total"),
	}

	tw = sum(weaving.values())
	tf = sum(finishing.values())
	ts = sum(sewing.values())

	return {
		"weaving": weaving,
		"finishing": finishing,
		"sewing": sewing,
		"totals": {
			"weaving": tw,
			"finishing": tf,
			"sewing": ts,
			"all": tw + tf + ts,
		},
	}


def _aggregate_by_source(filters):
	sources = [
		("Daily Checking", _fetch_daily_checking_rows),
		("Inline Stitching", _fetch_inline_stitching_rows),
		("Final Inspection", _fetch_final_inspection_rows),
	]
	result = []
	for label, fetch_fn in sources:
		rows = fetch_fn(filters)
		result.append(
			{
				"source": label,
				"inspected_qty": sum(flt(r.get("inspected_qty")) for r in rows),
				"defect_qty": sum(flt(r.get("defect_qty")) for r in rows),
				"line_count": len(rows),
			}
		)
	return result


def _build_summary(order_sheet, merged_rows, by_source):
	plan_qty = flt(frappe.db.get_value("Order Sheet", order_sheet, "total_planned_qty"))
	inspected_qty = sum(flt(r.get("inspected_qty")) for r in merged_rows)
	defect_qty = sum(flt(r.get("defect_qty")) for r in merged_rows)
	progress_pct = (inspected_qty / plan_qty * 100) if plan_qty else 0

	doc_counts = {}
	for label, doctype in _SOURCE_DOCTYPE.items():
		doc_counts[label] = _count_parent_docs(doctype, order_sheet)

	return {
		"plan_qty": plan_qty,
		"order_qty": flt(frappe.db.get_value("Order Sheet", order_sheet, "total_order_qty")),
		"inspected_qty": inspected_qty,
		"defect_qty": defect_qty,
		"progress_pct": progress_pct,
		"daily_checking_count": doc_counts.get("Daily Checking", 0),
		"inline_stitching_count": doc_counts.get("Inline Stitching", 0),
		"final_inspection_count": doc_counts.get("Final Inspection", 0),
	}


def _build_details(merged_rows):
	details = []
	for row in merged_rows:
		plan_qty = flt(row.get("plan_qty"))
		inspected_qty = flt(row.get("inspected_qty"))
		details.append(
			{
				"source": row.get("source") or "",
				"article": row.get("article") or "",
				"size": row.get("size") or "",
				"color": row.get("color") or "",
				"design_combination": row.get("design_combination") or "",
				"operator_name": row.get("operator_name") or "",
				"machine": row.get("machine") or "",
				"plan_qty": plan_qty,
				"inspected_qty": inspected_qty,
				"defect_qty": flt(row.get("defect_qty")),
				"progress_pct": flt(row.get("progress_pct"))
				or ((inspected_qty / plan_qty * 100) if plan_qty else 0),
			}
		)
	return sorted(
		details,
		key=lambda r: (
			r.get("source") or "",
			r.get("article") or "",
			r.get("size") or "",
		),
	)


def _get_trend(order_sheet):
	return _get_trend_filtered({"order_sheet": order_sheet})


def _get_trend_filtered(filters):
	"""Activity counts by reporting date."""
	_chart_keys = {
		"Daily Checking": "daily_checking",
		"Inline Stitching": "inline_stitching",
		"Final Inspection": "final_inspection",
	}

	daily = {}
	for label, doctype in _SOURCE_DOCTYPE.items():
		chart_key = _chart_keys[label]
		alias = "doc"
		where, values = _parent_conditions(filters, alias)
		rows = frappe.db.sql(
			f"""
			SELECT {alias}.reporting_date AS dt, COUNT({alias}.name) AS cnt
			FROM `tab{doctype}` {alias}
			WHERE {where}
				AND {alias}.reporting_date IS NOT NULL
			GROUP BY {alias}.reporting_date
			ORDER BY {alias}.reporting_date
			""",
			values,
			as_dict=True,
		)
		for row in rows:
			dt = str(row.dt)
			if dt not in daily:
				daily[dt] = {
					"date": dt,
					"daily_checking": 0,
					"inline_stitching": 0,
					"final_inspection": 0,
				}
			daily[dt][chart_key] = row.cnt

	rows = [daily[k] for k in sorted(daily.keys())]
	return {
		"labels": [r["date"] for r in rows],
		"datasets": [
			{"name": _("Daily Checking"), "values": [r["daily_checking"] for r in rows]},
			{"name": _("Inline Stitching"), "values": [r["inline_stitching"] for r in rows]},
			{"name": _("Final Inspection"), "values": [r["final_inspection"] for r in rows]},
		],
	}


_SOURCE_DOCTYPE = {
	"Daily Checking": "Daily Checking",
	"Inline Stitching": "Inline Stitching",
	"Final Inspection": "Final Inspection",
}


def _get_linked_documents(order_sheet):
	out = {}
	for label, doctype in _SOURCE_DOCTYPE.items():
		conditions = ["order_sheet = %(order_sheet)s", "docstatus < 2"]
		values = {"order_sheet": order_sheet}

		rows = frappe.db.sql(
			f"""
			SELECT name, reporting_date, docstatus
			FROM `tab{doctype}`
			WHERE {" AND ".join(conditions)}
			ORDER BY reporting_date DESC, modified DESC
			LIMIT 25
			""",
			values,
			as_dict=True,
		)
		out[label] = rows
	return out


def _count_parent_docs(doctype, order_sheet):
	return _count_parent_docs_filtered(doctype, {"order_sheet": order_sheet})


def _count_parent_docs_filtered(doctype, filters):
	alias = "doc"
	where, values = _parent_conditions(filters, alias)
	return frappe.db.sql(
		f"""
		SELECT COUNT({alias}.name)
		FROM `tab{doctype}` {alias}
		WHERE {where}
		""",
		values,
	)[0][0]
