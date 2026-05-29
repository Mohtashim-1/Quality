# Copyright (c) 2026, mohtashim and contributors
# Shared data layer: quality_addon inspections grouped by order sheet dimensions.

import frappe
from frappe import _
from frappe.utils import flt


def get_merged_rows(filters=None):
	"""Return aggregated rows keyed by order sheet + article + size + color + design."""
	filters = filters or {}
	raw_rows = []
	raw_rows.extend(_fetch_daily_checking_rows(filters))
	raw_rows.extend(_fetch_inline_stitching_rows(filters))
	raw_rows.extend(_fetch_final_inspection_rows(filters))

	if not raw_rows:
		return []

	raw_rows = _apply_dimension_filters(raw_rows, filters)
	if not raw_rows:
		return []

	order_sheets = sorted({row.get("order_sheet") for row in raw_rows if row.get("order_sheet")})
	plan_map = _get_plan_map(order_sheets)

	aggregated = {}
	for row in raw_rows:
		order_sheet = row.get("order_sheet") or ""
		article = row.get("article") or ""
		size = row.get("size") or ""
		color = row.get("color") or ""
		design_combination = row.get("design_combination") or ""
		operator_name = row.get("operator_name") or ""
		machine = row.get("machine") or ""

		key = (order_sheet, article, size, color, design_combination, operator_name, machine)
		if key not in aggregated:
			plan_qty = _lookup_plan_qty(plan_map, order_sheet, article, size, color, design_combination)
			aggregated[key] = {
				"order_sheet": order_sheet,
				"source": row.get("source"),
				"article": article,
				"size": size,
				"color": color,
				"design_combination": design_combination,
				"operator_name": operator_name,
				"machine": machine,
				"plan_qty": plan_qty,
				"inspected_qty": 0.0,
				"defect_qty": 0.0,
			}

		entry = aggregated[key]
		entry["inspected_qty"] += flt(row.get("inspected_qty"))
		entry["defect_qty"] += flt(row.get("defect_qty"))
		if not entry["plan_qty"]:
			entry["plan_qty"] = flt(row.get("plan_qty"))

	for entry in aggregated.values():
		plan_qty = flt(entry.get("plan_qty"))
		inspected_qty = flt(entry.get("inspected_qty"))
		entry["progress_pct"] = (inspected_qty / plan_qty * 100) if plan_qty else 0

	return sorted(
		aggregated.values(),
		key=lambda r: (r.get("order_sheet") or "", r.get("article") or "", r.get("size") or ""),
	)


def build_progress_data(rows):
	if not rows:
		return []

	order_sheet_totals = {}
	for row in rows:
		order_sheet = row.get("order_sheet") or _("Not Set")
		if order_sheet not in order_sheet_totals:
			order_sheet_totals[order_sheet] = {"plan_qty": 0.0, "inspected_qty": 0.0, "defect_qty": 0.0}
		order_sheet_totals[order_sheet]["plan_qty"] += flt(row.get("plan_qty"))
		order_sheet_totals[order_sheet]["inspected_qty"] += flt(row.get("inspected_qty"))
		order_sheet_totals[order_sheet]["defect_qty"] += flt(row.get("defect_qty"))

	data = []
	current_order_sheet = None

	for row in rows:
		order_sheet = row.get("order_sheet") or _("Not Set")
		if order_sheet != current_order_sheet:
			totals = order_sheet_totals.get(order_sheet, {})
			total_plan = flt(totals.get("plan_qty"))
			total_inspected = flt(totals.get("inspected_qty"))
			data.append(
				{
					"order_sheet": order_sheet,
					"row_type": "Summary",
					"plan_qty": total_plan,
					"inspected_qty": total_inspected,
					"defect_qty": flt(totals.get("defect_qty")),
					"progress_pct": (total_inspected / total_plan * 100) if total_plan else 0,
				}
			)
			current_order_sheet = order_sheet

		plan_qty = flt(row.get("plan_qty"))
		inspected_qty = flt(row.get("inspected_qty"))
		data.append(
			{
				"order_sheet": order_sheet,
				"row_type": "Detail",
				"article": row.get("article"),
				"size": row.get("size"),
				"color": row.get("color"),
				"plan_qty": plan_qty,
				"design_combination": row.get("design_combination"),
				"operator_name": row.get("operator_name"),
				"machine": row.get("machine"),
				"inspected_qty": inspected_qty,
				"defect_qty": flt(row.get("defect_qty")),
				"progress_pct": row.get("progress_pct") or ((inspected_qty / plan_qty * 100) if plan_qty else 0),
				"indent": 1,
			}
		)

	return data


