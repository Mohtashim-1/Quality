import frappe
import json

@frappe.whitelist(allow_guest=True)
def get_defect_breakdown(filters=None):
	"""Get detailed defect breakdown with major/minor/critical counts"""
	
	if filters is None:
		filters = {}
	
	# Parse filters if it's a JSON string
	if isinstance(filters, str):
		try:
			filters = json.loads(filters)
		except (json.JSONDecodeError, TypeError):
			filters = {}
	
	# Parse filters
	conditions = "1=1"
	values = {}
	
	# Handle date filters - check for both >= and <= operators in separate checks
	if filters.get('date'):
		if isinstance(filters['date'], list) and len(filters['date']) == 2:
			operator = filters['date'][0]
			date_value = filters['date'][1]
			if operator == '>=':
				conditions += " AND parent_dc.date >= %(from_date)s"
				values['from_date'] = date_value
			elif operator == '<=':
				conditions += " AND parent_dc.date <= %(to_date)s"
				values['to_date'] = date_value
	
	if filters.get('inspection_level'):
		conditions += " AND parent_dc.inspection_level = %(inspection_level)s"
		values['inspection_level'] = filters['inspection_level']
	
	# Query child table with parent join
	data = frappe.db.sql(f"""
		SELECT 
			SUM(COALESCE(dc.miss_pick__double_pick_major, 0)) as miss_pick_major,
			SUM(COALESCE(dc.miss_pick__double_pick_minor, 0)) as miss_pick_minor,
			SUM(COALESCE(dc.miss_pick__double_pick_critical, 0)) as miss_pick_critical,
			SUM(COALESCE(dc.miss_pick__double_pick_qty, 0)) as miss_pick_total,
			SUM(COALESCE(dc.fly_yarn_major1, 0)) as fly_yarn_major,
			SUM(COALESCE(dc.fly_yarn_minor, 0)) as fly_yarn_minor,
			SUM(COALESCE(dc.fly_yarn_critical, 0)) as fly_yarn_critical,
			SUM(COALESCE(dc.fly_yarn_qty, 0)) as fly_yarn_total,
			SUM(COALESCE(dc.incorrect_construct_major, 0)) as incorrect_major,
			SUM(COALESCE(dc.incorrect_construct_minor, 0)) as incorrect_minor,
			SUM(COALESCE(dc.incorrect_construct_critical, 0)) as incorrect_critical,
			SUM(COALESCE(dc.incorrect_construct_qty, 0)) as incorrect_total,
			SUM(COALESCE(dc.registration_out_major, 0)) as reg_out_major,
			SUM(COALESCE(dc.registration_out_minor, 0)) as reg_out_minor,
			SUM(COALESCE(dc.registration_out_critical, 0)) as reg_out_critical,
			SUM(COALESCE(dc.registration_out_qty, 0)) as reg_out_total,
			SUM(COALESCE(dc.miss_print_major, 0)) as miss_print_major,
			SUM(COALESCE(dc.miss_print_minor, 0)) as miss_print_minor,
			SUM(COALESCE(dc.miss_print_critical, 0)) as miss_print_critical,
			SUM(COALESCE(dc.miss_print_qty, 0)) as miss_print_total,
			SUM(COALESCE(dc.bowing_major, 0)) as bowing_major,
			SUM(COALESCE(dc.bowing_minor, 0)) as bowing_minor,
			SUM(COALESCE(dc.bowing_critical, 0)) as bowing_critical,
			SUM(COALESCE(dc.bowing_qty, 0)) as bowing_total,
			SUM(COALESCE(dc.touching_major, 0)) as touching_major,
			SUM(COALESCE(dc.touching_minor, 0)) as touching_minor,
			SUM(COALESCE(dc.touching_critical, 0)) as touching_critical,
			SUM(COALESCE(dc.touching_qty, 0)) as touching_total,
			SUM(COALESCE(dc.streaks_major, 0)) as streaks_major,
			SUM(COALESCE(dc.streaks_minor, 0)) as streaks_minor,
			SUM(COALESCE(dc.streaks_critical, 0)) as streaks_critical,
			SUM(COALESCE(dc.streaks_qty, 0)) as streaks_total,
			SUM(COALESCE(dc.salvage_major, 0)) as salvage_major,
			SUM(COALESCE(dc.salvage_minor, 0)) as salvage_minor,
			SUM(COALESCE(dc.salvage_critical, 0)) as salvage_critical,
			SUM(COALESCE(dc.salvage_qty, 0)) as salvage_total,
			SUM(COALESCE(dc.smash_major, 0)) as smash_major,
			SUM(COALESCE(dc.smash_minor, 0)) as smash_minor,
			SUM(COALESCE(dc.smash_critical, 0)) as smash_critical,
			SUM(COALESCE(dc.smash_qty, 0)) as smash_total,
			SUM(COALESCE(dc.un_cut_major, 0)) as un_cut_major,
			SUM(COALESCE(dc.un_cut_minor, 0)) as un_cut_minor,
		SUM(COALESCE(dc.un_cut_critical, 0)) as un_cut_critical,
		SUM(COALESCE(dc.un_cut_qty, 0)) as un_cut_total,
		SUM(COALESCE(dc.os_major, 0)) as os_major,
		SUM(COALESCE(dc.os_minor, 0)) as os_minor,
		SUM(COALESCE(dc.os_critical, 0)) as os_critical,
		SUM(COALESCE(dc.oil_stain_total, 0)) as os_total,
		SUM(COALESCE(dc.wm_major, 0)) as wm_major,
		SUM(COALESCE(dc.wm_minor, 0)) as wm_minor,
		SUM(COALESCE(dc.wm_critical, 0)) as wm_critical,
		SUM(COALESCE(dc.wm_qty, 0)) as wm_total,
		SUM(COALESCE(dc.cc_major, 0)) as cc_major,
		SUM(COALESCE(dc.cc_minor, 0)) as cc_minor,
		SUM(COALESCE(dc.cc_critical, 0)) as cc_critical,
		SUM(COALESCE(dc.cc_qty, 0)) as cc_total,
		SUM(COALESCE(dc.nh_major, 0)) as nh_major,
		SUM(COALESCE(dc.nh_minor, 0)) as nh_minor,
		SUM(COALESCE(dc.nh_critical, 0)) as nh_critical,
		SUM(COALESCE(dc.nh_qty, 0)) as nh_total,
		SUM(COALESCE(dc.dm_major, 0)) as dm_major,
		SUM(COALESCE(dc.dm_minor, 0)) as dm_minor,
		SUM(COALESCE(dc.dm_critical, 0)) as dm_critical,
		SUM(COALESCE(dc.dm_qty, 0)) as dm_total,
		SUM(COALESCE(dc.mwl_major, 0)) as mwl_major,
		SUM(COALESCE(dc.mwl_minor, 0)) as mwl_minor,
		SUM(COALESCE(dc.mwc_critical, 0)) as mwl_critical,
		SUM(COALESCE(dc.mwl_qty, 0)) as mwl_total,
		SUM(COALESCE(dc.us_major, 0)) as us_major,
		SUM(COALESCE(dc.us_minor, 0)) as us_minor,
		SUM(COALESCE(dc.us_critical, 0)) as us_critical,
		SUM(COALESCE(dc.us_qty, 0)) as us_total,
		SUM(COALESCE(dc.wt_major, 0)) as wt_major,
		SUM(COALESCE(dc.wt_minor, 0)) as wt_minor,
		SUM(COALESCE(dc.wt_critical, 0)) as wt_critical,
		SUM(COALESCE(dc.wt_qty, 0)) as wt_total,
		SUM(COALESCE(dc.p_major, 0)) as p_major,
		SUM(COALESCE(dc.p_minor, 0)) as p_minor,
		SUM(COALESCE(dc.p_critical, 0)) as p_critical,
		SUM(COALESCE(dc.p_qty, 0)) as p_total,
		SUM(COALESCE(dc.bls_major, 0)) as bls_major,
		SUM(COALESCE(dc.bls_minor, 0)) as bls_minor,
		SUM(COALESCE(dc.bls_critical, 0)) as bls_critical,
		SUM(COALESCE(dc.bls_qty, 0)) as bls_total,
		SUM(COALESCE(dc.ohs_major, 0)) as ohs_major,
		SUM(COALESCE(dc.ohs_minor, 0)) as ohs_minor,
		SUM(COALESCE(dc.ohs_critical, 0)) as ohs_critical,
		SUM(COALESCE(dc.ohs_qty, 0)) as ohs_total,
		SUM(COALESCE(dc.bs_major, 0)) as bs_major,
		SUM(COALESCE(dc.bs_minor, 0)) as bs_minor,
		SUM(COALESCE(dc.ms_critical, 0)) as bs_critical,
		SUM(COALESCE(dc.bs_qty, 0)) as bs_total,
		SUM(COALESCE(dc.wd_major, 0)) as wd_major,
		SUM(COALESCE(dc.wd_minor, 0)) as wd_minor,
		SUM(COALESCE(dc.wd_critical, 0)) as wd_critical,
		SUM(COALESCE(dc.wd_qty, 0)) as wd_total,
		SUM(COALESCE(dc.ss_major, 0)) as ss_major,
		SUM(COALESCE(dc.ss_minor, 0)) as ss_minor,
		SUM(COALESCE(dc.ss_critical, 0)) as ss_critical,
		SUM(COALESCE(dc.ss_qty1, 0)) as ss_total
		FROM 
			`tabDaily Checking Inspection CT` dc
		INNER JOIN
			`tabDaily Checking` parent_dc ON dc.parent = parent_dc.name
		WHERE {conditions}
	""".format(conditions=conditions), values, as_dict=True)
	
	return data