# Copyright (c) 2026, mohtashim and contributors
# For license information, please see license.txt

from frappe import _

from quality_addon.quality_addon.report.quality_order_sheet_data import (
	build_progress_data,
	get_merged_rows,
)


def execute(filters=None):
	filters = filters or {}
	columns = get_columns()
	rows = get_merged_rows(filters)
	data = build_progress_data(rows)
	return columns, data


def get_columns():
	return [
		{"label": _("Order Sheet"), "fieldname": "order_sheet", "fieldtype": "Link", "options": "Order Sheet", "width": 170},
		{"label": _("Row Type"), "fieldname": "row_type", "fieldtype": "Data", "width": 95},
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
