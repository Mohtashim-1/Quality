// Copyright(c) 2024, mohtashim and contributors
// For license information, please see license.txt

frappe.ui.form.on('Daily Checking', {
    po: function (frm) {
        frm.doc.items = [];
        erpnext.utils.map_current_doc({
            method: "erpnext.quality_management.doctype.daily-random-inspection.daily-random-inspection.fetch_so_items",
            source_name: frm.doc.po,
            frm: frm
        });
    },

});


frappe.ui.form.on('Daily Checking Inspection CT', {

    audit_qty: function (frm, cdt, cdn) {
        console.log(frm.status);
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



//ERRORS Calculation ///





frappe.ui.form.on('Daily Checking Inspection CT', {
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

});


function set_major(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    // frappe.model.set_value(d.doctype, d.name, 'major',d.sdo_major+d.fdo_major+d.owp_major+ d.miss_pick__double_pick_major+
    // d.fly_yarn_major+d.incorrect_construct_major+d.registration_out_major+d.miss_print_major+d.bowing_major+d.touching_major+
    // d.streaks_major+d.salvage_major+d.smash_major+d.un_cut_major+d.os_major+d.wm_major+d.cc_major+d.nh_major+d.dm_major+
    // d.mwl_major+d.us_major+d.bls_major+d.ohs_major+d.wt_major+d.p_major+d.bs_major+d.wd_major+d.ss_major);
    frappe.model.set_value(d.doctype, d.name, 'major', d.miss_pick__double_pick_major + d.incorrect_construct_major + d.registration_out_major + d.miss_print_major +
        d.bowing_major + d.touching_major + d.streaks_major + d.salvage_major + d.smash_major + d.un_cut_major + d.owp_major +
        d.os_major + d.wm_major + d.cc_major + d.nh_major + d.dm_major + d.fdo_major + d.mwl_major + d.us_major + d.bls_major + d.ohs_major + d.wt_major + d.p_major
        + d.bs_major + d.wd_major + d.ss_major + d.sdo_major
    );

}




frappe.ui.form.on('Daily Checking Inspection CT', {
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
    },
    owp_critical(frm, cdt, cdn) {
        set_critical(frm, cdt, cdn);
    },

    fdo_critical(frm, cdt, cdn) {
        set_critical(frm, cdt, cdn);
    },
    sdo_critical(frm, cdt, cdn) {
        set_critical(frm, cdt, cdn);
    },
});

function set_critical(frm, cdt, cdn) {
    var d = locals[cdt][cdn];

    // frappe.model.set_value(d.doctype, d.name, 'critical',d.sdo_critical+d.fdo_critical+ d.owp_critical+d.miss_pick__double_pick_critical+
    // d.fly_yarn_critical+d.incorrect_construct_critical+d.registration_out_critical+d.miss_print_critical+d.bowing_critical+d.touching_critical+
    // d.streaks_critical+d.salvage_critical+d.smash_critical+d.un_cut_critical+d.os_critical+d.wm_critical+d.cc_critical+d.nh_critical+d.dm_critical+
    // d.mwc_critical+d.us_critical+d.bls_critical+d.ohs_critical+d.wt_critical+d.p_critical+d.ms_critical+d.wd_critical+d.ss_critical
    // );
    frappe.model.set_value(d.doctype, d.name, 'critical', d.miss_pick__double_pick_critical + d.fly_yarn_critical + d.incorrect_construct_critical
        + d.registration_out_critical + d.miss_print_critical + d.bowing_critical + d.touching_critical + d.streaks_critical + d.salvage_critical + d.smash_critical + d.owp_critical
        //  + d.un_cut_critical + d.os_critical + d.wm_critical + d.cc_critical + d.nh_critical + d.dm_critical + d.fdo_critical + d.missing_label_image 
        // + d.us_critical + d.bls_critical + d.ohs_critical + d.wt_critical + d.p_critical + d.ms_critical + d.wd_critical + d.ss_critical + d.sdo_critical 
    );
}


frappe.ui.form.on('Daily Checking Inspection CT', {
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
    },
    owp_minor(frm, cdt, cdn) {
        set_minor(frm, cdt, cdn);
    },
    fdo_minor(frm, cdt, cdn) {
        set_minor(frm, cdt, cdn);
    },
    sdo_minor(frm, cdt, cdn) {
        set_minor(frm, cdt, cdn);
    },
});

function set_minor(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    frappe.model.set_value(d.doctype, d.name, 'minor', d.sdo_minor + d.fdo_minor + d.owp_minor + d.miss_pick__double_pick_minor + d.fly_yarn_minor +
        d.incorrect_construct_minor + d.registration_out_minor + d.miss_print_minor + d.bowing_minor + d.touching_minor + d.streaks_minor + d.salvage_minor +
        d.smash_minor + d.un_cut_minor + d.os_minor + d.wm_minor + d.cc_minor + d.nh_minor + d.dm_minor + d.mwl_minor + d.us_minor + d.bls_minor + d.ohs_minor + d.wt_minor +
        d.p_minor + d.bs_minor + d.wd_minor + d.ss_minor);
}




frappe.ui.form.on("Daily Checking Inspection CT", {
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

frappe.ui.form.on("Daily Checking Inspection CT", {

    miss_pick__double_pick_critical(frm, cdt, cdn) {
        set_mispic_total(frm, cdt, cdn);
    },
    miss_pick__double_pick_minor(frm, cdt, cdn) {
        set_mispic_total(frm, cdt, cdn);
    },
    miss_pick__double_pick_major(frm, cdt, cdn) {
        set_mispic_total(frm, cdt, cdn);
    },

});
function set_mispic_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "miss_pick__double_pick_qty", d.miss_pick__double_pick_critical + d.miss_pick__double_pick_minor + d.miss_pick__double_pick_major);

}


frappe.ui.form.on("Daily Checking Inspection CT", {

    fly_yarn_critical(frm, cdt, cdn) {
        set_fly_total(frm, cdt, cdn);
    },
    fly_yarn_minor(frm, cdt, cdn) {
        set_fly_total(frm, cdt, cdn);
    },
    fly_yarn_major(frm, cdt, cdn) {
        set_fly_total(frm, cdt, cdn);
    },

});
function set_fly_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "fly_yarn_qty", d.fly_yarn_major + d.fly_yarn_minor + d.fly_yarn_critical);

}
frappe.ui.form.on("Daily Checking Inspection CT", {

    incorrect_construct_critical(frm, cdt, cdn) {
        set_ic_total(frm, cdt, cdn);
    },
    incorrect_construct_minor(frm, cdt, cdn) {
        set_ic_total(frm, cdt, cdn);
    },
    incorrect_construct_major(frm, cdt, cdn) {
        set_ic_total(frm, cdt, cdn);
    },

});
function set_ic_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "incorrect_construct_qty", d.incorrect_construct_critical + d.incorrect_construct_minor + d.incorrect_construct_major);

}



