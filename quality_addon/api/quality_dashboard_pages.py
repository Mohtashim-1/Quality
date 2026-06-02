# Copyright (c) 2026, mohtashim and contributors

"""Dedicated Daily Checking and Inline Stitching dashboard data APIs."""

import frappe
from frappe import _
from frappe.utils import add_days, flt, today

from quality_addon.api.order_sheet_quality_dashboard import (
	_count_parent_docs_filtered,
	_get_trend_filtered,
	_parent_conditions,
	_parse_filters,
)
from quality_addon.quality_addon.report.quality_order_sheet_data import (
	_get_plan_map,
	_lookup_plan_qty,
	design_combination,
)


def _default_dates(filters):
	if not filters.get("from_date") and not filters.get("to_date") and not filters.get("order_sheet"):
		filters["to_date"] = today()
		filters["from_date"] = add_days(filters["to_date"], -30)
	return filters


def _rank_persons(persons):
	persons.sort(key=lambda r: (r["defect_rate"], r["defect_qty"], r["pcs_checked"]), reverse=True)
	for idx, p in enumerate(persons):
		p["rank"] = idx + 1
		if idx == 0 and p["defect_qty"] > 0:
			p["status_key"] = "worst"
			p["status"] = _("Worst")
		elif p["defect_rate"] >= 5:
			p["status_key"] = "high"
			p["status"] = _("High")
		elif p["defect_rate"] > 0:
			p["status_key"] = "watch"
			p["status"] = _("Watch")
		else:
			p["status_key"] = "ok"
			p["status"] = _("OK")
	worst = persons[0] if persons and persons[0].get("defect_qty", 0) > 0 else None
	return persons, worst.get("person") if worst else None


def _aggregate_dimensions(rows, plan_map, person_field=None):
	"""Group rows by article/size/color/design and optional person."""
	dim_agg = {}
	person_agg = {}

	for row in rows:
		order_sheet = row.get("order_sheet") or ""
		article = (row.get("article") or "").strip() or _("Not Set")
		size = (row.get("size") or "").strip() or _("Not Set")
		color = (row.get("color") or "").strip() or _("Not Set")
		design = (row.get("design") or "").strip() or _("Not Set")
		dc = design_combination(design, None) if design != _("Not Set") else ""
		plan_qty = _lookup_plan_qty(plan_map, order_sheet, article, size, color, dc)

		dkey = (order_sheet, article, size, color, design)
		if dkey not in dim_agg:
			dim_agg[dkey] = {
				"order_sheet": order_sheet,
				"article": article,
				"size": size,
				"color": color,
				"design": design,
				"plan_qty": plan_qty,
				"pcs_checked": 0,
				"major": 0,
				"minor": 0,
				"critical": 0,
				"defect_qty": 0,
			}
		entry = dim_agg[dkey]
		entry["pcs_checked"] += flt(row.get("pcs_checked"))
		entry["major"] += flt(row.get("major"))
		entry["minor"] += flt(row.get("minor"))
		entry["critical"] += flt(row.get("critical"))
		entry["defect_qty"] += flt(row.get("defect_qty"))
		if not entry["plan_qty"] and plan_qty:
			entry["plan_qty"] = plan_qty

		if person_field:
			pname = (row.get(person_field) or "").strip() or _("Not Set")
			if pname not in person_agg:
				person_agg[pname] = {
					"person": pname,
					"pcs_checked": 0,
					"major": 0,
					"minor": 0,
					"critical": 0,
					"defect_qty": 0,
					"line_count": 0,
				}
			p = person_agg[pname]
			p["pcs_checked"] += flt(row.get("pcs_checked"))
			p["major"] += flt(row.get("major"))
			p["minor"] += flt(row.get("minor"))
			p["critical"] += flt(row.get("critical"))
			p["defect_qty"] += flt(row.get("defect_qty"))
			p["line_count"] += 1

	details = []
	for entry in dim_agg.values():
		pcs = flt(entry["pcs_checked"])
		defects = flt(entry["defect_qty"])
		plan = flt(entry["plan_qty"])
		entry["defect_rate"] = (defects / pcs * 100) if pcs else 0
		entry["progress_pct"] = (pcs / plan * 100) if plan else 0
		details.append(entry)

	details.sort(key=lambda r: (-r["defect_qty"], r["article"], r["size"]))

	persons = []
	for p in person_agg.values():
		pcs = flt(p["pcs_checked"])
		defects = flt(p["defect_qty"])
		p["defect_rate"] = (defects / pcs * 100) if pcs else 0
		persons.append(p)

	persons, worst_person = _rank_persons(persons)
	return details, persons, worst_person


