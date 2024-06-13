// Copyright (c) 2024, mohtashim and contributors
// For license information, please see license.txt

frappe.ui.form.on('Final Inspection Report', {
	po: function (frm) {
		frm.doc.fir_ct = [];
		erpnext.utils.map_current_doc({
			method: "erpnext.quality_management.doctype.final_inspection_report.final_inspection_report.fetch_so_items",
			source_name: frm.doc.po,
			frm: frm
		});
	},

});


frappe.ui.form.on('Final Inspection Report CT', {
	audit_qty: function (frm, cdt, cdn) {
		var d = locals[cdt][cdn];
		if (frm.doc.inspection_level == "General Inspection Level 2") {
			if (frm.doc.aql_major == "2.5") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 4);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 6);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 8);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 11);  
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 15);  
				}
			}

			if (frm.doc.aql_minor == "2.5") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);

					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);

					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);
				}
			}
			if (frm.doc.aql_minor == "1.0") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);

					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);

					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);
				}
			}
			if (frm.doc.aql_minor == "1.5") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);

					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);

					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);
				}
			}
			if (frm.doc.aql_minor == "4.0") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);

					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);

					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 21);
				}
			}
			// AQL Major
			if (frm.doc.aql_major == "1.0") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}
			}
			if (frm.doc.aql_major == "1.5") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);  
				}
			}
			if (frm.doc.aql_major == "4.0") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);  
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 21);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 21);  
				}
			}

		}
		if (frm.doc.inspection_level == "General Inspection Level 1") {
			if (frm.doc.aql_minor == "1.5") {
				frappe.msgprint('Hello')
				if (d.audit_qty > 2 && d.audit_qty <= 8) {
					//A
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {

					//A
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {

					//B
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {

					//C
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {

					//E
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {

					//F
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {

					//G
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {

					//H
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {

					//J
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {

					//K
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {

					//L
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 10000) {

					//M
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}

			}
			if (frm.doc.aql_minor == "1.0") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {
					//A
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {

					//B
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {

					//C
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {

					//D
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {

					//E
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {

					//F
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {

					//G
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {

					//H
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {

					//J
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {

					//K
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {

					//L
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 10000) {

					//M
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}

			}
			if (frm.doc.aql_minor == "2.5") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {
					//A
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {

					//B
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {

					//C
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {

					//D
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {

					//E
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {

					//F
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {

					//G
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {

					//H
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {

					//J
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {

					//K
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {

					//L
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}
				else if (d.audit_qty > 10000) {

					//M
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);
				}

			}
			if (frm.doc.aql_minor == "4.0") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {
					//A
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {

					//B
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {

					//C
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {

					//D
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {

					//E
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {

					//F
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {

					//G
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {

					//H
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {

					//J
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {

					//K
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {

					//L
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);
				}
				else if (d.audit_qty > 10000) {

					//M
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);
				}

			}



			//AQL Major


			if (frm.doc.aql_major == "1.5") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {
					//A
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {

					//B
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {

					//C
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {

					//D
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {

					//E
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {

					//F
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {

					//G
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {

					//H
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {

					//J
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {

					//K
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {

					//L
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}
				else if (d.audit_qty > 10000) {

					//M
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);  
				}

			}
			if (frm.doc.aql_major == "1.0") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {
					//A
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {

					//B
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {

					//C
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {

					//D
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {

					//E
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {

					//F
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {

					//G
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {

					//H
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {

					//J
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {

					//K
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {

					//L
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 10000) {

					//M
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}

			}
			if (frm.doc.aql_major == "2.5") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {
					//A
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {

					//B
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {

					//C
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {

					//D
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {

					//E
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {

					//F
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {

					//G
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {

					//H
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {

					//J
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {

					//K
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {

					//L
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 11);  
				}
				else if (d.audit_qty > 10000) {

					//M
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);  
				}

			}
			if (frm.doc.aql_major == "4.0") {
				if (d.audit_qty > 2 && d.audit_qty <= 8) {
					//A
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {

					//B
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {

					//C
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {

					//D
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {

					//E
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {

					//F
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {

					//G
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {

					//H
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {

					//J
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {

					//K
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {

					//L
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);  
				}
				else if (d.audit_qty > 10000) {

					//M
					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 21);  
				}

			}

		}

		if (frm.doc.inspection_level == "General Inspection Level 3") {
			if (frm.doc.aql_minor == "1.5") {

				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 500);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 21);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);
				}
			}
			if (frm.doc.aql_minor == "1.0") {

				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 500);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 21);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);
				}
			}
			if (frm.doc.aql_minor == "2.5") {

				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 500);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 21);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 21);
				}
			}
			if (frm.doc.aql_minor == "4.0") {

				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);

					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					// frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 21);
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 500);
					//frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 21);  
					frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 21);
				}
			}




			// Major


			if (frm.doc.aql_major == "1.5") {

				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);  
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 500);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);  
				}
			}
			if (frm.doc.aql_major == "1.0") {

				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 500);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);  
				}
			}
			if (frm.doc.aql_major == "2.5") {

				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);  
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 500);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 21);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 21);  
				}
			}
			if (frm.doc.aql_major == "4.0") {

				if (d.audit_qty > 2 && d.audit_qty <= 8) {

					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 8 && d.audit_qty <= 15) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 0);  

				}
				else if (d.audit_qty > 15 && d.audit_qty <= 25) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  
				}
				else if (d.audit_qty > 25 && d.audit_qty <= 50) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);

					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);  

				}
				else if (d.audit_qty > 50 && d.audit_qty <= 90) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);  
				}
				else if (d.audit_qty > 90 && d.audit_qty <= 150) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);  
				}
				else if (d.audit_qty > 150 && d.audit_qty <= 280) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 5);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 5);  
				}
				else if (d.audit_qty > 280 && d.audit_qty <= 500) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 80);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 7);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 7);  
				}
				else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 125);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 10);
					//frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 10);  
				}
				else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 200);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 14);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 14);  
				}
				else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 315);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 21);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 21);  
				}
				else if (d.audit_qty > 10000) {


					frappe.model.set_value(d.doctype, d.name, 'sample_qty', 500);
					frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 21);
					// frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 21);  
				}
			}


		}
		if (frm.doc.inspection_level == "Special Inspection Level 1") {
			if (d.audit_qty > 2 && d.audit_qty <= 8) {

				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 8 && d.audit_qty <= 15) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 15 && d.audit_qty <= 25) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 25 && d.audit_qty <= 50) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 50 && d.audit_qty <= 90) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 90 && d.audit_qty <= 150) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 150 && d.audit_qty <= 280) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 280 && d.audit_qty <= 500) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 10000) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
		}
		if (frm.doc.inspection_level == "Special Inspection Level 2") {
			if (d.audit_qty > 2 && d.audit_qty <= 8) {

				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 8 && d.audit_qty <= 15) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 15 && d.audit_qty <= 25) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 25 && d.audit_qty <= 50) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);

				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 50 && d.audit_qty <= 90) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 90 && d.audit_qty <= 150) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 150 && d.audit_qty <= 280) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 280 && d.audit_qty <= 500) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 10000) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
		}
		if (frm.doc.inspection_level == "Special Inspection Level 3") {
			if (d.audit_qty > 2 && d.audit_qty <= 8) {

				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 8 && d.audit_qty <= 15) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 15 && d.audit_qty <= 25) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 25 && d.audit_qty <= 50) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);

				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 50 && d.audit_qty <= 90) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 90 && d.audit_qty <= 150) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 150 && d.audit_qty <= 280) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 280 && d.audit_qty <= 500) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
			}
			else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
			}
			else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
			}
			else if (d.audit_qty > 10000) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
			}
		}
		if (frm.doc.inspection_level == "Special Inspection Level 4") {
			if (d.audit_qty > 2 && d.audit_qty <= 8) {

				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 8 && d.audit_qty <= 15) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 2);

				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 15 && d.audit_qty <= 25) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 3);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 25 && d.audit_qty <= 50) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);

				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);

			}
			else if (d.audit_qty > 50 && d.audit_qty <= 90) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 5);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 90 && d.audit_qty <= 150) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 8);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 150 && d.audit_qty <= 280) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 280 && d.audit_qty <= 500) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 13);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 0);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 1);
			}
			else if (d.audit_qty > 500 && d.audit_qty <= 1200) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 20);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 1);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 2);
			}
			else if (d.audit_qty > 1200 && d.audit_qty <= 3200) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
			}
			else if (d.audit_qty > 3200 && d.audit_qty <= 10000) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 32);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 2);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 3);
			}
			else if (d.audit_qty > 10000) {


				frappe.model.set_value(d.doctype, d.name, 'sample_qty', 50);
				frappe.model.set_value(d.doctype, d.name, 'aql_accepted', 3);
				frappe.model.set_value(d.doctype, d.name, 'aql_rejected', 4);
			}
		}
	},

});
frappe.ui.form.on('Final Inspection Report CT', {
	miss_pick__double_pick_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	},
	fly_yarn_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	incorrect_construct_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	registration_out_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	miss_print_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	bowing_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	touching_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	streaks_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	salvage_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	smash_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	un_cut_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	os_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	wm_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	cc_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	nh_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	dm_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	mwl_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	us_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	bls_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	ohs_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	wt_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	p_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	},
	bs_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	},
	wd_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	},
	ss_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	wmb_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	wms_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	rwi_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	dpb_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	lbb_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	if_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	pdpb_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	mm_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	bp_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	wa_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	dc_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	wmm_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	ws_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	}
	,
	wbs_qty(frm, cdt, cdn) {
		set_qty(frm, cdt, cdn);
	},
});

