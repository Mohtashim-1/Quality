import frappe

def execute(filters=None):
    """
    Main function to execute the report.
    """
    # Fetch detailed checker data
    data = get_checker_data(filters)

    # Define columns for the report
    columns = [
        {"fieldname": "checker_name", "label": "Checker Name", "fieldtype": "Data", "width": 100},
        {"fieldname": "major", "label": "Major", "fieldtype": "Int", "width": 100},
        {"fieldname": "minor", "label": "Minor", "fieldtype": "Int", "width": 100},
        {"fieldname": "critical", "label": "Critical", "fieldtype": "Int", "width": 100},
        {"fieldname": "total_qty", "label": "Total Qty", "fieldtype": "Int", "width": 100},
    ]

    # Generate chart and summary
    chart = get_chart(data)
    summary = get_summary(data)

    # Return the results
    return columns, data, None, chart, summary


def get_checker_data(filters=None):
    """
    Fetch detailed checker data.
    """
    conditions = build_conditions(filters)

    checker_query = f"""
        SELECT 
            dcict.checker_name,
            dcict.major,
            dcict.minor,
            dcict.critical,
            dcict.total_qty
        FROM `tabDaily Checking` AS dc
        LEFT JOIN `tabDaily Checking Inspection CT` AS dcict
        ON dcict.parent = dc.name
        WHERE {conditions}
    """

    try:
        frappe.logger().debug(f"Generated Checker Query: {checker_query}")
        result = frappe.db.sql(checker_query, filters, as_dict=True)
        return result
    except frappe.db.InternalError as e:
        frappe.throw(f"Database error in get_checker_data: {str(e)}")


def build_conditions(filters):
    """
    Build SQL WHERE clause based on filters.
    """
    conditions = []

    if filters.get("customer"):
        conditions.append("dcict.customer = %(customer)s")
    if filters.get("article"):
        conditions.append("dcict.at_article = %(article)s")
    if filters.get("size"):
        conditions.append("dcict.size = %(size)s")
    if filters.get("design"):
        conditions.append("dcict.at_design = %(design)s")

    # If no filters are passed, default to 1=1
    final_conditions = " AND ".join(conditions) if conditions else "1=1"

    return final_conditions


def get_chart(data):
    """
    Generate chart data for the report.
    """
    labels = [row["checker_name"] for row in data]
    major_data = [row["major"] for row in data]
    minor_data = [row["minor"] for row in data]
    critical_data = [row["critical"] for row in data]

    chart = {
        "data": {
            "labels": labels,
            "datasets": [
                {"name": "Major", "values": major_data},
                {"name": "Minor", "values": minor_data},
                {"name": "Critical", "values": critical_data},
            ],
        },
        "type": "bar",  # Can be "line", "bar", "pie", etc.
    }

    return chart


def get_summary(data, filters=None):
    """
    Generate summary data for the report, including the filtered document count.
    """
    filters = filters or {}  # Ensure filters is a dictionary

    total_major = sum(row["major"] for row in data)
    total_minor = sum(row["minor"] for row in data)
    total_critical = sum(row["critical"] for row in data)
    total_qty = sum(row["total_qty"] for row in data)
    daily_count = sum(1 for row in data if row.get('name'))


    conditions = build_conditions(filters)
    count_query = f"SELECT COUNT(*) FROM `tabDaily Checking Inspection CT` AS dc WHERE {conditions}"

    try:
        document_count = frappe.db.sql(count_query, filters)[0][0]
    except frappe.db.InternalError as e:
        frappe.throw(f"Database error in get_summary (count): {str(e)}")

    summary = [
        {"label": "Total Count", "value": daily_count, "indicator": "Green"},
        {"label": "Total Major", "value": total_major, "indicator": "Green"},
        {"label": "Total Minor", "value": total_minor, "indicator": "Orange"},
        {"label": "Total Critical", "value": total_critical, "indicator": "Red"},
        {"label": "Total Quantity", "value": total_qty, "indicator": "Blue"},
    ]

    return summary