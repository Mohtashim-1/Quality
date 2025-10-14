# Copyright (c) 2024, mohtashim and contributors
# For license information, please see license.txt

import frappe
from frappe import _
import json
from datetime import datetime, timedelta
from frappe.utils import flt, getdate, today, add_days

@frappe.whitelist()
def get_dashboard_data(filters=None):
	"""Get comprehensive dashboard data for inline stitching"""
	
	try:
		if isinstance(filters, str):
			filters = json.loads(filters)
		
		# Build base query
		base_conditions = build_conditions(filters)
		
		# Get basic data first
		summary = get_detailed_summary_data(base_conditions, filters)
		chart_data = get_comprehensive_chart_data(base_conditions, filters)
		records = get_records_data(base_conditions, filters)
		
		# Get additional analysis data
		trend_analysis = get_trend_analysis(base_conditions, filters)
		operator_analysis = get_operator_analysis(base_conditions, filters)
		machine_analysis = get_machine_analysis(base_conditions, filters)
		article_analysis = get_article_analysis(base_conditions, filters)
		time_analysis = get_time_analysis(base_conditions, filters)
		defect_analysis = get_defect_analysis(base_conditions, filters)
		
		return {
			'summary': summary,
			'chart_data': chart_data,
			'records': records,
			'trend_analysis': trend_analysis,
			'operator_analysis': operator_analysis,
			'machine_analysis': machine_analysis,
			'article_analysis': article_analysis,
			'time_analysis': time_analysis,
			'defect_analysis': defect_analysis
		}
	except Exception as e:
		frappe.log_error(f"Error in get_dashboard_data: {str(e)}", "Inline Stitching Dashboard Error")
		return {
			'summary': {'total_records': 0, 'total_pieces': 0, 'total_defects': 0, 'defect_percentage': 0},
			'chart_data': {'defect_labels': [], 'defect_values': [], 'trend_labels': [], 'trend_values': []},
			'records': [],
			'error': str(e)
		}

def build_conditions(filters):
	"""Build SQL conditions based on filters"""
	conditions = ["1=1"]
	
	if filters and filters.get('from_date'):
		conditions.append(f"`tabInline Stitching`.reporting_date >= '{filters['from_date']}'")
	
	if filters and filters.get('to_date'):
		conditions.append(f"`tabInline Stitching`.reporting_date <= '{filters['to_date']}'")
	
	if filters and filters.get('process_type'):
		conditions.append(f"`tabInline Stitching`.process_type = '{filters['process_type']}'")
	
	if filters and filters.get('sales_order'):
		conditions.append(f"`tabInline Stitching`.select_po LIKE '%{filters['sales_order']}%'")
	
	if filters and filters.get('machine'):
		conditions.append(f"`tabInline Stitching CT`.machine LIKE '%{filters['machine']}%'")
	
	if filters and filters.get('operator'):
		conditions.append(f"`tabInline Stitching CT`.operator_name LIKE '%{filters['operator']}%'")
	
	if filters and filters.get('article'):
		conditions.append(f"`tabInline Stitching CT`.article LIKE '%{filters['article']}%'")
	
	return " AND ".join(conditions)