function set_qty(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	frappe.model.set_value(d.doctype, d.name, 'total', d.miss_pick__double_pick_qty + d.fly_yarn_qty + d.incorrect_construct_qty + d.registration_out_qty + d.miss_print_qty + d.bowing_qty + d.touching_qty + d.streaks_qty + d.salvage_qty + d.smash_qty + d.un_cut_qty + d.os_qty + d.wm_qty + d.cc_qty + d.nh_qty + d.dm_qty + d.mwl_qty + d.us_qty + d.bls_qty + d.ohs_qty + d.wt_qty + d.p_qty + d.bs_qty + d.wd_qty + d.ss_qty + d.wmb_qty + d.wms_qty + d.rwi_qty + d.dpb_qty + d.lbb_qty + d.if_qty + d.pdpb_qty + d.mm_qty + d.bp_qty + d.wa_qty + d.dc_qty + d.wmm_qty + d.ws_qty + d.wbs_qty);
}

frappe.ui.form.on('Final Inspection Report CT', {
	miss_pick__double_pick_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	},
	fly_yarn_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	incorrect_construct_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	registration_out_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	miss_print_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	bowing_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	touching_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	streaks_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	salvage_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	smash_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	un_cut_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	os_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	wm_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	cc_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	nh_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	dm_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	mwl_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	us_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	bls_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	ohs_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	wt_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	p_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	},
	bs_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	},
	wd_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	},
	ss_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	wmb_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	wms_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	rwi_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	dpb_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	lbb_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	if_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	pdpb_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	mm_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	bp_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	wa_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	dc_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	wmm_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	ws_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
	,
	wbs_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	},
	owp_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	},
	fdo_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	},
	sdo_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	},
	pdo_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	},
	cdo_major(frm, cdt, cdn) {
		set_major(frm, cdt, cdn);
	}
});

