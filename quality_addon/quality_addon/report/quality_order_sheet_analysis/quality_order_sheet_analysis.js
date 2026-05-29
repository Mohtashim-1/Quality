// Copyright (c) 2026, mohtashim and contributors
// For license information, please see license.txt

frappe.query_reports["Quality Order Sheet Analysis"] = {
	filters: [
		{
			fieldname: "from_date",
			label: __("From Date"),
			fieldtype: "Date",
			default: frappe.datetime.add_months(frappe.datetime.get_today(), -1),
			reqd: 1,
		},
		{
			fieldname: "to_date",
			label: __("To Date"),
			fieldtype: "Date",
			default: frappe.datetime.get_today(),
			reqd: 1,
		},
		{
			fieldname: "order_sheet",
			label: __("Order Sheet"),
			fieldtype: "Link",
			options: "Order Sheet",
		},
		{
			fieldname: "article",
			label: __("Article"),
			fieldtype: "Data",
		},
		{
			fieldname: "size",
			label: __("Size"),
			fieldtype: "Data",
		},
		{
			fieldname: "color",
			label: __("Color"),
			fieldtype: "Data",
		},
		{
			fieldname: "design",
			label: __("Design/Combination"),
			fieldtype: "Data",
		},
		{
			fieldname: "operator_name",
			label: __("Operator Name"),
			fieldtype: "Link",
			options: "Machine Operator",
		},
		{
			fieldname: "machine",
			label: __("Machine #"),
			fieldtype: "Link",
			options: "Asset",
		},
		{
			fieldname: "source",
			label: __("Source"),
			fieldtype: "Select",
			options: "\nDaily Checking\nInline Stitching\nFinal Inspection",
		},
	],
};
