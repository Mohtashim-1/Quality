import frappe

def execute(filters=None):
    """
    Main function to execute the report.
    """
    # Fetch detailed checker data
    data = get_checker_data(filters)

    # Define columns for the report
    columns = [
        {"fieldname": "checker_name", "label": "Checker Name", "fieldtype": "Data", "width": 120},
        {"fieldname": "total_major", "label": "Total Major", "fieldtype": "Int", "width": 100},
        {"fieldname": "total_minor", "label": "Total Minor", "fieldtype": "Int", "width": 100},
        {"fieldname": "total_critical", "label": "Total Critical", "fieldtype": "Int", "width": 100},
        {"fieldname": "total_qty", "label": "Total Qty", "fieldtype": "Int", "width": 100},
        {"fieldname": "rank", "label": "Rank", "fieldtype": "Int", "width": 100},
    ]

    # Generate chart and summary
    chart = get_chart(data)
    summary = get_summary(data)

    # Return the results
    return columns, data, None, chart, summary


def get_checker_data(filters=None):
    """
    Fetch aggregated checker data with rankings.
    """
    conditions = build_conditions(filters)
    checker_limit = filters.get("checker_limit") or 0

    # SQL query for grouped totals and ranking
    checker_query = f"""
        SELECT 
            dcict.checker_name,
            SUM(dcict.major) AS total_major,
            SUM(dcict.minor) AS total_minor,
            SUM(dcict.critical) AS total_critical,
            SUM(dcict.total_qty) AS total_qty,
            RANK() OVER (ORDER BY SUM(dcict.total_qty) DESC) AS rank
        FROM `tabDaily Checking` AS dc
        LEFT JOIN `tabDaily Checking Inspection CT` AS dcict
        ON dcict.parent = dc.name
        WHERE {conditions}
        GROUP BY dcict.checker_name
        ORDER BY total_qty DESC
        {f"LIMIT {checker_limit}" if checker_limit else ""}
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

    return " AND ".join(conditions) if conditions else "1=1"


def get_chart(data):
    """
    Generate chart data for the report.
    """
    labels = [row["checker_name"] for row in data]
    major_data = [row["total_major"] for row in data]
    minor_data = [row["total_minor"] for row in data]
    critical_data = [row["total_critical"] for row in data]

    chart = {
        "data": {
            "labels": labels,
            "datasets": [
                {"name": "Total Major", "values": major_data},
                {"name": "Total Minor", "values": minor_data},
                {"name": "Total Critical", "values": critical_data},
            ],
        },
        "type": "bar",
    }

    return chart


def get_summary(data):
    """
    Generate summary data for the report.
    """
    total_major = sum(row["total_major"] or 0 for row in data)
    total_minor = sum(row["total_minor"] or 0 for row in data)
    total_critical = sum(row["total_critical"] or 0 for row in data)
    total_qty = sum(row["total_qty"] or 0 for row in data)

    summary = [
        {"label": "Grand Total Major", "value": total_major, "indicator": "Green"},
        {"label": "Grand Total Minor", "value": total_minor, "indicator": "Orange"},
        {"label": "Grand Total Critical", "value": total_critical, "indicator": "Red"},
        {"label": "Grand Total Quantity", "value": total_qty, "indicator": "Blue"},
    ]

    return summary
