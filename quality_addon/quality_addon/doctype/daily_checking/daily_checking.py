# Copyright (c) 2024, mohtashim and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import flt


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


def _base_row_from_order_sheet_ct(doc, row):
	article = _ensure_master("Stitching Article", "article", row.stitching_article_no)
	size = _ensure_master("Attribute Size", "size", row.size)

	return {
		"customer": doc.customer,
		"po": doc.sales_order,
		"at_article": article,
		"size": size,
		"at_design": row.design,
		"finished_size": row.size,
		"color": row.colour,
	}


def _expand_order_sheet_ct_row(doc, row):
	"""One row per combo component when defined; otherwise one finished-item row."""
	so_item = row.so_item
	if not so_item:
		return []

	base = _base_row_from_order_sheet_ct(doc, row)
	order_qty = flt(row.order_qty)
	planned_qty = flt(row.planned_qty)
	bundle_items = _get_bundle_items_for_so_item(so_item)

	if bundle_items:
		items = []
		for bundle in bundle_items:
			combo_item = bundle["item"]
			pcs = flt(bundle["pcs"]) or 1
			calculated_qty = planned_qty * pcs
			items.append(
				{
					**base,
					"so_item": so_item,
					"combo_item": combo_item,
					"code": combo_item,
					"total_qty": calculated_qty or order_qty or 0,
				}
			)
		return items

	return [
		{
			**base,
			"so_item": so_item,
			"combo_item": None,
			"code": so_item,
			"total_qty": planned_qty or order_qty or 0,
		}
	]


@frappe.whitelist()
def get_order_sheet_details(order_sheet):
	if not order_sheet:
		return {}

	doc = frappe.get_doc("Order Sheet", order_sheet)

	items = []
	for row in doc.get("order_sheet_ct") or []:
		items.extend(_expand_order_sheet_ct_row(doc, row))

	return {
		"customer": doc.customer,
		"po": doc.sales_order,
		"items": items,
	}