function set_major(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	frappe.model.set_value(d.doctype, d.name, 'major', d.cdo_major + d.pdo_major + d.sdo_major + d.fdo_major + d.owp_major + d.miss_pick__double_pick_major + d.fly_yarn_major + d.incorrect_construct_major + d.pdpb_major + d.registration_out_major + d.miss_print_major + d.bowing_major + d.touching_major + d.streaks_major + d.salvage_major + d.smash_major + d.un_cut_major + d.os_major + d.wm_major + d.cc_major + d.nh_major + d.dm_major + d.mwl_major + d.us_major + d.bls_major + d.ohs_major + d.wt_major + d.p_major + d.bs_major + d.wd_major + d.ss_major + d.wmb_major + d.wms_major + d.rwi_major + d.dpb_major + d.lbb_major + d.if_major + d.pdpb_major + d.mm_major + d.bp_major + d.wa_major + d.dc_major + d.wmm_major + d.ws_major + d.wbs_major);
}




frappe.ui.form.on('Final Inspection Report CT', {
	miss_pick__double_pick_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	},
	fly_yarn_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	incorrect_construct_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	registration_out_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	miss_print_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	bowing_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	touching_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	streaks_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	salvage_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	smash_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	un_cut_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	os_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	wm_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	cc_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	nh_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	dm_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	mwc_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	us_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	bls_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	ohs_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	wt_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	p_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	},
	ms_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	},
	wd_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	},
	ss_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	wmb_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	wms_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	rwi_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	dpb_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	lbb_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	if_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	pdpb_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	mm_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	bp_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	wa_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	dc_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	wmm_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	ws_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	wms_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	owp_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	fdo_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	sdo_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	pdo_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	cdo_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	}
	,
	wbs_critical(frm, cdt, cdn) {
		set_critical(frm, cdt, cdn);
	},
});

