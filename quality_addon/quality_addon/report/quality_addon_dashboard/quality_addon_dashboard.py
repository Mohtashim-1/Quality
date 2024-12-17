import frappe

def execute(filters=None):
    """
    Main function to execute the report.
    """
    # Fetch data from both sources
    checker_data = get_checker_data(filters)
    stitching_data = get_stitching_data(filters)

    # Combine data from both sources
    combined_data = combine_data(checker_data, stitching_data)

    # Define columns for the report
    columns = get_columns()

    # Generate charts and summary
    charts = get_chart(combined_data)
    summary = get_summary(checker_data, stitching_data)

    # Return results with multiple charts
    return columns, combined_data, None, charts, summary


def get_checker_data(filters=None):
    """
    Fetch aggregated checker data with rankings.
    """
    conditions = build_conditions(filters, table_alias="dcict")
    checker_limit = filters.get("checker_limit") or 0

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
    return frappe.db.sql(checker_query, filters, as_dict=True)


def get_stitching_data(filters=None):
    """
    Fetch data from Inline Stitching.
    """
    conditions = build_conditions(filters, table_alias="isct")

    stitching_query = f"""
        SELECT 
            isct.machine,
            isct.operator_name,
            isct.design AS design,
            isct.article AS article,
            isct.size,
            isct.total_defect_pcs,
            isct.no_of_pcs
        FROM `tabInline Stitching` AS `is`
        LEFT JOIN `tabInline Stitching CT` AS isct
        ON isct.parent = `is`.name
        WHERE {conditions}
    """
    return frappe.db.sql(stitching_query, filters, as_dict=True)


def combine_data(checker_data, stitching_data):
    """
    Combine data from both sources into a unified structure.
    """
    combined_data = []

    # Append Checker Data
    for row in checker_data:
        combined_data.append({
            "source": "Daily Checking",
            "checker_name": row.get("checker_name"),
            "total_major": row.get("total_major"),
            "total_minor": row.get("total_minor"),
            "total_critical": row.get("total_critical"),
            "total_qty": row.get("total_qty"),
            "rank": row.get("rank"),
            "machine": None,
            "operator_name": None,
            "design": None,
            "article": None,
            "size": None,
            "total_defect_pcs": None,
            "no_of_pcs": None,
        })

    # Append Stitching Data
    for row in stitching_data:
        combined_data.append({
            "source": "Inline Stitching",
            "checker_name": None,
            "total_major": None,
            "total_minor": None,
            "total_critical": None,
            "total_qty": None,
            "rank": None,
            "machine": row.get("machine"),
            "operator_name": row.get("operator_name"),
            "design": row.get("design"),
            "article": row.get("article"),
            "size": row.get("size"),
            "total_defect_pcs": row.get("total_defect_pcs"),
            "no_of_pcs": row.get("no_of_pcs"),
        })

    return combined_data


def get_columns():
    """
    Define unified report columns.
    """
    return [
        {"label": "Source", "fieldname": "source", "fieldtype": "Data", "width": 120},
        {"label": "Checker Name", "fieldname": "checker_name", "fieldtype": "Data", "width": 150},
        {"label": "Total Major", "fieldname": "total_major", "fieldtype": "Int", "width": 100},
        {"label": "Total Minor", "fieldname": "total_minor", "fieldtype": "Int", "width": 100},
        {"label": "Total Critical", "fieldname": "total_critical", "fieldtype": "Int", "width": 100},
        {"label": "Total Quantity", "fieldname": "total_qty", "fieldtype": "Int", "width": 120},
        {"label": "Rank", "fieldname": "rank", "fieldtype": "Int", "width": 80},
        {"label": "Machine", "fieldname": "machine", "fieldtype": "Data", "width": 120},
        {"label": "Operator Name", "fieldname": "operator_name", "fieldtype": "Data", "width": 150},
        {"label": "Design", "fieldname": "design", "fieldtype": "Data", "width": 150},
        {"label": "Article", "fieldname": "article", "fieldtype": "Data", "width": 150},
        {"label": "Size", "fieldname": "size", "fieldtype": "Data", "width": 100},
        {"label": "Total Defect Pcs", "fieldname": "total_defect_pcs", "fieldtype": "Int", "width": 120},
        {"label": "Number of Pcs", "fieldname": "no_of_pcs", "fieldtype": "Int", "width": 120},
    ]


def build_conditions(filters, table_alias):
    """
    Build SQL WHERE clause based on filters.
    """
    conditions = []

    if filters.get("customer"):
        conditions.append(f"{table_alias}.customer = %(customer)s")
    if filters.get("article"):
        conditions.append(f"{table_alias}.at_article = %(article)s")
    if filters.get("size"):
        conditions.append(f"{table_alias}.size = %(size)s")
    if filters.get("design"):
        conditions.append(f"{table_alias}.at_design = %(design)s")

    return " AND ".join(conditions) if conditions else "1=1"

def get_chart(combined_data):
    """
    Generate a single chart with Major, Minor, and Critical defects.
    """
    # Filter Daily Checking data from the combined data
    daily_checking_data = [row for row in combined_data if row["source"] == "Daily Checking"]
    
    # Labels for the chart (using checker names)
    labels = [row["checker_name"] for row in daily_checking_data]
    
    # Major, Minor, and Critical Defects data
    major_data = [row.get("total_major", 0) for row in daily_checking_data]
    minor_data = [row.get("total_minor", 0) for row in daily_checking_data]
    critical_data = [row.get("total_critical", 0) for row in daily_checking_data]
    
    # Define the chart
    chart = {
        "type": "bar",
        "title": "Defects Breakdown: Major, Minor, Critical",
        "data": {
            "labels": labels,
            "datasets": [
                {"name": "Major Defects", "values": major_data},
                {"name": "Minor Defects", "values": minor_data},
                {"name": "Critical Defects", "values": critical_data},
            ],
        },
    }

    return [chart]

def get_summary(checker_data, stitching_data):
    """
    Generate summary data for the report.
    """
    total_major = sum(row["total_major"] or 0 for row in checker_data)
    total_minor = sum(row["total_minor"] or 0 for row in checker_data)
    total_critical = sum(row["total_critical"] or 0 for row in checker_data)
    total_qty = sum(row["total_qty"] or 0 for row in checker_data)

    total_defects = sum(row["total_defect_pcs"] or 0 for row in stitching_data)
    total_pcs = sum(row["no_of_pcs"] or 0 for row in stitching_data)

    summary = [
        {"label": "Grand Total Major", "value": total_major, "indicator": "Green"},
        {"label": "Grand Total Minor", "value": total_minor, "indicator": "Orange"},
        {"label": "Grand Total Critical", "value": total_critical, "indicator": "Red"},
        {"label": "Grand Total Quantity", "value": total_qty, "indicator": "Blue"},
        {"label": "Grand Total Defects", "value": total_defects, "indicator": "Red"},
        {"label": "Grand Total No. of Pcs", "value": total_pcs, "indicator": "Blue"},
    ]
    return summary
