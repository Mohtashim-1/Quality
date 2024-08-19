// Copyright (c) 2024, mohtashim and contributors
// For license information, please see license.txt

frappe.query_reports["Daily Inline stitching Report"] = {
	"filters": [
		{
			"fieldname": "from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.add_months(frappe.datetime.get_today(), -1),
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.get_today(),
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "machine",
			"label": __("Machine"),
			"fieldtype": "Link",
			"options": "Asset",
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "operator",
			"label": __("Operator"),
			"fieldtype": "Link",
			"options": "Machine Operator",
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "article",
			"label": __("Article"),
			"fieldtype": "Link",
			"options": "Stitching Article",
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "size",
			"label": __("Size"),
			"fieldtype": "Link",
			"options": "Attribute Size",
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "design",
			"label": __("Design"),
			"fieldtype": "Link",
			"options": "Stitching Design",
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "inspection_operation",
			"label": __("Inspection Operation"),
			"fieldtype": "Link",
			"options": "Inspection Operation",
			"reqd": 0,
			"width": "60px"
		},
	]
};