def _fetch_daily_checking_rows(filters):
	conditions = ["dc.docstatus < 2", "IFNULL(dc.order_sheet, '') != ''"]
	values = _date_filters(filters, "dc.reporting_date", conditions)

	rows = frappe.db.sql(
		f"""
		SELECT
			dc.order_sheet,
			COALESCE(NULLIF(ct.at_article, ''), NULLIF(ct.code, '')) AS article,
			COALESCE(NULLIF(ct.size, ''), NULLIF(ct.finished_size, '')) AS size,
			NULLIF(ct.color, '') AS color,
			NULLIF(ct.at_design, '') AS design,
			'' AS combo_item,
			GREATEST(IFNULL(ct.audit_qty, 0), IFNULL(ct.sample_qty, 0)) AS inspected_qty,
			(IFNULL(ct.major, 0) + IFNULL(ct.minor, 0) + IFNULL(ct.critical, 0)) AS defect_qty
		FROM `tabDaily Checking` dc
		INNER JOIN `tabDaily Checking Inspection CT` ct ON ct.parent = dc.name
		WHERE {" AND ".join(conditions)}
		""",
		values,
		as_dict=True,
	)
	return _normalize_rows(rows, source="Daily Checking")


def _fetch_inline_stitching_rows(filters):
	conditions = ["`is`.docstatus < 2", "IFNULL(`is`.order_sheet, '') != ''"]
	values = _date_filters(filters, "`is`.reporting_date", conditions)

	rows = frappe.db.sql(
		f"""
		SELECT
			`is`.order_sheet,
			NULLIF(ct.article, '') AS article,
			NULLIF(ct.size, '') AS size,
			NULLIF(ct.color, '') AS color,
			NULLIF(ct.design, '') AS design,
			'' AS combo_item,
			NULLIF(ct.operator_name, '') AS operator_name,
			NULLIF(ct.machine, '') AS machine,
			IFNULL(ct.no_of_pcs, 0) AS inspected_qty,
			IFNULL(ct.total_defect_pcs, 0) AS defect_qty
		FROM `tabInline Stitching` `is`
		INNER JOIN `tabInline Stitching CT` ct ON ct.parent = `is`.name
		WHERE {" AND ".join(conditions)}
		""",
		values,
		as_dict=True,
	)
	return _normalize_rows(rows, source="Inline Stitching")


def _fetch_final_inspection_rows(filters):
	conditions = ["fi.docstatus < 2", "IFNULL(fi.order_sheet, '') != ''"]
	values = _date_filters(filters, "fi.reporting_date", conditions)

	rows = frappe.db.sql(
		f"""
		SELECT
			fi.order_sheet,
			COALESCE(NULLIF(ct.at_article, ''), NULLIF(ct.item, ''), NULLIF(ct.code, '')) AS article,
			NULLIF(ct.at_finished_size, '') AS size,
			COALESCE(NULLIF(ct.at_color, ''), NULLIF(fi.color, '')) AS color,
			COALESCE(NULLIF(ct.at_design, ''), NULLIF(fi.design, '')) AS design,
			'' AS combo_item,
			GREATEST(IFNULL(ct.audit_qty, 0), IFNULL(ct.qty, 0)) AS inspected_qty,
			(IFNULL(ct.major, 0) + IFNULL(ct.minor, 0) + IFNULL(ct.critical, 0)) AS defect_qty
		FROM `tabFinal Inspection` fi
		INNER JOIN `tabFinal Inspection Report CT` ct ON ct.parent = fi.name
		WHERE {" AND ".join(conditions)}
		""",
		values,
		as_dict=True,
	)
	return _normalize_rows(rows, source="Final Inspection")