def _top_dimension_chart(details, field, limit=10):
	buckets = {}
	for row in details:
		label = (row.get(field) or _("Not Set")).strip() or _("Not Set")
		if label not in buckets:
			buckets[label] = {"label": label, "pcs_checked": 0, "defect_qty": 0, "major": 0, "minor": 0}
		buckets[label]["pcs_checked"] += flt(row.get("pcs_checked"))
		buckets[label]["defect_qty"] += flt(row.get("defect_qty"))
		buckets[label]["major"] += flt(row.get("major"))
		buckets[label]["minor"] += flt(row.get("minor"))

	items = sorted(buckets.values(), key=lambda r: -r["defect_qty"])[:limit]
	return {
		"labels": [i["label"] for i in items],
		"pcs_checked": [flt(i["pcs_checked"]) for i in items],
		"defect_qty": [flt(i["defect_qty"]) for i in items],
		"major": [flt(i["major"]) for i in items],
		"minor": [flt(i["minor"]) for i in items],
	}


@frappe.whitelist()
def get_daily_checking_dashboard_data(filters=None):
	"""Daily Checking dashboard: dimensions, severity, checker performance."""
	filters = _default_dates(_parse_filters(filters))
	where, vals = _parent_conditions(filters, "parent_dc")

	rows = frappe.db.sql(
		f"""
		SELECT
			parent_dc.order_sheet,
			COALESCE(NULLIF(TRIM(ct.at_article), ''), NULLIF(TRIM(ct.code), ''), %(unknown)s) AS article,
			COALESCE(NULLIF(TRIM(ct.size), ''), NULLIF(TRIM(ct.finished_size), ''), %(unknown)s) AS size,
			COALESCE(NULLIF(TRIM(ct.color), ''), %(unknown)s) AS color,
			COALESCE(NULLIF(TRIM(ct.at_design), ''), %(unknown)s) AS design,
			COALESCE(NULLIF(TRIM(ct.checker_name), ''), %(unknown)s) AS checker_name,
			GREATEST(COALESCE(ct.audit_qty, 0), COALESCE(ct.sample_qty, 0)) AS pcs_checked,
			COALESCE(ct.major, 0) AS major,
			COALESCE(ct.minor, 0) AS minor,
			COALESCE(ct.critical, 0) AS critical,
			(COALESCE(ct.major, 0) + COALESCE(ct.minor, 0) + COALESCE(ct.critical, 0)) AS defect_qty
		FROM `tabDaily Checking Inspection CT` ct
		INNER JOIN `tabDaily Checking` parent_dc ON ct.parent = parent_dc.name
		WHERE {where}
		""",
		{**vals, "unknown": _("Not Set")},
		as_dict=True,
	)

	order_sheets = sorted({r.order_sheet for r in rows if r.order_sheet})
	plan_map = _get_plan_map(order_sheets)
	details, checkers, worst_checker = _aggregate_dimensions(rows, plan_map, "checker_name")

	pcs = sum(flt(r.pcs_checked) for r in rows)
	major = sum(flt(r.major) for r in rows)
	minor = sum(flt(r.minor) for r in rows)
	critical = sum(flt(r.critical) for r in rows)
	defects = sum(flt(r.defect_qty) for r in rows)

	trend = _get_single_source_trend("Daily Checking", filters)

	return {
		"filters": filters,
		"summary": {
			"pcs_checked": pcs,
			"major": major,
			"minor": minor,
			"critical": critical,
			"total_defects": defects,
			"defect_rate": (defects / pcs * 100) if pcs else 0,
			"document_count": _count_parent_docs_filtered("Daily Checking", filters),
			"line_count": len(rows),
		},
		"by_article": _top_dimension_chart(details, "article"),
		"by_size": _top_dimension_chart(details, "size"),
		"by_color": _top_dimension_chart(details, "color"),
		"by_design": _top_dimension_chart(details, "design"),
		"checker_performance": {
			"persons": checkers,
			"worst_person": worst_checker,
			"person_label": _("Checker"),
		},
		"details": details[:300],
		"trend": trend,
	}


