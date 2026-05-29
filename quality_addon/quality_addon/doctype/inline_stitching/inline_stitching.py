# Copyright (c) 2024, mohtashim and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class InlineStitching(Document):
	def before_save(self):
		self._apply_header_defaults_to_rows()

	def _apply_header_defaults_to_rows(self):
		for row in self.get("inline_stitching_ct") or []:
			if self.operator_name and not row.operator_name:
				row.operator_name = self.operator_name
			if self.machine and not row.machine:
				row.machine = self.machine


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
		design = _ensure_master("Stitching Design", "design", row.design)
		color = _ensure_master("Stitching Colour", "colour", row.colour) if row.colour else ""
		items.append(
			{
				"article": article,
				"size": size,
				"color": color,
				"design": design,
				"no_of_pcs": row.planned_qty or row.order_qty or 0,
			}
		)

	return {
		"items": items,
	}