frappe.ui.form.on("Daily Checking Inspection CT", {

    registration_out_major(frm, cdt, cdn) {
        set_ro_total(frm, cdt, cdn);
    },
    registration_out_minor(frm, cdt, cdn) {
        set_ro_total(frm, cdt, cdn);
    },
    registration_out_critical(frm, cdt, cdn) {
        set_ro_total(frm, cdt, cdn);
    },

});
function set_ro_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "registration_out_qty", d.registration_out_critical + d.registration_out_minor + d.registration_out_major);

}




frappe.ui.form.on("Daily Checking Inspection CT", {

    miss_print_major(frm, cdt, cdn) {
        set_mp_total(frm, cdt, cdn);
    },
    miss_print_minor(frm, cdt, cdn) {
        set_mp_total(frm, cdt, cdn);
    },
    miss_print_critical(frm, cdt, cdn) {
        set_mp_total(frm, cdt, cdn);
    },

});
function set_mp_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];



    frappe.model.set_value(d.doctype, d.name, "miss_print_qty", d.miss_print_critical + d.miss_print_minor + d.miss_print_major);



}


frappe.ui.form.on("Daily Checking Inspection CT", {

    bowing_major(frm, cdt, cdn) {
        set_b_total(frm, cdt, cdn);
    },
    bowing_minor(frm, cdt, cdn) {
        set_b_total(frm, cdt, cdn);
    },
    bowing_critical(frm, cdt, cdn) {
        set_b_total(frm, cdt, cdn);
    },

});
function set_b_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "bowing_qty", d.bowing_critical + d.bowing_minor + d.bowing_major);

}




frappe.ui.form.on("Daily Checking Inspection CT", {

    touching_major(frm, cdt, cdn) {
        set_t_total(frm, cdt, cdn);
    },
    touching_minor(frm, cdt, cdn) {
        set_t_total(frm, cdt, cdn);
    },
    touching_critical(frm, cdt, cdn) {
        set_t_total(frm, cdt, cdn);
    },

});
function set_t_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "touching_qty", d.touching_critical + d.touching_minor + d.touching_major);

}


frappe.ui.form.on("Daily Checking Inspection CT", {

    streaks_major(frm, cdt, cdn) {
        set_s_total(frm, cdt, cdn);
    },
    streaks_minor(frm, cdt, cdn) {
        set_s_total(frm, cdt, cdn);
    },
    streaks_critical(frm, cdt, cdn) {
        set_s_total(frm, cdt, cdn);
    },

});
function set_s_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "streaks_qty", d.streaks_critical + d.streaks_minor + d.streaks_major);

}