def get_detailed_summary_data(conditions, filters):
	"""Get comprehensive summary statistics"""
	
	# Main summary query
	summary_query = f"""
		SELECT 
			COUNT(DISTINCT `tabInline Stitching`.name) as total_records,
			COALESCE(SUM(`tabInline Stitching`.total_number_pcs), 0) as total_pieces,
			COALESCE(SUM(`tabInline Stitching`.total_defects), 0) as total_defects,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage,
			COALESCE(AVG(`tabInline Stitching`.defect_percentage), 0) as avg_defect_percentage,
			COALESCE(MAX(`tabInline Stitching`.defect_percentage), 0) as max_defect_percentage,
			COALESCE(MIN(`tabInline Stitching`.defect_percentage), 0) as min_defect_percentage,
			COUNT(DISTINCT `tabInline Stitching CT`.machine) as total_machines,
			COUNT(DISTINCT `tabInline Stitching CT`.operator_name) as total_operators,
			COUNT(DISTINCT `tabInline Stitching CT`.article) as total_articles,
			COUNT(DISTINCT `tabInline Stitching`.select_po) as total_pos
		FROM `tabInline Stitching`
		LEFT JOIN `tabInline Stitching CT` ON `tabInline Stitching`.name = `tabInline Stitching CT`.parent
		WHERE {conditions}
	"""
	
	result = frappe.db.sql(summary_query, as_dict=True)
	
	# Get defect breakdown
	defect_breakdown_query = f"""
		SELECT 
			COALESCE(SUM(`tabInline Stitching`.double_stitch_total), 0) as double_stitch,
			COALESCE(SUM(`tabInline Stitching`.overlap_feb_total), 0) as overlap_feb,
			COALESCE(SUM(`tabInline Stitching`.uneven_stitch_total), 0) as uneven_stitch,
			COALESCE(SUM(`tabInline Stitching`.boot_mark_total), 0) as boot_mark,
			COALESCE(SUM(`tabInline Stitching`.open_seam_total), 0) as open_seam,
			COALESCE(SUM(`tabInline Stitching`.puckering_total), 0) as puckering,
			COALESCE(SUM(`tabInline Stitching`.bad_stitch_total), 0) as bad_stitch,
			COALESCE(SUM(`tabInline Stitching`.loose_stitch_total), 0) as loose_stitch,
			COALESCE(SUM(`tabInline Stitching`.raw_edge_total), 0) as raw_edge,
			COALESCE(SUM(`tabInline Stitching`.other_defect_qty), 0) as other_defects
		FROM `tabInline Stitching`
		WHERE {conditions}
	"""
	
	defect_result = frappe.db.sql(defect_breakdown_query, as_dict=True)
	
	# Get process type breakdown
	process_breakdown_query = f"""
		SELECT 
			`tabInline Stitching`.process_type,
			COUNT(*) as record_count,
			COALESCE(SUM(`tabInline Stitching`.total_number_pcs), 0) as pieces,
			COALESCE(SUM(`tabInline Stitching`.total_defects), 0) as defects,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage
		FROM `tabInline Stitching`
		WHERE {conditions}
		GROUP BY `tabInline Stitching`.process_type
		ORDER BY record_count DESC
	"""
	
	process_result = frappe.db.sql(process_breakdown_query, as_dict=True)
	
	if result:
		summary_data = {
			# Basic metrics
			'total_records': result[0].total_records or 0,
			'total_pieces': result[0].total_pieces or 0,
			'total_defects': result[0].total_defects or 0,
			'defect_percentage': flt(result[0].defect_percentage, 2),
			'avg_defect_percentage': flt(result[0].avg_defect_percentage, 2),
			'max_defect_percentage': flt(result[0].max_defect_percentage, 2),
			'min_defect_percentage': flt(result[0].min_defect_percentage, 2),
			
			# Resource metrics
			'total_machines': result[0].total_machines or 0,
			'total_operators': result[0].total_operators or 0,
			'total_articles': result[0].total_articles or 0,
			'total_pos': result[0].total_pos or 0,
			
			# Quality metrics
			'pieces_per_record': flt((result[0].total_pieces or 0) / max(result[0].total_records or 1, 1), 2),
			'defects_per_record': flt((result[0].total_defects or 0) / max(result[0].total_records or 1, 1), 2),
			'quality_score': max(0, 100 - flt(result[0].defect_percentage, 2)),
			
			# Defect breakdown
			'defect_breakdown': defect_result[0] if defect_result else {},
			
			# Process breakdown
			'process_breakdown': process_result
		}
		
		# Calculate additional metrics
		if summary_data['total_pieces'] > 0:
			summary_data['efficiency_score'] = min(100, flt(summary_data['total_pieces'] / max(summary_data['total_records'], 1) * 10, 2))
		else:
			summary_data['efficiency_score'] = 0
			
		return summary_data
	
	return {
		'total_records': 0, 'total_pieces': 0, 'total_defects': 0, 'defect_percentage': 0,
		'avg_defect_percentage': 0, 'max_defect_percentage': 0, 'min_defect_percentage': 0,
		'total_machines': 0, 'total_operators': 0, 'total_articles': 0, 'total_pos': 0,
		'pieces_per_record': 0, 'defects_per_record': 0, 'quality_score': 0,
		'defect_breakdown': {}, 'process_breakdown': [], 'efficiency_score': 0
	}

