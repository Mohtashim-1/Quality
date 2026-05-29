# Copyright (c) 2026, mohtashim and contributors
# For license information, please see license.txt

from frappe import _
from frappe.utils import flt

from quality_addon.quality_addon.report.quality_order_sheet_data import get_merged_rows


def execute(filters=None):
	filters = filters or {}
	rows = get_merged_rows(filters)
	columns = get_columns()
	data = build_data(rows)
	charts = get_charts(rows)
	summary = get_summary(rows)
	return columns, data, None, charts, summary


def get_columns():
	return [
		{"label": _("Article"), "fieldname": "article", "fieldtype": "Data", "width": 140},
		{"label": _("Size"), "fieldname": "size", "fieldtype": "Data", "width": 100},
		{"label": _("Color"), "fieldname": "color", "fieldtype": "Data", "width": 110},
		{"label": _("Plan Qty"), "fieldname": "plan_qty", "fieldtype": "Float", "width": 110},
		{"label": _("Design/Combination"), "fieldname": "design_combination", "fieldtype": "Data", "width": 200},
		{
			"label": _("Operator Name"),
			"fieldname": "operator_name",
			"fieldtype": "Link",
			"options": "Machine Operator",
			"width": 140,
		},
		{
			"label": _("Machine #"),
			"fieldname": "machine",
			"fieldtype": "Link",
			"options": "Asset",
			"width": 120,
		},
		{"label": _("Inspected Qty"), "fieldname": "inspected_qty", "fieldtype": "Float", "width": 110},
		{"label": _("Defect Qty"), "fieldname": "defect_qty", "fieldtype": "Float", "width": 110},
		{"label": _("Progress %"), "fieldname": "progress_pct", "fieldtype": "Percent", "width": 100},
	]


def build_data(rows):
	return [
		{
			"article": row.get("article"),
			"size": row.get("size"),
			"color": row.get("color"),
			"plan_qty": flt(row.get("plan_qty")),
			"design_combination": row.get("design_combination"),
			"operator_name": row.get("operator_name"),
			"machine": row.get("machine"),
			"inspected_qty": flt(row.get("inspected_qty")),
			"defect_qty": flt(row.get("defect_qty")),
			"progress_pct": row.get("progress_pct") or 0,
		}
		for row in rows
	]


def get_charts(rows):
	if not rows:
		return []

	order_sheet_totals = {}
	for row in rows:
		order_sheet = row.get("order_sheet") or _("Not Set")
		if order_sheet not in order_sheet_totals:
			order_sheet_totals[order_sheet] = {"plan_qty": 0.0, "inspected_qty": 0.0, "defect_qty": 0.0}
		order_sheet_totals[order_sheet]["plan_qty"] += flt(row.get("plan_qty"))
		order_sheet_totals[order_sheet]["inspected_qty"] += flt(row.get("inspected_qty"))
		order_sheet_totals[order_sheet]["defect_qty"] += flt(row.get("defect_qty"))

	sorted_sheets = sorted(
		order_sheet_totals.items(),
		key=lambda item: item[1]["inspected_qty"],
		reverse=True,
	)[:10]

	article_totals = {}
	for row in rows:
		article = row.get("article") or _("Not Set")
		if article not in article_totals:
			article_totals[article] = {"plan_qty": 0.0, "inspected_qty": 0.0}
		article_totals[article]["plan_qty"] += flt(row.get("plan_qty"))
		article_totals[article]["inspected_qty"] += flt(row.get("inspected_qty"))

	sorted_articles = sorted(
		article_totals.items(),
		key=lambda item: item[1]["inspected_qty"],
		reverse=True,
	)[:10]

	return [
		{
			"type": "bar",
			"title": _("Plan Qty vs Inspected Qty by Order Sheet"),
			"data": {
				"labels": [item[0] for item in sorted_sheets],
				"datasets": [
					{"name": _("Plan Qty"), "values": [flt(item[1]["plan_qty"]) for item in sorted_sheets]},
					{"name": _("Inspected Qty"), "values": [flt(item[1]["inspected_qty"]) for item in sorted_sheets]},
				],
			},
		},
		{
			"type": "bar",
			"title": _("Plan Qty vs Inspected Qty by Article"),
			"data": {
				"labels": [item[0] for item in sorted_articles],
				"datasets": [
					{"name": _("Plan Qty"), "values": [flt(item[1]["plan_qty"]) for item in sorted_articles]},
					{"name": _("Inspected Qty"), "values": [flt(item[1]["inspected_qty"]) for item in sorted_articles]},
				],
			},
		},
		{
			"type": "bar",
			"title": _("Defect Qty by Order Sheet"),
			"data": {
				"labels": [item[0] for item in sorted_sheets],
				"datasets": [
					{"name": _("Defect Qty"), "values": [flt(item[1]["defect_qty"]) for item in sorted_sheets]},
				],
			},
		},
	]


def get_summary(rows):
	total_plan = sum(flt(row.get("plan_qty")) for row in rows)
	total_inspected = sum(flt(row.get("inspected_qty")) for row in rows)
	total_defects = sum(flt(row.get("defect_qty")) for row in rows)
	order_sheets = {row.get("order_sheet") for row in rows if row.get("order_sheet")}

	return [
		{"label": _("Order Sheets"), "value": len(order_sheets), "indicator": "Blue"},
		{"label": _("Total Plan Qty"), "value": total_plan, "indicator": "Grey"},
		{"label": _("Total Inspected Qty"), "value": total_inspected, "indicator": "Green"},
		{"label": _("Total Defect Qty"), "value": total_defects, "indicator": "Red"},
		{
			"label": _("Overall Progress %"),
			"value": (total_inspected / total_plan * 100) if total_plan else 0,
			"indicator": "Green" if total_plan and total_inspected >= total_plan else "Orange",
		},
	]
