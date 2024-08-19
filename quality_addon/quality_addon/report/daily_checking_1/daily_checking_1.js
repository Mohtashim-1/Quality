// Copyright (c) 2024, mohtashim and contributors
// For license information, please see license.txt

frappe.query_reports["Daily Checking 1"] = {
	"filters": [
		{
			"fieldname": "from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.add_months(frappe.datetime.get_today(), -1),
			"reqd": 1,
			"width": "60px"
		},
		{
			"fieldname": "to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.get_today(),
			"reqd": 1,
			"width": "60px"
		},
		{
			"fieldname": "checker",
			"label": __("checker"),
			"fieldtype": "Link",
			"options":"Checker",
			"default": "Salman",
			"reqd": 1,
			"width": "60px"
		}
	]
};