frappe.ui.form.on("Daily Checking Inspection CT", {

    salvage_minor(frm, cdt, cdn) {
        set_sv_total(frm, cdt, cdn);
    },
    salvage_major(frm, cdt, cdn) {
        set_sv_total(frm, cdt, cdn);
    },
    salvage_critical(frm, cdt, cdn) {
        set_sv_total(frm, cdt, cdn);
    },

});
function set_sv_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "salvage_qty", d.salvage_critical + d.salvage_minor + d.salvage_major);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    smash_major(frm, cdt, cdn) {
        set_smash_total(frm, cdt, cdn);
    },
    smash_minor(frm, cdt, cdn) {
        set_smash_total(frm, cdt, cdn);
    },
    smash_critical(frm, cdt, cdn) {
        set_smash_total(frm, cdt, cdn);
    },

});
function set_smash_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "smash_qty", d.smash_critical + d.smash_minor + d.smash_major);

}




frappe.ui.form.on("Daily Checking Inspection CT", {

    owp_critical(frm, cdt, cdn) {
        set_wo_total(frm, cdt, cdn);
    },
    owp_minor(frm, cdt, cdn) {
        set_wo_total(frm, cdt, cdn);
    },
    owp_major(frm, cdt, cdn) {
        set_wo_total(frm, cdt, cdn);
    },

});
function set_wo_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "weaving_qty", d.owp_major + d.owp_minor + d.owp_critical);

}



frappe.ui.form.on("Daily Checking Inspection CT", {

    un_cut_major(frm, cdt, cdn) {
        set_uc_total(frm, cdt, cdn);
    },
    un_cut_minor(frm, cdt, cdn) {
        set_uc_total(frm, cdt, cdn);
    },
    un_cut_critical(frm, cdt, cdn) {
        set_uc_total(frm, cdt, cdn);
    },

});
function set_uc_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "un_cut_qty", d.un_cut_critical + d.un_cut_minor + d.un_cut_major);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    owp_major(frm, cdt, cdn) {
        set_weaving_total(frm, cdt, cdn);
    },
    owp_minor(frm, cdt, cdn) {
        set_weaving_total(frm, cdt, cdn);
    },
    owp_critical(frm, cdt, cdn) {
        set_weaving_total(frm, cdt, cdn);
    },

});
function set_weaving_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "weaving_total", d.owp_major + d.owp_minor + d.owp_critical);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    os_major(frm, cdt, cdn) {
        set_oil_stain_total(frm, cdt, cdn);
    },
    os_minor(frm, cdt, cdn) {
        set_oil_stain_total(frm, cdt, cdn);
    },
    os_critical(frm, cdt, cdn) {
        set_oil_stain_total(frm, cdt, cdn);
    },

});
function set_oil_stain_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "oil_stain_total", d.os_major + d.os_minor + d.os_critical);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    major(frm, cdt, cdn) {
        set_total_qty(frm, cdt, cdn)
    },
    minor(frm, cdt, cdn) {
        set_total_qty(frm, cdt, cdn)
    },
    critical(frm, cdt, cdn) {
        set_total_qty(frm, cdt, cdn)
    }

});
function set_total_qty(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    console.log(d.major, d.minor, d.critical)

    frappe.model.set_value(d.doctype, d.name, "total_qty", d.major + d.minor + d.critical);

}



frappe.ui.form.on("Daily Checking Inspection CT", {

    os_major(frm, cdt, cdn) {
        set_os_total(frm, cdt, cdn);
    },
    os_minor(frm, cdt, cdn) {
        set_os_total(frm, cdt, cdn);
    },
    os_critical(frm, cdt, cdn) {
        set_os_total(frm, cdt, cdn);
    },

});
function set_os_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "os_qty", d.os_critical + d.os_minor + d.os_major);

}


frappe.ui.form.on("Daily Checking Inspection CT", {

    wm_major(frm, cdt, cdn) {
        set_wm_total(frm, cdt, cdn);
    },
    wm_minor(frm, cdt, cdn) {
        set_wm_total(frm, cdt, cdn);
    },
    wm_critical(frm, cdt, cdn) {
        set_wm_total(frm, cdt, cdn);
    },

});
function set_wm_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "wm_qty", d.wm_critical + d.wm_minor + d.wm_major);

}