def get_chart_data(conditions):
	"""Get data for charts"""
	
	# Defect distribution data
	defect_query = f"""
		SELECT 
			'Double Stitch' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.double_stitch_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Overlap Feb' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.overlap_feb_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Uneven Stitch' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.uneven_stitch_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Boot Mark' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.boot_mark_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Open Seam' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.open_seam_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Puckering' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.puckering_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Bad Stitch' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.bad_stitch_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Loose Stitch' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.loose_stitch_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Raw Edge' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.raw_edge_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Other Defects' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.other_defect_qty), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		ORDER BY defect_count DESC
	"""
	
	defect_data = frappe.db.sql(defect_query, as_dict=True)
	
	# Filter out zero values for better visualization
	defect_labels = []
	defect_values = []
	for item in defect_data:
		if item.defect_count > 0:
			defect_labels.append(item.defect_type)
			defect_values.append(item.defect_count)
	
	# Trend data (last 7 days)
	trend_query = f"""
		SELECT 
			DATE(`tabInline Stitching`.reporting_date) as report_date,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage
		FROM `tabInline Stitching`
		WHERE {conditions}
		AND `tabInline Stitching`.reporting_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
		GROUP BY DATE(`tabInline Stitching`.reporting_date)
		ORDER BY report_date
	"""
	
	trend_data = frappe.db.sql(trend_query, as_dict=True)
	
	trend_labels = []
	trend_values = []
	for item in trend_data:
		trend_labels.append(item.report_date.strftime('%Y-%m-%d'))
		trend_values.append(flt(item.defect_percentage, 2))
	
	return {
		'defect_labels': defect_labels,
		'defect_values': defect_values,
		'trend_labels': trend_labels,
		'trend_values': trend_values
	}

def get_records_data(conditions, filters):
	"""Get records for the data table"""
	
	# Get records with child table data
	records_query = f"""
		SELECT 
			`tabInline Stitching`.name,
			`tabInline Stitching`.reporting_date,
			`tabInline Stitching`.process_type,
			`tabInline Stitching`.select_po,
			`tabInline Stitching`.total_number_pcs,
			`tabInline Stitching`.total_defects,
			`tabInline Stitching`.defect_percentage,
			`tabInline Stitching CT`.machine,
			`tabInline Stitching CT`.operator_name,
			`tabInline Stitching CT`.article,
			`tabInline Stitching CT`.size,
			`tabInline Stitching CT`.design
		FROM `tabInline Stitching`
		LEFT JOIN `tabInline Stitching CT` ON `tabInline Stitching`.name = `tabInline Stitching CT`.parent
		WHERE {conditions}
		ORDER BY `tabInline Stitching`.reporting_date DESC, `tabInline Stitching`.creation DESC
		LIMIT 100
	"""
	
	records = frappe.db.sql(records_query, as_dict=True)
	
	# Group records by parent (since we have child table data)
	grouped_records = {}
	for record in records:
		parent_name = record.name
		if parent_name not in grouped_records:
			grouped_records[parent_name] = {
				'name': record.name,
				'reporting_date': record.reporting_date,
				'process_type': record.process_type,
				'select_po': record.select_po,
				'total_number_pcs': record.total_number_pcs,
				'total_defects': record.total_defects,
				'defect_percentage': record.defect_percentage,
				'machine': record.machine,
				'operator_name': record.operator_name,
				'article': record.article,
				'size': record.size,
				'design': record.design
			}
		else:
			# If multiple child records, concatenate values
			if record.machine and record.machine not in grouped_records[parent_name]['machine']:
				grouped_records[parent_name]['machine'] += f", {record.machine}"
			if record.operator_name and record.operator_name not in grouped_records[parent_name]['operator_name']:
				grouped_records[parent_name]['operator_name'] += f", {record.operator_name}"
			if record.article and record.article not in grouped_records[parent_name]['article']:
				grouped_records[parent_name]['article'] += f", {record.article}"
	
	return list(grouped_records.values())

