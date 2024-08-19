// Copyright (c) 2024, mohtashim and contributors
// For license information, please see license.txt

frappe.query_reports["daily checking report"] = {
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
			"fieldname": "checker",
			"label": __("checker"),
			"fieldtype": "Link",
			"options":"Checker",
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "customer",
			"label": __("Customer"),
			"fieldtype": "Link",
			"options":"Customer",
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "article",
			"label": __("Article"),
			"fieldtype": "Link",
			"options":"Stitching Article",
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "size",
			"label": __("Size"),
			"fieldtype": "Link",
			"options":"Attribute Size",
			"reqd": 0,
			"width": "60px"
		},
		{
			"fieldname": "design",
			"label": __("Design"),
			"fieldtype": "Link",
			"options":"Stitching Design",
			"reqd": 0,
			"width": "60px"
		}
	]
};