frappe.ui.form.on("Daily Checking Inspection CT", {

    cc_major(frm, cdt, cdn) {
        set_cc_total(frm, cdt, cdn);
    },
    cc_minor(frm, cdt, cdn) {
        set_cc_total(frm, cdt, cdn);
    },
    cc_critical(frm, cdt, cdn) {
        set_cc_total(frm, cdt, cdn);
    },

});
function set_cc_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "cc_qty", d.cc_critical + d.cc_minor + d.cc_major);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    nh_major(frm, cdt, cdn) {
        set_nh_total(frm, cdt, cdn);
    },
    nh_minor(frm, cdt, cdn) {
        set_nh_total(frm, cdt, cdn);
    },
    nh_critical(frm, cdt, cdn) {
        set_nh_total(frm, cdt, cdn);
    },

});
function set_nh_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "nh_qty", d.nh_critical + d.nh_minor + d.nh_major);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    dm_major(frm, cdt, cdn) {
        set_dm_total(frm, cdt, cdn);
    },
    dm_minor(frm, cdt, cdn) {
        set_dm_total(frm, cdt, cdn);
    },
    dm_critical(frm, cdt, cdn) {
        set_dm_total(frm, cdt, cdn);
    },

});
function set_dm_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "dm_qty", d.dm_critical + d.dm_minor + d.dm_major);

}



frappe.ui.form.on("Daily Checking Inspection CT", {

    fdo_major(frm, cdt, cdn) {
        set_fdo_total(frm, cdt, cdn);
    },
    fdo_minor(frm, cdt, cdn) {
        set_fdo_total(frm, cdt, cdn);
    },
    fdo_critical(frm, cdt, cdn) {
        set_fdo_total(frm, cdt, cdn);
    },

});
function set_fdo_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "finishing_qty", d.fdo_critical + d.fdo_minor + d.fdo_major);

}


frappe.ui.form.on("Daily Checking Inspection CT", {

    mwl_major(frm, cdt, cdn) {
        set_mwl_total(frm, cdt, cdn);
    },
    mwl_minor(frm, cdt, cdn) {
        set_mwl_total(frm, cdt, cdn);
    },
    mwc_critical(frm, cdt, cdn) {
        set_mwl_total(frm, cdt, cdn);
    },

});
function set_mwl_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "mwl_qty", d.mwc_critical + d.mwl_minor + d.mwl_major);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    us_major(frm, cdt, cdn) {
        set_us_total(frm, cdt, cdn);
    },
    us_minor(frm, cdt, cdn) {
        set_us_total(frm, cdt, cdn);
    },
    us_critical(frm, cdt, cdn) {
        set_us_total(frm, cdt, cdn);
    },

});
function set_us_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "us_qty", d.us_critical + d.us_minor + d.us_major);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    bls_major(frm, cdt, cdn) {
        set_bls_total(frm, cdt, cdn);
    },
    bls_minor(frm, cdt, cdn) {
        set_bls_total(frm, cdt, cdn);
    },
    bls_critical(frm, cdt, cdn) {
        set_bls_total(frm, cdt, cdn);
    },

});
function set_bls_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "bls_qty", d.bls_critical + d.bls_minor + d.bls_major);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    ohs_major(frm, cdt, cdn) {
        set_ohs_total(frm, cdt, cdn);
    },
    ohs_minor(frm, cdt, cdn) {
        set_ohs_total(frm, cdt, cdn);
    },
    ohs_critical(frm, cdt, cdn) {
        set_ohs_total(frm, cdt, cdn);
    },

});
function set_ohs_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "ohs_qty", d.ohs_critical + d.ohs_minor + d.ohs_major);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    wt_major(frm, cdt, cdn) {
        set_wt_total(frm, cdt, cdn);
    },
    wt_minor(frm, cdt, cdn) {
        set_wt_total(frm, cdt, cdn);
    },
    wt_critical(frm, cdt, cdn) {
        set_wt_total(frm, cdt, cdn);
    },

});
function set_wt_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "wt_qty", d.wt_critical + d.wt_minor + d.wt_major);

}



frappe.ui.form.on("Daily Checking Inspection CT", {

    p_major(frm, cdt, cdn) {
        set_p_total(frm, cdt, cdn);
    },
    p_minor(frm, cdt, cdn) {
        set_p_total(frm, cdt, cdn);
    },
    p_critical(frm, cdt, cdn) {
        set_p_total(frm, cdt, cdn);
    },

});
function set_p_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "p_qty", d.p_critical + d.p_minor + d.p_major);

}


frappe.ui.form.on("Daily Checking Inspection CT", {

    bs_major(frm, cdt, cdn) {
        set_bs_total(frm, cdt, cdn);
    },
    bs_minor(frm, cdt, cdn) {
        set_bs_total(frm, cdt, cdn);
    },
    ms_critical(frm, cdt, cdn) {
        set_bs_total(frm, cdt, cdn);
    },

});
function set_bs_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "bs_qty", d.ms_critical + d.bs_minor + d.bs_major);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    wd_major(frm, cdt, cdn) {
        set_wd_total(frm, cdt, cdn);
    },
    wd_minor(frm, cdt, cdn) {
        set_wd_total(frm, cdt, cdn);
    },
    wd_critical(frm, cdt, cdn) {
        set_wd_total(frm, cdt, cdn);
    },

});
function set_wd_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "wd_qty", d.wd_critical + d.wd_minor + d.wd_major);

}

