# Copyright (c) 2024, mohtashim and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	columns, data = get_column(filters=filters), get_data(filters=filters)
	return columns, data

def get_column(filters=None):
	return [
		"Reporting Date:Data:100",
		"Name:Data:100",
		"Operator Name:Data:100",
		"Machine:Data:100",
		"Total Defect Pcs:Data:100",
		"Double Stitch:Data:100",
		"Open Seam:Data:100",
		"Loose Stitch:Data:100",
		"Oil Stain:Data:100",
		"Overlap Feb:Data:100",
		"Puckering:Data:100",
		"Raw Edge:Data:100",
		"Defect Qty:Data:100",
		"Uneven Stitch:Data:100",
		"Bad Stitch:Data:100",
		"Open Safety:Data:100",
		"Skip Stitch:Data:100",
		"Boot Mark:Data:100",
		"Damage:Data:100",
		"Wrong Direction:Data:100",
		"Number of label Missing:Data:100"
	]

def get_data(filters=None):
	conditions = []
	values = {}

	if filters.get('from_date'):
		conditions.append('isi.date <= %(from_date)s')
		values["from_date"] = filters.get("from_date")
	

	if filters.get('to_date'):
		conditions.append('isi.date <= %(to_date)s')
		values["to_date"] = filters.get("to_date")

	if filters.get('machine'):
		conditions.append('isct.machine = %(machine)s')
		values["machine"] = filters.get("machine")

	if filters.get('operator'):
		conditions.append('isct.operator_name = %(operator)s')
		values["operator"] = filters.get("operator")

	if filters.get('article'):
		conditions.append('isct.article = %(article)s')
		values["article"] = filters.get("article")

	if filters.get('size'):
		conditions.append('isct.size = %(size)s')
		values["size"] = filters.get("size")
	
	if filters.get('design'):
		conditions.append('isct.design = %(design)s')
		values["design"] = filters.get("design")
	
	if filters.get('inspection_operation'):
		conditions.append('isct.operation = %(inspection_operation)s')
		values["inspection_operation"] = filters.get("inspection_operation")

	where_clause = " AND ".join(conditions)
	if where_clause:
		where_clause = "WHERE " + where_clause

	data = frappe.db.sql(f"""
		SELECT 
		isi.reporting_date as "Date",
		isi.name as "ID",
		isct.operator_name as "Operator Name:Data:100",
		isct.machine as "Machine:Link/Machine",
		SUM(isct.total_defect_pcs) as "Total Defects",
		SUM(isct.double_stitch) as "Double Stitch",
		SUM(isct.open_seam) as "Open Seam",
		SUM(isct.loose_stitch) as "Loose Stitch",
		SUM(isct.oil_stain) as "Oil Stain",
		SUM(isct.overlap_feb) as "Overlap Feb",
		SUM(isct.puckering) as "Puckering",
		SUM(isct.raw_edge) as "Raw Edge",
		SUM(isct.defects_qty) as "Defects Qty",
		SUM(isct.uneven_stitch) as "Uneven Stitch",
		SUM(isct.bad_stitch) as "Bad Stitch",
		SUM(isct.open_safty) as "Open Safty",
		SUM(isct.skip_stitch) as "Skip Stitch",
		SUM(isct.boot_mark) as "Boot Mark",
		SUM(isct.damage) as "Damage",
		SUM(isct.wrong_direction) as "Wrong Direction",
		SUM(isct.number_label_missing) as "Number Label Missing",
		isi.date as "Date",
		isct.article as "Article",
		isct.size as "Size",
		isct.design as "Design",
		isct.operation as "Inspection Operation"
		FROM
			`tabInline Stitching` as isi
		JOIN `tabInline Stitching CT` as isct 
		ON
			isct.parent = isi.name
					  {where_clause}
		GROUP BY
			isct.machine,isct.name,isi.name
		ORDER BY
			isct.total_defect_pcs DESC
					  
		""", values)

	return data