def get_comprehensive_chart_data(conditions, filters):
	"""Get comprehensive chart data"""
	
	# Defect distribution data
	defect_query = f"""
		SELECT 
			'Double Stitch' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.double_stitch_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Overlap Feb' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.overlap_feb_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Uneven Stitch' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.uneven_stitch_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Boot Mark' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.boot_mark_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Open Seam' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.open_seam_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Puckering' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.puckering_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Bad Stitch' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.bad_stitch_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Loose Stitch' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.loose_stitch_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Raw Edge' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.raw_edge_total), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Other Defects' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.other_defect_qty), 0) as defect_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		ORDER BY defect_count DESC
	"""
	
	defect_data = frappe.db.sql(defect_query, as_dict=True)
	
	# Filter out zero values for better visualization
	defect_labels = []
	defect_values = []
	for item in defect_data:
		if item.defect_count > 0:
			defect_labels.append(item.defect_type)
			defect_values.append(item.defect_count)
	
	# Trend data (last 30 days)
	trend_query = f"""
		SELECT 
			DATE(`tabInline Stitching`.reporting_date) as report_date,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage,
			COALESCE(SUM(`tabInline Stitching`.total_number_pcs), 0) as pieces,
			COALESCE(SUM(`tabInline Stitching`.total_defects), 0) as defects
		FROM `tabInline Stitching`
		WHERE {conditions}
		AND `tabInline Stitching`.reporting_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
		GROUP BY DATE(`tabInline Stitching`.reporting_date)
		ORDER BY report_date
	"""
	
	trend_data = frappe.db.sql(trend_query, as_dict=True)
	
	trend_labels = []
	trend_values = []
	pieces_trend = []
	defects_trend = []
	
	for item in trend_data:
		trend_labels.append(item.report_date.strftime('%Y-%m-%d'))
		trend_values.append(flt(item.defect_percentage, 2))
		pieces_trend.append(item.pieces)
		defects_trend.append(item.defects)
	
	return {
		'defect_labels': defect_labels,
		'defect_values': defect_values,
		'trend_labels': trend_labels,
		'trend_values': trend_values,
		'pieces_trend': pieces_trend,
		'defects_trend': defects_trend
	}

def get_trend_analysis(conditions, filters):
	"""Get detailed trend analysis"""
	
	# Daily trends for last 30 days
	daily_trends = f"""
		SELECT 
			DATE(`tabInline Stitching`.reporting_date) as date,
			COUNT(*) as records,
			COALESCE(SUM(`tabInline Stitching`.total_number_pcs), 0) as pieces,
			COALESCE(SUM(`tabInline Stitching`.total_defects), 0) as defects,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage
		FROM `tabInline Stitching`
		WHERE {conditions}
		AND `tabInline Stitching`.reporting_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
		GROUP BY DATE(`tabInline Stitching`.reporting_date)
		ORDER BY date
	"""
	
	daily_data = frappe.db.sql(daily_trends, as_dict=True)
	
	# Weekly trends
	weekly_trends = f"""
		SELECT 
			YEARWEEK(`tabInline Stitching`.reporting_date) as week,
			COUNT(*) as records,
			COALESCE(SUM(`tabInline Stitching`.total_number_pcs), 0) as pieces,
			COALESCE(SUM(`tabInline Stitching`.total_defects), 0) as defects,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage
		FROM `tabInline Stitching`
		WHERE {conditions}
		AND `tabInline Stitching`.reporting_date >= DATE_SUB(CURDATE(), INTERVAL 12 WEEK)
		GROUP BY YEARWEEK(`tabInline Stitching`.reporting_date)
		ORDER BY week
	"""
	
	weekly_data = frappe.db.sql(weekly_trends, as_dict=True)
	
	return {
		'daily_trends': daily_data,
		'weekly_trends': weekly_data
	}

def get_operator_analysis(conditions, filters):
	"""Get operator performance analysis"""
	
	operator_query = f"""
		SELECT 
			`tabInline Stitching CT`.operator_name,
			COUNT(DISTINCT `tabInline Stitching`.name) as records,
			COALESCE(SUM(`tabInline Stitching`.total_number_pcs), 0) as pieces,
			COALESCE(SUM(`tabInline Stitching`.total_defects), 0) as defects,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage,
			COALESCE(AVG(`tabInline Stitching`.defect_percentage), 0) as avg_defect_percentage
		FROM `tabInline Stitching`
		LEFT JOIN `tabInline Stitching CT` ON `tabInline Stitching`.name = `tabInline Stitching CT`.parent
		WHERE {conditions}
		AND `tabInline Stitching CT`.operator_name IS NOT NULL
		GROUP BY `tabInline Stitching CT`.operator_name
		ORDER BY defect_percentage ASC
		LIMIT 20
	"""
	
	return frappe.db.sql(operator_query, as_dict=True)

