# Copyright (c) 2024, mohtashim and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
    columns, data = get_columns(filters=filters), get_data(filters=filters)
    return columns, data

def get_columns(filters=None):
    return [
        {
            "label":("Document"),
            "fieldname": "Document",  
            "fieldtype": "Link",
            "options": "Daily Checking",
            "width": 100
        },
        {
            "label":("Date"),
            "fieldname": "Date",  
            "fieldtype": "Date",
            "width": 100
        },
         {
            "label":("Reporting Date"),
            "fieldname": "Reporting Date",  
            "fieldtype": "Date",
            "width": 100
        },
         {
            "label":("Time"),
            "fieldname": "Time",  
            "fieldtype": "Time",
            "width": 100
        },
        {
            "label":("Inspection Level"),
            "fieldname": "Inspection Level",  
            "fieldtype": "Data",
            "width": 100
        },
		{
            "label":("AQL Major"),
            "fieldname": "AQL Major",  
            "fieldtype": "Data",
            "width": 100
        },
        {
            "label":("AQL Minor"),
            "fieldname": "AQL Minor",  
            "fieldtype": "Data",
            "width": 100
        },
        {
            "label":("ID"),
            "fieldname": "ID",  
            "fieldtype": "ID",
            "width": 100
        },
		
    ]

def get_data(filters=None):
    return frappe.db.sql("""
    SELECT
		isi.name AS "Document",
		isi.date AS "Date",
		isi.reporting_date AS "Reporting Date",
		isi.time AS "Time",
		isi.inspection_level AS "Inspection Level",
		isi.aql_major AS "AQL Major",
		isi.aql_minor AS "AQL Minor",
		isi.name AS "ID",
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
		isi.remarks AS "Remarks",
		isi.miss_pick__double_pick_qty AS "Miss Pick",
		isi.fly_yarn_qty AS "Fly Yarn",
		isi.incorrect_construct_qty AS "Incorrect",
		isi.registration_out_qty AS "Registration Out",
		isi.miss_print_qty AS "Miss Print Qty",
		isi.bowing_qty AS "Bowing Qty",
		isi.touching_qty AS "Touching Qty",
		isi.streaks_qty AS "Streaks Qty",
		isi.salvage_qty AS "Salvage Qty",
		isi.smash_qty AS "Smash Qty",
		isi.weaving_qty AS "Weaving Qty",
		isi.cc_qty AS "CC Qty",
		isi.un_cut_qty AS "Uncut Qty",
		isi.nh_qty AS "NH Qty",
		isi.finishing_qty AS "Finishing Qty",
		isi.os_qty AS "OS Qty",
		isi.wm_qty AS "Wash Mark Qty",
		isi.dm_qty AS "DM Qty",
		isi.mwl_qty AS "Missing / Wrong Label Total",
		isi.us_qty AS "Uneven Stitch Total",
		isi.wt_qty AS "Wrong Thread Total",
		isi.p_qty AS "Puckering Total",
		isi.sewing_qty AS "Sewing Other Total", 
		isi.bls_qty AS "Broken / Loose Stitch Total",
		isi.ohs_qty AS "Open Hem / Sem Total",
		isi.bs_qty AS "Bad Stitch Total",
		isi.wd_qty AS "Wrong Direction Total",
		isi.ss_qty1 AS "Short Size Total",
		(isi.miss_pick__double_pick_qty + isi.fly_yarn_qty + isi.incorrect_construct_qty + isi.registration_out_qty + isi.miss_print_qty +
		isi.bowing_qty + isi.touching_qty + isi.streaks_qty + isi.salvage_qty + isi.smash_qty + isi.weaving_qty + isi.cc_qty + isi.un_cut_qty 
		+ isi.nh_qty + isi.finishing_qty + isi.os_qty + isi.wm_qty + isi.dm_qty + isi.mwl_qty + isi.us_qty + isi.wt_qty + isi.p_qty +
		isi.sewing_qty + isi.bls_qty + isi.ohs_qty + isi.bs_qty + isi.wd_qty + isi.ss_qty1) AS "Defects Total"
	FROM 
		`tabDaily Checking` AS isi
	JOIN
		`tabDaily Checking Inspection CT` AS dci
	ON 
		dci.parent = isi.name
    """, as_dict=1)