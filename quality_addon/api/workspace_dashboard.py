# Copyright (c) 2026, mohtashim and contributors

import frappe
from frappe import _
from frappe.utils import add_days, flt, getdate, today

from quality_addon.quality_addon.report.quality_order_sheet_data import get_merged_rows


@frappe.whitelist()
def get_workspace_charts_data(from_date=None, to_date=None):
	"""Chart payloads for Quality Addon workspace HTML block."""
	from_date = getdate(from_date) if from_date else add_days(today(), -30)
	to_date = getdate(to_date) if to_date else today()
	filters = {"from_date": from_date, "to_date": to_date}

	kpis = _get_kpis()
	by_source = _get_counts_by_source()
	daily_trend = _get_daily_trend(from_date, to_date)
	defects_by_source = _get_defects_by_source(filters)
	order_sheet_progress = _get_order_sheet_progress(filters)
	inline_by_operator = _get_inline_defects_by_operator(from_date, to_date)

	return {
		"from_date": str(from_date),
		"to_date": str(to_date),
		"kpis": kpis,
		"by_source": by_source,
		"daily_trend": daily_trend,
		"defects_by_source": defects_by_source,
		"order_sheet_progress": order_sheet_progress,
		"inline_by_operator": inline_by_operator,
	}


def _get_kpis():
	return {
		"daily_checking": frappe.db.count("Daily Checking", {"docstatus": ["<", 2]}),
		"inline_stitching": frappe.db.count("Inline Stitching", {"docstatus": ["<", 2]}),
		"final_inspection": frappe.db.count("Final Inspection", {"docstatus": ["<", 2]}),
	}


def _get_counts_by_source():
	return [
		{"name": _("Daily Checking"), "value": frappe.db.count("Daily Checking", {"docstatus": ["<", 2]})},
		{"name": _("Inline Stitching"), "value": frappe.db.count("Inline Stitching", {"docstatus": ["<", 2]})},
		{"name": _("Final Inspection"), "value": frappe.db.count("Final Inspection", {"docstatus": ["<", 2]})},
	]


def _get_daily_trend(from_date, to_date):
	daily = {}
	cur = from_date
	while cur <= to_date:
		daily[str(cur)] = {
			"date": str(cur),
			"daily_checking": 0,
			"inline_stitching": 0,
			"final_inspection": 0,
		}
		cur = add_days(cur, 1)

	for row in frappe.db.sql(
		"""
		SELECT reporting_date AS dt, COUNT(name) AS cnt
		FROM `tabDaily Checking`
		WHERE docstatus < 2 AND reporting_date BETWEEN %s AND %s
		GROUP BY reporting_date
		""",
		(from_date, to_date),
		as_dict=True,
	):
		key = str(row.dt)
		if key in daily:
			daily[key]["daily_checking"] = row.cnt

	for row in frappe.db.sql(
		"""
		SELECT reporting_date AS dt, COUNT(name) AS cnt
		FROM `tabInline Stitching`
		WHERE docstatus < 2 AND reporting_date BETWEEN %s AND %s
		GROUP BY reporting_date
		""",
		(from_date, to_date),
		as_dict=True,
	):
		key = str(row.dt)
		if key in daily:
			daily[key]["inline_stitching"] = row.cnt

	for row in frappe.db.sql(
		"""
		SELECT reporting_date AS dt, COUNT(name) AS cnt
		FROM `tabFinal Inspection`
		WHERE docstatus < 2 AND reporting_date BETWEEN %s AND %s
		GROUP BY reporting_date
		""",
		(from_date, to_date),
		as_dict=True,
	):
		key = str(row.dt)
		if key in daily:
			daily[key]["final_inspection"] = row.cnt

	rows = list(daily.values())
	return {
		"labels": [r["date"] for r in rows],
		"datasets": [
			{"name": _("Daily Checking"), "values": [r["daily_checking"] for r in rows]},
			{"name": _("Inline Stitching"), "values": [r["inline_stitching"] for r in rows]},
			{"name": _("Final Inspection"), "values": [r["final_inspection"] for r in rows]},
		],
	}


def _get_defects_by_source(filters):
	rows = get_merged_rows(filters)
	totals = {}
	for row in rows:
		source = row.get("source") or _("Other")
		totals[source] = totals.get(source, 0) + flt(row.get("defect_qty"))

	return [{"name": k, "value": v} for k, v in sorted(totals.items(), key=lambda x: x[1], reverse=True)]


def _get_order_sheet_progress(filters):
	rows = get_merged_rows(filters)
	totals = {}
	for row in rows:
		os = row.get("order_sheet") or _("Not Set")
		if os not in totals:
			totals[os] = {"plan_qty": 0.0, "inspected_qty": 0.0}
		totals[os]["plan_qty"] += flt(row.get("plan_qty"))
		totals[os]["inspected_qty"] += flt(row.get("inspected_qty"))

	sorted_items = sorted(totals.items(), key=lambda x: x[1]["inspected_qty"], reverse=True)[:8]
	return {
		"labels": [x[0] for x in sorted_items],
		"plan_qty": [flt(x[1]["plan_qty"]) for x in sorted_items],
		"inspected_qty": [flt(x[1]["inspected_qty"]) for x in sorted_items],
	}


def _get_inline_defects_by_operator(from_date, to_date):
	rows = frappe.db.sql(
		"""
		SELECT
			IFNULL(ct.operator_name, 'Not Set') AS operator_name,
			SUM(IFNULL(ct.total_defect_pcs, 0)) AS defect_qty,
			SUM(IFNULL(ct.no_of_pcs, 0)) AS inspected_qty
		FROM `tabInline Stitching` `is`
		INNER JOIN `tabInline Stitching CT` ct ON ct.parent = `is`.name
		WHERE `is`.docstatus < 2
			AND `is`.reporting_date BETWEEN %s AND %s
		GROUP BY ct.operator_name
		ORDER BY defect_qty DESC
		LIMIT 10
		""",
		(from_date, to_date),
		as_dict=True,
	)
	return {
		"labels": [r.operator_name for r in rows],
		"defect_qty": [flt(r.defect_qty) for r in rows],
		"inspected_qty": [flt(r.inspected_qty) for r in rows],
	}