function set_critical(frm, cdt, cdn) {
	var d = locals[cdt][cdn];

	frappe.model.set_value(d.doctype, d.name, 'critical', d.wbs_critical + d.cdo_critical + d.pdo_critical + d.sdo_critical + d.fdo_critical + d.owp_critical + d.miss_pick__double_pick_critical + d.fly_yarn_critical + d.incorrect_construct_critical + d.registration_out_critical + d.miss_print_critical + d.bowing_critical + d.touching_critical + d.streaks_critical + d.salvage_critical + d.smash_critical + d.un_cut_critical + d.os_critical + d.wm_critical + d.cc_critical + d.nh_critical + d.dm_critical + d.mwc_critical + d.us_critical + d.bls_critical + d.ohs_critical + d.wt_critical + d.p_critical + d.ms_critical + d.wd_critical + d.ss_critical + d.wmb_critical + d.rwi_critical + d.dpb_critical + d.lbb_critical + d.if_critical + d.pdpb_critical + d.mm_critical + d.bp_critical + d.wa_critical + d.dc_critical + d.wmm_critical + d.ws_critical + d.wms_critical);
}


frappe.ui.form.on('Final Inspection Report CT', {
	miss_pick__double_pick_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	},
	fly_yarn_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	incorrect_construct_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	registration_out_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	miss_print_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	bowing_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	touching_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	streaks_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	salvage_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	smash_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	un_cut_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	os_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	wm_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	cc_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	nh_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	dm_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	mwl_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	us_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	bls_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	ohs_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	wt_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	p_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	},
	bs_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	},
	wd_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	},
	ss_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	wmb_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	wms_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	rwi_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	dpb_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	lbb_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	if_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	pdpb_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	mm_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	bp_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	wa_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	dc_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	wmm_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	ws_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	wbs_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	cdo_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	pdo_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	sdo_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	fdo_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
	,
	owp_minor(frm, cdt, cdn) {
		set_minor(frm, cdt, cdn);
	}
});

function set_minor(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	frappe.model.set_value(d.doctype, d.name, 'minor', d.owp_minor + d.fdo_minor + d.sdo_minor + d.pdo_minor + d.cdo_minor + d.miss_pick__double_pick_minor + d.fly_yarn_minor + d.incorrect_construct_minor + d.registration_out_minor + d.miss_print_minor + d.bowing_minor + d.touching_minor + d.streaks_minor + d.salvage_minor + d.smash_minor + d.un_cut_minor + d.os_minor + d.wm_minor + d.cc_minor + d.nh_minor + d.dm_minor + d.mwl_minor + d.us_minor + d.bls_minor + d.ohs_minor + d.wt_minor + d.p_minor + d.bs_minor + d.wd_minor + d.ss_minor + d.wmb_minor + d.wms_minor + d.rwi_minor + d.dpb_minor + d.lbb_minor + d.if_minor + d.pdpb_minor + d.mm_minor + d.bp_minor + d.wa_minor + d.dc_minor + d.wmm_minor + d.ws_minor + d.wbs_minor);
}





frappe.ui.form.on("Final Inspection Report CT", {
	major: function (frm, cdt, cdn) {
		var d = locals[cdt][cdn];

		if (d.major > d.aql_accepted || d.minor > d.aql_rejected || d.critical > 0) {
			frappe.model.set_value(d.doctype, d.name, "status", "Fail");
		}
		else {
			frappe.model.set_value(d.doctype, d.name, "status", "Pass");
		}
	},
	minor: function (frm, cdt, cdn) {
		var d = locals[cdt][cdn];

		if (d.major > d.aql_accepted || d.minor > d.aql_rejected || d.critical > 0) {
			frappe.model.set_value(d.doctype, d.name, "status", "Fail");
		}
		else {
			frappe.model.set_value(d.doctype, d.name, "status", "Pass");
		}
	},
	critical: function (frm, cdt, cdn) {
		var d = locals[cdt][cdn];

		if (d.major > d.aql_accepted || d.minor > d.aql_rejected || d.critical > 0) {
			frappe.model.set_value(d.doctype, d.name, "status", "Fail");
		}
		else {
			frappe.model.set_value(d.doctype, d.name, "status", "Pass");
		}
	}
});





