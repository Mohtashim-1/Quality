frappe.query_reports["Quality Addon Dashboard"] = {
    "filters": [
        {
            "fieldname": "customer",
            "label": "Customer",
            "fieldtype": "Link",
            "options": "Customer",
            "reqd": 0,
        },
        {
            "fieldname": "article",
            "label": "Article",
            "fieldtype": "Link",
            "options": "Stitching Article",
            "reqd": 0,
        },
        {
            "fieldname": "size",
            "label": "Size",
            "fieldtype": "Link",
            "options": "Attribute Size",
            "reqd": 0,
        },
        {
            "fieldname": "design",
            "label": "Design",
            "fieldtype": "Link",
            "options": "Stitching Design",
            "reqd": 0,
        },
        {
            "fieldname": "checker_name",
            "label": "Checker",
            "fieldtype": "Link",
            "options": "Checker",
            "reqd": 0,
        },
        {
            "fieldname": "checker_limit",
            "label": "Checker Limit",
            "fieldtype": "Int",
            "reqd": 0,
            "default": 10
        },
    ],
};