@frappe.whitelist()
def get_inline_stitching_dashboard_data(filters=None):
	"""Inline Stitching dashboard: dimensions, defect pcs, operator performance."""
	filters = _default_dates(_parse_filters(filters))
	where, vals = _parent_conditions(filters, "parent_is")

	rows = frappe.db.sql(
		f"""
		SELECT
			parent_is.order_sheet,
			COALESCE(NULLIF(TRIM(ct.article), ''), %(unknown)s) AS article,
			COALESCE(NULLIF(TRIM(ct.size), ''), %(unknown)s) AS size,
			COALESCE(NULLIF(TRIM(ct.color), ''), %(unknown)s) AS color,
			COALESCE(NULLIF(TRIM(ct.design), ''), %(unknown)s) AS design,
			COALESCE(NULLIF(TRIM(ct.operator_name), ''), %(unknown)s) AS operator_name,
			COALESCE(ct.machine, '') AS machine,
			COALESCE(ct.no_of_pcs, 0) AS pcs_checked,
			0 AS major,
			0 AS minor,
			0 AS critical,
			COALESCE(ct.total_defect_pcs, 0) AS defect_qty
		FROM `tabInline Stitching CT` ct
		INNER JOIN `tabInline Stitching` parent_is ON ct.parent = parent_is.name
		WHERE {where}
		""",
		{**vals, "unknown": _("Not Set")},
		as_dict=True,
	)

	order_sheets = sorted({r.order_sheet for r in rows if r.order_sheet})
	plan_map = _get_plan_map(order_sheets)
	details, operators, worst_operator = _aggregate_dimensions(rows, plan_map, "operator_name")

	pcs = sum(flt(r.pcs_checked) for r in rows)
	defects = sum(flt(r.defect_qty) for r in rows)

	return {
		"filters": filters,
		"summary": {
			"pcs_checked": pcs,
			"major": 0,
			"minor": 0,
			"critical": 0,
			"total_defects": defects,
			"defect_rate": (defects / pcs * 100) if pcs else 0,
			"document_count": _count_parent_docs_filtered("Inline Stitching", filters),
			"line_count": len(rows),
		},
		"by_article": _top_dimension_chart(details, "article"),
		"by_size": _top_dimension_chart(details, "size"),
		"by_color": _top_dimension_chart(details, "color"),
		"by_design": _top_dimension_chart(details, "design"),
		"operator_performance": {
			"persons": operators,
			"worst_person": worst_operator,
			"person_label": _("Operator"),
		},
		"details": details[:300],
		"trend": _get_single_source_trend("Inline Stitching", filters),
	}


def _get_single_source_trend(source_label, filters):
	"""Activity trend for one quality source."""
	from quality_addon.api.order_sheet_quality_dashboard import _SOURCE_DOCTYPE

	doctype = _SOURCE_DOCTYPE.get(source_label)
	if not doctype:
		return {"labels": [], "datasets": []}

	alias = "doc"
	where, values = _parent_conditions(filters, alias)
	rows = frappe.db.sql(
		f"""
		SELECT {alias}.reporting_date AS dt, COUNT({alias}.name) AS cnt
		FROM `tab{doctype}` {alias}
		WHERE {where} AND {alias}.reporting_date IS NOT NULL
		GROUP BY {alias}.reporting_date
		ORDER BY {alias}.reporting_date
		""",
		values,
		as_dict=True,
	)
	return {
		"labels": [str(r.dt) for r in rows],
		"datasets": [{"name": _(source_label), "values": [r.cnt for r in rows]}],
	}
