# Copyright (c) 2024, mohtashim and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class DailyChecking(Document):
	pass


def _ensure_master(doctype, fieldname, value):
	if not value:
		return value

	existing = frappe.db.get_value(doctype, {fieldname: value}, "name")
	if existing:
		return existing

	doc = frappe.new_doc(doctype)
	doc.set(fieldname, value)
	doc.insert(ignore_permissions=True)
	return doc.name


@frappe.whitelist()
def get_order_sheet_details(order_sheet):
	if not order_sheet:
		return {}

	doc = frappe.get_doc("Order Sheet", order_sheet)

	items = []
	for row in doc.get("order_sheet_ct") or []:
		article = _ensure_master("Stitching Article", "article", row.stitching_article_no)
		size = _ensure_master("Attribute Size", "size", row.size)
		items.append(
			{
				"customer": doc.customer,
				"po": doc.sales_order,
				"at_article": article,
				"size": size,
				"at_design": row.design,
				"total_qty": row.order_qty or row.planned_qty or 0,
				"finished_size": row.size,
				"color": row.colour,
				"code": row.so_item,
			}
		)

	return {
		"customer": doc.customer,
		"po": doc.sales_order,
		"items": items,
	}