def get_machine_analysis(conditions, filters):
	"""Get machine performance analysis"""
	
	machine_query = f"""
		SELECT 
			`tabInline Stitching CT`.machine,
			COUNT(DISTINCT `tabInline Stitching`.name) as records,
			COALESCE(SUM(`tabInline Stitching`.total_number_pcs), 0) as pieces,
			COALESCE(SUM(`tabInline Stitching`.total_defects), 0) as defects,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage,
			COALESCE(AVG(`tabInline Stitching`.defect_percentage), 0) as avg_defect_percentage
		FROM `tabInline Stitching`
		LEFT JOIN `tabInline Stitching CT` ON `tabInline Stitching`.name = `tabInline Stitching CT`.parent
		WHERE {conditions}
		AND `tabInline Stitching CT`.machine IS NOT NULL
		GROUP BY `tabInline Stitching CT`.machine
		ORDER BY defect_percentage ASC
		LIMIT 20
	"""
	
	return frappe.db.sql(machine_query, as_dict=True)

def get_article_analysis(conditions, filters):
	"""Get article performance analysis"""
	
	article_query = f"""
		SELECT 
			`tabInline Stitching CT`.article,
			`tabInline Stitching CT`.size,
			`tabInline Stitching CT`.design,
			COUNT(DISTINCT `tabInline Stitching`.name) as records,
			COALESCE(SUM(`tabInline Stitching`.total_number_pcs), 0) as pieces,
			COALESCE(SUM(`tabInline Stitching`.total_defects), 0) as defects,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage
		FROM `tabInline Stitching`
		LEFT JOIN `tabInline Stitching CT` ON `tabInline Stitching`.name = `tabInline Stitching CT`.parent
		WHERE {conditions}
		AND `tabInline Stitching CT`.article IS NOT NULL
		GROUP BY `tabInline Stitching CT`.article, `tabInline Stitching CT`.size, `tabInline Stitching CT`.design
		ORDER BY defect_percentage ASC
		LIMIT 20
	"""
	
	return frappe.db.sql(article_query, as_dict=True)

def get_time_analysis(conditions, filters):
	"""Get time-based analysis"""
	
	# Hourly analysis
	hourly_query = f"""
		SELECT 
			HOUR(`tabInline Stitching`.time) as hour,
			COUNT(*) as records,
			COALESCE(SUM(`tabInline Stitching`.total_number_pcs), 0) as pieces,
			COALESCE(SUM(`tabInline Stitching`.total_defects), 0) as defects,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage
		FROM `tabInline Stitching`
		WHERE {conditions}
		GROUP BY HOUR(`tabInline Stitching`.time)
		ORDER BY hour
	"""
	
	hourly_data = frappe.db.sql(hourly_query, as_dict=True)
	
	# Process type analysis
	process_query = f"""
		SELECT 
			`tabInline Stitching`.process_type,
			COUNT(*) as records,
			COALESCE(SUM(`tabInline Stitching`.total_number_pcs), 0) as pieces,
			COALESCE(SUM(`tabInline Stitching`.total_defects), 0) as defects,
			CASE 
				WHEN SUM(`tabInline Stitching`.total_number_pcs) > 0 
				THEN (SUM(`tabInline Stitching`.total_defects) / SUM(`tabInline Stitching`.total_number_pcs)) * 100
				ELSE 0 
			END as defect_percentage
		FROM `tabInline Stitching`
		WHERE {conditions}
		GROUP BY `tabInline Stitching`.process_type
		ORDER BY records DESC
	"""
	
	process_data = frappe.db.sql(process_query, as_dict=True)
	
	return {
		'hourly_analysis': hourly_data,
		'process_analysis': process_data
	}

