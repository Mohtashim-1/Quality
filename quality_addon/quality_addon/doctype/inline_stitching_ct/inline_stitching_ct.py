# Copyright (c) 2024, mohtashim and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class InlineStitchingCT(Document):
	def before_save(self):
		self.calculate_total()

	def calculate_total(self):
		self.total_defect_pcs = self.double_stitch	