def _date_filters(filters, date_field, conditions):
	values = {}
	if filters.get("from_date"):
		conditions.append(f"{date_field} >= %(from_date)s")
		values["from_date"] = filters.get("from_date")
	if filters.get("to_date"):
		conditions.append(f"{date_field} <= %(to_date)s")
		values["to_date"] = filters.get("to_date")
	if filters.get("order_sheet"):
		parts = date_field.split(".")
		parent_alias = parts[0]
		conditions.append(f"{parent_alias}.order_sheet = %(order_sheet)s")
		values["order_sheet"] = filters.get("order_sheet")
	return values


def _apply_dimension_filters(rows, filters):
	if not filters:
		return rows

	filtered = rows
	if filters.get("article"):
		needle = (filters.get("article") or "").lower()
		filtered = [r for r in filtered if needle in (r.get("article") or "").lower()]
	if filters.get("size"):
		needle = (filters.get("size") or "").lower()
		filtered = [r for r in filtered if needle in (r.get("size") or "").lower()]
	if filters.get("color"):
		needle = (filters.get("color") or "").lower()
		filtered = [r for r in filtered if needle in (r.get("color") or "").lower()]
	if filters.get("design"):
		needle = (filters.get("design") or "").lower()
		filtered = [
			r for r in filtered if needle in (r.get("design_combination") or "").lower()
		]
	if filters.get("operator_name"):
		needle = (filters.get("operator_name") or "").lower()
		filtered = [r for r in filtered if needle in (r.get("operator_name") or "").lower()]
	if filters.get("machine"):
		needle = (filters.get("machine") or "").lower()
		filtered = [r for r in filtered if needle in (r.get("machine") or "").lower()]
	if filters.get("source"):
		source = filters.get("source")
		filtered = [r for r in filtered if r.get("source") == source]
	return filtered


def _normalize_rows(rows, source=None):
	normalized = []
	for row in rows:
		operator_name = ""
		machine = ""
		if source == "Inline Stitching":
			operator_name = (row.get("operator_name") or "").strip()
			machine = (row.get("machine") or "").strip()

		normalized.append(
			{
				"order_sheet": row.get("order_sheet"),
				"source": source,
				"article": (row.get("article") or "").strip(),
				"size": (row.get("size") or "").strip(),
				"color": (row.get("color") or "").strip(),
				"design": (row.get("design") or "").strip(),
				"combo_item": (row.get("combo_item") or "").strip(),
				"design_combination": design_combination(row),
				"operator_name": operator_name,
				"machine": machine,
				"inspected_qty": flt(row.get("inspected_qty")),
				"defect_qty": flt(row.get("defect_qty")),
				"plan_qty": 0,
			}
		)
	return normalized


def _get_plan_map(order_sheets):
	if not order_sheets:
		return {}

	plan_rows = frappe.db.sql(
		"""
		SELECT
			parent AS order_sheet,
			stitching_article_no AS article,
			size,
			colour AS color,
			design,
			combo_item,
			IFNULL(planned_qty, 0) AS plan_qty
		FROM `tabOrder Sheet CT`
		WHERE parent IN %(order_sheets)s
		""",
		{"order_sheets": order_sheets},
		as_dict=True,
	)

	plan_map = {}
	for row in plan_rows:
		article = (row.get("article") or "").strip()
		size = (row.get("size") or "").strip()
		color = (row.get("color") or "").strip()
		dc = design_combination(row.get("design"), row.get("combo_item"))

		for key in (
			(row.get("order_sheet"), article, size, color, dc),
			(row.get("order_sheet"), article, size, color, ""),
		):
			if key not in plan_map:
				plan_map[key] = flt(row.get("plan_qty"))

	return plan_map


def _lookup_plan_qty(plan_map, order_sheet, article, size, color, design_combination):
	return (
		plan_map.get((order_sheet, article, size, color, design_combination))
		or plan_map.get((order_sheet, article, size, color, ""))
		or 0
	)


def design_combination(design=None, combo_item=None):
	parts = []
	if design:
		if isinstance(design, dict):
			design = design.get("design")
		parts.append(str(design).strip())
	if combo_item:
		if isinstance(combo_item, dict):
			combo_item = combo_item.get("combo_item")
		parts.append(str(combo_item).strip())
	return " / ".join(parts)
