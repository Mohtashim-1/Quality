# Copyright (c) 2026, mohtashim and contributors

import frappe

from quality_addon.api.order_sheet_quality_dashboard import get_quality_dashboard_data


@frappe.whitelist()
def get_dashboard_data(filters=None):
	"""Page entry point for Quality Dashboard."""
	return get_quality_dashboard_data(filters)
