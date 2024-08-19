# Copyright (c) 2024, mohtashim and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	columns, data = get_column(filters=filters), get_data(filters=filters)
	return columns, data

def get_column(filters=None):
	return [
			"Name:Link/Daily Checking:200",
			"Date:Date:100",
			"Reporting Date:Data:100",
			"Time:Data:100",
			"Inspection Level:Data:100",
			"Aql Major:Data:100",
			"Aql Minor:Data:100",
			"Customer:Link/Customer:100",
			"Article:Data:100" ,
			"Size:Data:100",
			"Design:Data:100",
			"Audit Qty:Data:100",
			"Sample Qty:Data:100",
			"Major:Data:100",
			"Minor:Data:100",
			"Criticla:Data:100",
			"Total:Data:100",
			"Status:Data:100",
			"Checker Name:Data:100",
			"Total Audit:Data:100",
			"Total Minor:Data:100",
			"Total Major:Data:100",
			"Total Critical:Data:100",
			"Total Sample:Data:100",
			"Defect %:Data:100",
			"Remarks:Data:100"
	]

def get_data(filters=None):
    conditions = []
    values = {}

    if filters.get("from_date"):
        conditions.append("isi.date <= %(from_date)s")
        values["from_date"] = filters.get("from_date")
    
    if filters.get("to_date"):
        conditions.append("isi.date >= %(to_date)s")
        values["to_date"] = filters.get("to_date")
        
    if filters.get('checker'):
        conditions.append('dci.checker_name = %(checker)s')
        values['checker'] = filters.get('checker') 
        
    if filters.get('customer'):
        conditions.append('dci.customer = %(customer)s')
        values['customer'] = filters.get('customer')
    if filters.get('article'):
        conditions.append('dci.at_article = %(article)s')
        values['article'] = filters.get('article')
    if filters.get('size'):
        conditions.append('dci.size = %(size)s')
        values['size'] = filters.get('size')
    if filters.get('design'):
        conditions.append('dci.at_design = %(design)s')
        values['design'] = filters.get('design')
        
        
    if filters.get('customer'):
        conditions.append('dci.customer = %(customer)s')
        values['customer'] = filters.get('customer')

    where_clause = " AND ".join(conditions)
    if where_clause:
        where_clause = "WHERE " + where_clause

    data = frappe.db.sql(f"""
        SELECT  
            isi.name AS "Document #",
            isi.date AS "Date",
            isi.reporting_date AS "Reporting Date",
            isi.time AS "Time",
            isi.inspection_level AS "Inspection Level",
            isi.aql_major AS "AQL Major",
            isi.aql_minor AS "AQL Minor",
            dci.customer AS "Customer",
            dci.at_article AS "Article",
            dci.size AS "Size",
            dci.at_design AS "Design",
            dci.audit_qty AS "Audit Qty",
            dci.sample_qty AS "Sample Qty",
            dci.major AS "Major",
            dci.minor AS "Minor",
            dci.critical AS "Critical",
            dci.total_qty AS "Total",
            dci.status AS "Status",
            dci.checker_name AS "Checker Name",
            isi.total_audit AS "Total Audit",
            isi.total_minor AS "Total Minor",
            isi.total_major AS "Total Major",
            isi.total_critical AS "Total Critical",
            isi.total_sample_qty AS "Total Sample Qty",
            (isi.total_major + isi.total_minor + isi.total_critical) AS "Total Defects",
            ((isi.total_major + isi.total_minor + isi.total_critical) / isi.total_audit * 100) AS "Defect Percentage",
            isi.remarks AS "Remarks"
        FROM 
            `tabDaily Checking` AS isi
        LEFT JOIN
            `tabDaily Checking Inspection CT` AS dci
        ON 
            dci.parent = isi.name
        {where_clause}
    """, values)

    return data