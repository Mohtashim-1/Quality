# Copyright (c) 2024, mohtashim and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import flt

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


def _get_bundle_items_for_so_item(so_item):
	"""Return bundle item definitions as [{'item': code, 'pcs': qty}, ...]."""
	if not so_item:
		return []

	bundle_items = []

	try:
		item_doc = frappe.get_doc("Item", so_item)
		combo_items = getattr(item_doc, "custom_product_combo_item", []) or []
		if combo_items:
			for row in combo_items:
				if row.item:
					bundle_items.append({"item": row.item, "pcs": flt(row.pcs) or 1})
			if bundle_items:
				return bundle_items
	except Exception:
		pass

	size_value = None
	variant_attrs = frappe.get_all(
		"Item Variant Attribute",
		filters={"parent": so_item},
		fields=["attribute", "attribute_value"],
	)
	for attr in variant_attrs:
		if attr.attribute and attr.attribute.upper() == "SIZE":
			size_value = attr.attribute_value
			break

	if not size_value:
		return []

	stitching_size = frappe.db.get_value("Stitching Size", size_value, "name")
	if not stitching_size:
		return []

	try:
		stitching_size_doc = frappe.get_doc("Stitching Size", stitching_size)
		for row in stitching_size_doc.combo_detail or []:
			if row.item:
				bundle_items.append({"item": row.item, "pcs": flt(row.pcs) or 1})
	except Exception:
		return []

	return bundle_items


@frappe.whitelist()
def get_order_sheet_details(order_sheet):
	if not order_sheet:
		return {}

	doc = frappe.get_doc("Order Sheet", order_sheet)

	items = []
	for row in doc.get("order_sheet_ct") or []:
		so_item = row.so_item
		if not so_item:
			continue

		article = _ensure_master("Stitching Article", "article", row.stitching_article_no)
		size = _ensure_master("Attribute Size", "size", row.size)
		design = _ensure_master("Stitching Design", "design", row.design) if row.design else None
		color = _ensure_master("Stitching Colour", "colour", row.colour) if row.colour else ""

		bundle_items = _get_bundle_items_for_so_item(so_item)
		if bundle_items:
			for bundle in bundle_items:
				combo_item = bundle.get("item")
				items.append(
					{
						"article": article,
						"size": size,
						"color": color,
						"design": design,
						"so_item": so_item,
						"combo_item": combo_item,
					}
				)
		else:
			items.append(
				{
					"article": article,
					"size": size,
					"color": color,
					"design": design,
					"so_item": so_item,
					"combo_item": None,
				}
			)

	return {
		"items": items,
	}