frappe.ui.form.on("Daily Checking Inspection CT", {

    ss_major(frm, cdt, cdn) {
        set_ss_total(frm, cdt, cdn);
    },
    ss_minor(frm, cdt, cdn) {
        set_ss_total(frm, cdt, cdn);
    },
    ss_critical(frm, cdt, cdn) {
        set_ss_total(frm, cdt, cdn);
    },

});
function set_ss_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];

    frappe.model.set_value(d.doctype, d.name, "ss_qty", d.ss_major + d.ss_minor + d.ss_critical);
    // frappe.model.set_value(d.doctype, d.name, "ss_qty", d.ss_critical+d.ss_minor+d.ss_major);

}
frappe.ui.form.on("Daily Checking Inspection CT", {

    sdo_major(frm, cdt, cdn) {
        set_sdo_total(frm, cdt, cdn);
    },
    sdo_minor(frm, cdt, cdn) {
        set_sdo_total(frm, cdt, cdn);
    },
    sdo_critical(frm, cdt, cdn) {
        set_sdo_total(frm, cdt, cdn);
    },

});
function set_sdo_total(frm, cdt, cdn) {
    var d = locals[cdt][cdn];


    frappe.model.set_value(d.doctype, d.name, "sewing_qty", d.sdo_critical + d.sdo_minor + d.sdo_major);

}





frappe.ui.form.on('Daily Checking Inspection CT', {
    miss_pick__double_pick_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var miss_pick__double_pick_qty = 0;
        frm.doc.items.forEach(function (d) {
            miss_pick__double_pick_qty += d.miss_pick__double_pick_qty;
        });
        frm.set_value('miss_pick__double_pick_qty', miss_pick__double_pick_qty);
        refresh_field('miss_pick__double_pick_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var miss_pick__double_pick_qty = 0;
        frm.doc.items.forEach(function (d) { miss_pick__double_pick_qty += d.miss_pick__double_pick_qty; });
        frm.set_value('miss_pick__double_pick_qty', miss_pick__double_pick_qty);
        refresh_field('miss_pick__double_pick_qty');
    }
});





