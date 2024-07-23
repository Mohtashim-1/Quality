from __future__ import unicode_literals
import frappe

def execute(filters=None):
    columns, data = get_columns(filters=filters), get_data(filters=filters)
    return columns, data

def get_columns(filters=None):
    return [
        {
            "label":("Checker Name"),
        	"fieldname": "check_name",
          	"fieldtype": "Link",
	        "options": "Checker",
	        "width": 100
	        }
    ]

def get_data(filters=None):
    return frappe.db.sql("""
        SELECT *
        FROM `tabDaily Checking`
    """, as_dict=1)