frappe.ui.form.on("Final Inspection Report", {
	customer: function (frm) {
		frm.set_query("po", function () {
			return {
				filters: [
					['Sales Order', 'customer', '=', frm.doc.customer]
				]
			};
		});
	}

});





frappe.ui.form.on("Final Inspection Report CT", {

	miss_pick__double_pick(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "miss_pick__double_pick_major", 0);
		frappe.model.set_value(d.doctype, d.name, "miss_pick__double_pick_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "miss_pick__double_pick_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "miss_pick__double_pick_qty", 0);
	},

	fly_yarn(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "fly_yarn_major", 0);
		frappe.model.set_value(d.doctype, d.name, "fly_yarn_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "fly_yarn_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "fly_yarn_qty", 0);
	},

	incorrect_construct(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "incorrect_construct_major", 0);
		frappe.model.set_value(d.doctype, d.name, "incorrect_construct_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "incorrect_construct_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "incorrect_construct_qty", 0);
	},


	registreation_out(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "registration_out_major", 0);
		frappe.model.set_value(d.doctype, d.name, "registration_out_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "registration_out_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "registration_out_qty", 0);
	},

	miss_print(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "miss_print_major", 0);
		frappe.model.set_value(d.doctype, d.name, "miss_print_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "miss_print_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "miss_print_qty", 0);
	},


	bowing(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "bowing_major", 0);
		frappe.model.set_value(d.doctype, d.name, "bowing_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "bowing_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "bowing_qty", 0);
	},

	touching(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "touching_major", 0);
		frappe.model.set_value(d.doctype, d.name, "touching_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "touching_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "touching_qty", 0);
	},


	streaks(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "streaks_major", 0);
		frappe.model.set_value(d.doctype, d.name, "streaks_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "streaks_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "streaks_qty", 0);
	},


	salvage(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "salvage_major", 0);
		frappe.model.set_value(d.doctype, d.name, "salvage_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "salvage_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "salvage_qty", 0);
	},


	smash(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "smash_major", 0);
		frappe.model.set_value(d.doctype, d.name, "smash_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "smash_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "smash_qty", 0);
	},


	oop_check(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "owp_major", 0);
		frappe.model.set_value(d.doctype, d.name, "owp_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "owp_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "weaving_qty", 0);
	},

	un_cut(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "un_cut_major", 0);
		frappe.model.set_value(d.doctype, d.name, "un_cut_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "un_cut_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "un_cut_qty", 0);
	},


	oil_stain(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "os_major", 0);
		frappe.model.set_value(d.doctype, d.name, "os_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "os_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "os_qty", 0);
	},

	wash_mark(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "wm_major", 0);
		frappe.model.set_value(d.doctype, d.name, "wm_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "wm_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "wm_qty", 0);
	},

	cliper_cut(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "cc_major", 0);
		frappe.model.set_value(d.doctype, d.name, "cc_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "cc_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "cc_qty", 0);
	},

	niddel_hole(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "nh_major", 0);
		frappe.model.set_value(d.doctype, d.name, "nh_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "nh_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "nh_qty", 0);
	},


	dust_marka(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "dm_major", 0);
		frappe.model.set_value(d.doctype, d.name, "dm_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "dm_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "dm_qty", 0);
	},

	fdo_check(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "finishing_qty", 0);
		frappe.model.set_value(d.doctype, d.name, "fdo_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "fdo_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "fdo_major", 0);
	},

	missing_label(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "mwl_major", 0);
		frappe.model.set_value(d.doctype, d.name, "mwl_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "mwc_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "mwl_qty", 0);
	},


	uneven_stitch(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "us_major", 0);
		frappe.model.set_value(d.doctype, d.name, "us_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "us_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "us_qty", 0);
	},

	broken_stitch(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "bls_major", 0);
		frappe.model.set_value(d.doctype, d.name, "bls_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "bls_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "bls_qty", 0);
	},


	open_hem(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "ohs_major", 0);
		frappe.model.set_value(d.doctype, d.name, "ohs_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "ohs_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "ohs_qty", 0);
	},


	wrong_thread(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "wt_major", 0);
		frappe.model.set_value(d.doctype, d.name, "wt_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "wt_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "wt_qty", 0);
	},

	puckering(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "p_major", 0);
		frappe.model.set_value(d.doctype, d.name, "p_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "p_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "p_qty", 0);
	},

	bed_stitch(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "bs_major", 0);
		frappe.model.set_value(d.doctype, d.name, "bs_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "ms_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "bs_qty", 0);
	},

	wrong_direction(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "wd_major", 0);
		frappe.model.set_value(d.doctype, d.name, "wd_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "wd_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "wd_qty", 0);
	},

	short_size(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "ss_major", 0);
		frappe.model.set_value(d.doctype, d.name, "ss_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "ss_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "ss_qty", 0);
	},

	sdo_check(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "sdo_major", 0);
		frappe.model.set_value(d.doctype, d.name, "sdo_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "sdo_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "sewing_qty", 0);
	},


	wrong_barcode(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "wmb_major", 0);
		frappe.model.set_value(d.doctype, d.name, "wmb_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "wmb_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "wmb_qty", 0);
	},


	wrong_size(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "wms_major", 0);
		frappe.model.set_value(d.doctype, d.name, "wms_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "wms_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "wms_qty", 0);
	},


	wrong_inlay(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "rwi_major", 0);
		frappe.model.set_value(d.doctype, d.name, "rwi_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "rwi_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "rwi_qty", 0);
	},


	damaged_poly_bags(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "dpb_major", 0);
		frappe.model.set_value(d.doctype, d.name, "dpb_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "dpb_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "dpb_qty", 0);
	},

	loos_bag(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "lbb_major", 0);
		frappe.model.set_value(d.doctype, d.name, "lbb_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "lbb_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "lbb_qty", 0);
	},

	incorrect_filling(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "if_major", 0);
		frappe.model.set_value(d.doctype, d.name, "if_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "if_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "if_qty", 0);
	},

	dust_in_poly_bag(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "pdpb_major", 0);
		frappe.model.set_value(d.doctype, d.name, "pdpb_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "pdpb_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "pdpb_qty", 0);
	},


	miss_matching(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "mm_major", 0);
		frappe.model.set_value(d.doctype, d.name, "mm_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "mm_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "mm_qty", 0);
	},

	bed_presentation(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "bp_major", 0);
		frappe.model.set_value(d.doctype, d.name, "bp_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "bp_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "bp_qty", 0);
	},

	wrong_assortment(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "wa_major", 0);
		frappe.model.set_value(d.doctype, d.name, "wa_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "wa_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "wa_qty", 0);
	},


	pdo_check(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "pdo_major", 0);
		frappe.model.set_value(d.doctype, d.name, "pdo_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "pdo_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "pdo_qty", 0);
	},


	damaged_cartons(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "dc_major", 0);
		frappe.model.set_value(d.doctype, d.name, "dc_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "dc_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "dc_qty", 0);
	},


	wrong_making(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "wmm_major", 0);
		frappe.model.set_value(d.doctype, d.name, "wmm_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "wmm_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "wmm_qty", 0);
	},

	carton_wrong_size(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "ws_major", 0);
		frappe.model.set_value(d.doctype, d.name, "ws_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "ws_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "ws_qty", 0);
	},


	wrong_barcode_carton(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "wbs_major", 0);
		frappe.model.set_value(d.doctype, d.name, "wbs_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "wbs_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "wbs_qty", 0);
	},

	cdo_check(frm, cdt, cdn) {
		var d = locals[cdt][cdn];


		frappe.model.set_value(d.doctype, d.name, "cdo_major", 0);
		frappe.model.set_value(d.doctype, d.name, "cdo_minor", 0);
		frappe.model.set_value(d.doctype, d.name, "cdo_critical", 0);
		frappe.model.set_value(d.doctype, d.name, "cdo_qty", 0);
	},
});