frappe.ui.form.on('Daily Checking Inspection CT', {
    fly_yarn_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var fly_yarn_qty = 0;
        frm.doc.items.forEach(function (d) {
            fly_yarn_qty += d.fly_yarn_qty;
        });
        frm.set_value('fly_yarn_qty', fly_yarn_qty);
        refresh_field('fly_yarn_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var fly_yarn_qty = 0;
        frm.doc.items.forEach(function (d) { fly_yarn_qty += d.fly_yarn_qty; });
        frm.set_value('fly_yarn_qty', fly_yarn_qty);
        refresh_field('fly_yarn_qty');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    incorrect_construct_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var incorrect_construct_qty = 0;
        frm.doc.items.forEach(function (d) {
            incorrect_construct_qty += d.incorrect_construct_qty;
        });
        frm.set_value('incorrect_construct_qty', incorrect_construct_qty);
        refresh_field('incorrect_construct_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var incorrect_construct_qty = 0;
        frm.doc.items.forEach(function (d) { incorrect_construct_qty += d.incorrect_construct_qty; });
        frm.set_value('incorrect_construct_qty', incorrect_construct_qty);
        refresh_field('incorrect_construct_qty');
    }
});






frappe.ui.form.on('Daily Checking Inspection CT', {
    registration_out_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var registration_out_qty = 0;
        frm.doc.items.forEach(function (d) {
            registration_out_qty += d.registration_out_qty;
        });
        frm.set_value('registration_out_qty', registration_out_qty);
        refresh_field('registration_out_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var registration_out_qty = 0;
        frm.doc.items.forEach(function (d) { registration_out_qty += d.registration_out_qty; });
        frm.set_value('registration_out_qty', registration_out_qty);
        refresh_field('registration_out_qty');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    miss_print_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var miss_print_qty = 0;
        frm.doc.items.forEach(function (d) {
            miss_print_qty += d.miss_print_qty;
        });
        frm.set_value('miss_print_qty', miss_print_qty);
        refresh_field('miss_print_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var miss_print_qty = 0;
        frm.doc.items.forEach(function (d) { miss_print_qty += d.miss_print_qty; });
        frm.set_value('miss_print_qty', miss_print_qty);
        refresh_field('miss_print_qty');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    bowing_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var bowing_qty = 0;
        frm.doc.items.forEach(function (d) {
            bowing_qty += d.bowing_qty;
        });
        frm.set_value('bowing_qty', bowing_qty);
        refresh_field('bowing_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var bowing_qty = 0;
        frm.doc.items.forEach(function (d) { bowing_qty += d.bowing_qty; });
        frm.set_value('bowing_qty', bowing_qty);
        refresh_field('bowing_qty');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    touching_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var touching_qty = 0;
        frm.doc.items.forEach(function (d) {
            touching_qty += d.touching_qty;
        });
        frm.set_value('touching_qty', touching_qty);
        refresh_field('touching_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var touching_qty = 0;
        frm.doc.items.forEach(function (d) { touching_qty += d.touching_qty; });
        frm.set_value('touching_qty', touching_qty);
        refresh_field('touching_qty');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    streaks_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var streaks_qty = 0;
        frm.doc.items.forEach(function (d) {
            streaks_qty += d.streaks_qty;
        });
        frm.set_value('streaks_qty', streaks_qty);
        refresh_field('streaks_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var streaks_qty = 0;
        frm.doc.items.forEach(function (d) { streaks_qty += d.streaks_qty; });
        frm.set_value('streaks_qty', streaks_qty);
        refresh_field('streaks_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    salvage_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var salvage_qty = 0;
        frm.doc.items.forEach(function (d) {
            salvage_qty += d.salvage_qty;
        });
        frm.set_value('salvage_qty', salvage_qty);
        refresh_field('salvage_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var salvage_qty = 0;
        frm.doc.items.forEach(function (d) { salvage_qty += d.salvage_qty; });
        frm.set_value('salvage_qty', salvage_qty);
        refresh_field('salvage_qty');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    smash_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var smash_qty = 0;
        frm.doc.items.forEach(function (d) {
            smash_qty += d.smash_qty;
        });
        frm.set_value('smash_qty', smash_qty);
        refresh_field('smash_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var smash_qty = 0;
        frm.doc.items.forEach(function (d) { smash_qty += d.smash_qty; });
        frm.set_value('smash_qty', smash_qty);
        refresh_field('smash_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    weaving_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var weaving_qty = 0;
        frm.doc.items.forEach(function (d) {
            weaving_qty += d.weaving_qty;
        });
        frm.set_value('weaving_qty', weaving_qty);
        refresh_field('weaving_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var weaving_qty = 0;
        frm.doc.items.forEach(function (d) { weaving_qty += d.weaving_qty; });
        frm.set_value('weaving_qty', weaving_qty);
        refresh_field('weaving_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    un_cut_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var un_cut_qty = 0;
        frm.doc.items.forEach(function (d) {
            un_cut_qty += d.un_cut_qty;
        });
        frm.set_value('un_cut_qty', un_cut_qty);
        refresh_field('un_cut_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var un_cut_qty = 0;
        frm.doc.items.forEach(function (d) { un_cut_qty += d.un_cut_qty; });
        frm.set_value('un_cut_qty', un_cut_qty);
        refresh_field('un_cut_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    os_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var os_qty = 0;
        frm.doc.items.forEach(function (d) {
            os_qty += d.os_qty;
        });
        frm.set_value('os_qty', os_qty);
        refresh_field('os_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var os_qty = 0;
        frm.doc.items.forEach(function (d) { os_qty += d.os_qty; });
        frm.set_value('os_qty', os_qty);
        refresh_field('os_qty');
    }
});

frappe.ui.form.on('Daily Checking Inspection CT', {
    wm_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var wm_qty = 0;
        frm.doc.items.forEach(function (d) {
            wm_qty += d.wm_qty;
        });
        frm.set_value('wm_qty', wm_qty);
        refresh_field('wm_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var wm_qty = 0;
        frm.doc.items.forEach(function (d) { wm_qty += d.wm_qty; });
        frm.set_value('wm_qty', wm_qty);
        refresh_field('wm_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    cc_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var cc_qty = 0;
        frm.doc.items.forEach(function (d) {
            cc_qty += d.cc_qty;
        });
        frm.set_value('cc_qty', cc_qty);
        refresh_field('cc_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var cc_qty = 0;
        frm.doc.items.forEach(function (d) { cc_qty += d.cc_qty; });
        frm.set_value('cc_qty', cc_qty);
        refresh_field('cc_qty');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    nh_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var nh_qty = 0;
        frm.doc.items.forEach(function (d) {
            nh_qty += d.nh_qty;
        });
        frm.set_value('nh_qty', nh_qty);
        refresh_field('nh_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var nh_qty = 0;
        frm.doc.items.forEach(function (d) { nh_qty += d.nh_qty; });
        frm.set_value('nh_qty', nh_qty);
        refresh_field('nh_qty');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    dm_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var dm_qty = 0;
        frm.doc.items.forEach(function (d) {
            dm_qty += d.dm_qty;
        });
        frm.set_value('dm_qty', dm_qty);
        refresh_field('dm_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var dm_qty = 0;
        frm.doc.items.forEach(function (d) { dm_qty += d.dm_qty; });
        frm.set_value('dm_qty', dm_qty);
        refresh_field('dm_qty');
    }
});




frappe.ui.form.on('Daily Checking Inspection CT', {
    finishing_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var finishing_qty = 0;
        frm.doc.items.forEach(function (d) {
            finishing_qty += d.finishing_qty;
        });
        frm.set_value('finishing_qty', finishing_qty);
        refresh_field('finishing_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var finishing_qty = 0;
        frm.doc.items.forEach(function (d) { finishing_qty += d.finishing_qty; });
        frm.set_value('finishing_qty', finishing_qty);
        refresh_field('finishing_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    mwl_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var mwl_qty = 0;
        frm.doc.items.forEach(function (d) {
            mwl_qty += d.mwl_qty;
        });
        frm.set_value('mwl_qty', mwl_qty);
        refresh_field('mwl_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var mwl_qty = 0;
        frm.doc.items.forEach(function (d) { mwl_qty += d.mwl_qty; });
        frm.set_value('mwl_qty', mwl_qty);
        refresh_field('mwl_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    us_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var us_qty = 0;
        frm.doc.items.forEach(function (d) {
            us_qty += d.us_qty;
        });
        frm.set_value('us_qty', us_qty);
        refresh_field('us_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var us_qty = 0;
        frm.doc.items.forEach(function (d) { us_qty += d.us_qty; });
        frm.set_value('us_qty', us_qty);
        refresh_field('us_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    bls_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var bls_qty = 0;
        frm.doc.items.forEach(function (d) {
            bls_qty += d.bls_qty;
        });
        frm.set_value('bls_qty', bls_qty);
        refresh_field('bls_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var bls_qty = 0;
        frm.doc.items.forEach(function (d) { bls_qty += d.bls_qty; });
        frm.set_value('bls_qty', bls_qty);
        refresh_field('bls_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    ohs_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var ohs_qty = 0;
        frm.doc.items.forEach(function (d) {
            ohs_qty += d.ohs_qty;
        });
        frm.set_value('ohs_qty', ohs_qty);
        refresh_field('ohs_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var ohs_qty = 0;
        frm.doc.items.forEach(function (d) { ohs_qty += d.ohs_qty; });
        frm.set_value('ohs_qty', ohs_qty);
        refresh_field('ohs_qty');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    wt_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var wt_qty = 0;
        frm.doc.items.forEach(function (d) {
            wt_qty += d.wt_qty;
        });
        frm.set_value('wt_qty', wt_qty);
        refresh_field('wt_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var wt_qty = 0;
        frm.doc.items.forEach(function (d) { wt_qty += d.wt_qty; });
        frm.set_value('wt_qty', wt_qty);
        refresh_field('wt_qty');
    }
});




frappe.ui.form.on('Daily Checking Inspection CT', {
    p_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var p_qty = 0;
        frm.doc.items.forEach(function (d) {
            p_qty += d.p_qty;
        });
        frm.set_value('p_qty', p_qty);
        refresh_field('p_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var p_qty = 0;
        frm.doc.items.forEach(function (d) { p_qty += d.p_qty; });
        frm.set_value('p_qty', p_qty);
        refresh_field('p_qty');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    bs_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var bs_qty = 0;
        frm.doc.items.forEach(function (d) {
            bs_qty += d.bs_qty;
        });
        frm.set_value('bs_qty', bs_qty);
        refresh_field('bs_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var bs_qty = 0;
        frm.doc.items.forEach(function (d) { bs_qty += d.bs_qty; });
        frm.set_value('bs_qty', bs_qty);
        refresh_field('bs_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    wd_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var wd_qty = 0;
        frm.doc.items.forEach(function (d) {
            wd_qty += d.wd_qty;
        });
        frm.set_value('wd_qty', wd_qty);
        refresh_field('wd_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var wd_qty = 0;
        frm.doc.items.forEach(function (d) { wd_qty += d.wd_qty; });
        frm.set_value('wd_qty', wd_qty);
        refresh_field('wd_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    ss_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var ss_qty = 0;
        frm.doc.items.forEach(function (d) {
            ss_qty += d.ss_qty;
        });
        frm.set_value('ss_qty', ss_qty);
        // frm.set_value('ss_qty', 10);
        refresh_field('ss_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var ss_qty = 0;
        frm.doc.items.forEach(function (d) { ss_qty += d.ss_qty; });
        frm.set_value('ss_qty', ss_qty);
        refresh_field('ss_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
    sewing_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var sewing_qty = 0;
        frm.doc.items.forEach(function (d) {
            sewing_qty += d.sewing_qty;
        });
        frm.set_value('sewing_qty', sewing_qty);
        refresh_field('sewing_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var sewing_qty = 0;
        frm.doc.items.forEach(function (d) { sewing_qty += d.sewing_qty; });
        frm.set_value('sewing_qty', sewing_qty);
        refresh_field('sewing_qty');
    }
});




frappe.ui.form.on('Daily Checking Inspection CT', {
    total_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_defects = 0;
        frm.doc.items.forEach(function (d) {
            total_defects += d.total_qty;
        });
        frm.set_value('total_defects', total_defects);
        refresh_field('total_defects');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_defects = 0;
        frm.doc.items.forEach(function (d) { total_defects += d.total_qty; });
        frm.set_value('total_defects', total_defects);
        refresh_field('total_defects');
    }
});





frappe.ui.form.on('Daily Checking Inspection CT', {
    sample_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_sample_qty = 0;
        frm.doc.items.forEach(function (d) {
            total_sample_qty += d.sample_qty;
        });
        frm.set_value('total_sample_qty', total_sample_qty);
        refresh_field('total_sample_qty');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_sample_qty = 0;
        frm.doc.items.forEach(function (d) { total_sample_qty += d.sample_qty; });
        frm.set_value('total_sample_qty', total_sample_qty);
        refresh_field('total_sample_qty');
    }
});



frappe.ui.form.on('Daily Checking Inspection CT', {
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


    weaving_qty(frm, cdt, cdn) {
        set_qty(frm, cdt, cdn);
    }
    ,
    finishing_qty(frm, cdt, cdn) {
        set_qty(frm, cdt, cdn);
    },
    sewing_qty(frm, cdt, cdn) {
        set_qty(frm, cdt, cdn);
    }
});

function set_qty(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    frappe.model.set_value(d.doctype, d.name, 'total', d.sewing_qty + d.finishing_qty + d.weaving_qty + d.miss_pick__double_pick_qty + d.fly_yarn_qty + d.incorrect_construct_qty + d.registration_out_qty + d.miss_print_qty + d.bowing_qty + d.touching_qty + d.streaks_qty + d.salvage_qty + d.smash_qty + d.un_cut_qty + d.os_qty + d.wm_qty + d.cc_qty + d.nh_qty + d.dm_qty + d.mwl_qty + d.us_qty + d.bls_qty + d.ohs_qty + d.wt_qty + d.p_qty + d.bs_qty + d.wd_qty + d.ss_qty);
}


frappe.ui.form.on('Daily Checking', {




    refresh(frm) {
        frm.set_value('percent', (frm.doc.total_defects * 100) / frm.doc.total_sample_qty)

    }

});





frappe.ui.form.on('Daily Checking Inspection CT', {
    audit_qty: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_audit = 0;
        frm.doc.items.forEach(function (d) {
            total_audit += d.audit_qty;
        });
        frm.set_value('total_audit', total_audit);
        refresh_field('total_audit');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_audit = 0;
        frm.doc.items.forEach(function (d) { total_audit += d.audit_qty; });
        frm.set_value('total_audit', total_audit);
        refresh_field('total_audit');
    }
});





frappe.ui.form.on('Daily Checking Inspection CT', {
    major: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_major = 0;
        frm.doc.items.forEach(function (d) {
            total_major += d.major;
        });
        frm.set_value('total_major', total_major);
        refresh_field('total_major');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_major = 0;
        frm.doc.items.forEach(function (d) { total_major += d.major; });
        frm.set_value('total_major', total_major);
        refresh_field('total_major');
    }
});


frappe.ui.form.on('Daily Checking Inspection CT', {
    minor: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_minor = 0;
        frm.doc.items.forEach(function (d) {
            total_minor += d.minor;
        });
        frm.set_value('total_minor', total_minor);
        refresh_field('total_minor');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_minor = 0;
        frm.doc.items.forEach(function (d) { total_minor += d.minor; });
        frm.set_value('total_minor', total_minor);
        refresh_field('total_minor');
    }
});






frappe.ui.form.on('Daily Checking Inspection CT', {
    critical: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_critical = 0;
        frm.doc.items.forEach(function (d) {
            total_critical += d.critical;
        });
        frm.set_value('total_critical', total_critical);
        refresh_field('total_critical');
    },

    items_remove: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total_critical = 0;
        frm.doc.items.forEach(function (d) { total_critical += d.critical; });
        frm.set_value('total_critical', total_critical);
        refresh_field('total_critical');
    }
});





frappe.ui.form.on("Daily Checking Inspection CT", {

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

});



