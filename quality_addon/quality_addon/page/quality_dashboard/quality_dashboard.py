# Copyright (c) 2026, mohtashim and contributors

import frappe

from quality_addon.api.quality_dashboard_pages import (
	get_daily_checking_dashboard_data,
	get_inline_stitching_dashboard_data,
)


@frappe.whitelist()
def get_daily_checking_dashboard(filters=None):
	return get_daily_checking_dashboard_data(filters)


@frappe.whitelist()
def get_inline_stitching_dashboard(filters=None):
	return get_inline_stitching_dashboard_data(filters)
