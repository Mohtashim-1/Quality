# Copyright (c) 2024, mohtashim and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class FinalInspection(Document):
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
	designs = []
	colors = []

	for row in doc.get("order_sheet_ct") or []:
		article = _ensure_master("Stitching Article", "article", row.stitching_article_no)
		if row.design:
			designs.append(row.design)
		if row.colour:
			colors.append(row.colour)
		items.append(
			{
				"code": row.so_item,
				"item": row.so_item,
				"at_finished_size": row.size,
				"qty": row.order_qty or row.planned_qty or 0,
				"at_color": row.colour,
				"at_article": article,
				"at_design": row.design,
			}
		)

	return {
		"customer": doc.customer,
		"po": doc.sales_order,
		"order_qty": doc.total_order_qty,
		"design": ", ".join(sorted({d for d in designs if d})),
		"color": ", ".join(sorted({c for c in colors if c})),
		"items": items,
	}