def get_defect_analysis(conditions, filters):
	"""Get detailed defect analysis"""
	
	# Defect trends over time
	defect_trends = f"""
		SELECT 
			DATE(`tabInline Stitching`.reporting_date) as date,
			COALESCE(SUM(`tabInline Stitching`.double_stitch_total), 0) as double_stitch,
			COALESCE(SUM(`tabInline Stitching`.overlap_feb_total), 0) as overlap_feb,
			COALESCE(SUM(`tabInline Stitching`.uneven_stitch_total), 0) as uneven_stitch,
			COALESCE(SUM(`tabInline Stitching`.boot_mark_total), 0) as boot_mark,
			COALESCE(SUM(`tabInline Stitching`.open_seam_total), 0) as open_seam,
			COALESCE(SUM(`tabInline Stitching`.puckering_total), 0) as puckering,
			COALESCE(SUM(`tabInline Stitching`.bad_stitch_total), 0) as bad_stitch,
			COALESCE(SUM(`tabInline Stitching`.loose_stitch_total), 0) as loose_stitch,
			COALESCE(SUM(`tabInline Stitching`.raw_edge_total), 0) as raw_edge,
			COALESCE(SUM(`tabInline Stitching`.other_defect_qty), 0) as other_defects
		FROM `tabInline Stitching`
		WHERE {conditions}
		AND `tabInline Stitching`.reporting_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
		GROUP BY DATE(`tabInline Stitching`.reporting_date)
		ORDER BY date
	"""
	
	defect_trend_data = frappe.db.sql(defect_trends, as_dict=True)
	
	# Top defect types
	top_defects = f"""
		SELECT 
			'Double Stitch' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.double_stitch_total), 0) as total_count,
			COUNT(CASE WHEN `tabInline Stitching`.double_stitch_total > 0 THEN 1 END) as occurrence_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Overlap Feb' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.overlap_feb_total), 0) as total_count,
			COUNT(CASE WHEN `tabInline Stitching`.overlap_feb_total > 0 THEN 1 END) as occurrence_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Uneven Stitch' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.uneven_stitch_total), 0) as total_count,
			COUNT(CASE WHEN `tabInline Stitching`.uneven_stitch_total > 0 THEN 1 END) as occurrence_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Boot Mark' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.boot_mark_total), 0) as total_count,
			COUNT(CASE WHEN `tabInline Stitching`.boot_mark_total > 0 THEN 1 END) as occurrence_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		UNION ALL
		
		SELECT 
			'Open Seam' as defect_type,
			COALESCE(SUM(`tabInline Stitching`.open_seam_total), 0) as total_count,
			COUNT(CASE WHEN `tabInline Stitching`.open_seam_total > 0 THEN 1 END) as occurrence_count
		FROM `tabInline Stitching`
		WHERE {conditions}
		
		ORDER BY total_count DESC
	"""
	
	top_defects_data = frappe.db.sql(top_defects, as_dict=True)
	
	return {
		'defect_trends': defect_trend_data,
		'top_defects': top_defects_data
	}

@frappe.whitelist()
def test_dashboard():
	"""Test function to check if dashboard is working"""
	return {
		'summary': {
			'total_records': 10,
			'total_pieces': 1000,
			'total_defects': 50,
			'defect_percentage': 5.0,
			'quality_score': 95.0,
			'efficiency_score': 85.0
		},
		'chart_data': {
			'defect_labels': ['Double Stitch', 'Open Seam', 'Bad Stitch'],
			'defect_values': [20, 15, 10],
			'trend_labels': ['2024-10-01', '2024-10-02', '2024-10-03'],
			'trend_values': [4.5, 5.2, 4.8]
		},
		'records': [
			{
				'name': 'TEST-001',
				'reporting_date': '2024-10-14',
				'process_type': '09 to 12',
				'total_number_pcs': 100,
				'total_defects': 5,
				'defect_percentage': 5.0
			}
		]
	}

@frappe.whitelist()
def export_data(filters=None):
	"""Export data to CSV"""
	
	if isinstance(filters, str):
		filters = json.loads(filters)
	
	conditions = build_conditions(filters)
	records = get_records_data(conditions, filters)
	
	# Create CSV content
	csv_content = "Date,Process Type,Sales Order,Machine,Operator,Article,Size,Design,Pieces,Defects,Defect %\n"
	
	for record in records:
		csv_content += f"{record.reporting_date or ''},{record.process_type or ''},{record.select_po or ''},"
		csv_content += f"{record.machine or ''},{record.operator_name or ''},{record.article or ''},"
		csv_content += f"{record.size or ''},{record.design or ''},{record.total_number_pcs or 0},"
		csv_content += f"{record.total_defects or 0},{record.defect_percentage or 0}\n"
	
	# Return CSV as file download
	frappe.local.response.filename = f"inline_stitching_data_{today()}.csv"
	frappe.local.response.filecontent = csv_content
	frappe.local.response.type = "download"
