frappe.ui.form.on('Inline Stitching', {
    refresh: function(frm) {
        frm.set_df_property('start_time', 'read_only', 1);
        frm.set_df_property('end_time', 'read_only', 1);

        if (!frm.doc.start_time && frm.doc.docstatus != 1) {
            frm.add_custom_button(__('Set Start Time'), function() {
                let now = frappe.datetime.now_datetime();
                frm.set_value('start_time', now);
                frm.refresh_field('start_time');
                frm.refresh();
            });
        }

        if (frm.doc.start_time && !frm.doc.end_time && frm.doc.docstatus != 1) {
            frm.add_custom_button(__('Set End Time'), function() {
                let now = frappe.datetime.now_datetime();
                frm.set_value('end_time', now);
                frm.refresh_field('end_time');
                frm.refresh();
            });
        }
    },

    before_save: function(frm) {
        if (!frm.doc.start_time) {
            frappe.throw(__('Start Time is mandatory'));
        }
    },
    // before_save: function(frm) {
    //     if (frm.doc.docstatus == 0 && !frm.doc.end_time) {
    //         frappe.throw(__('End Time is mandatory before save'));
    //     }
    // },

    before_submit: function(frm) {
        if (frm.doc.docstatus == 0 && !frm.doc.end_time) {
            frappe.throw(__('End Time is mandatory before submission'));
        }
    },

    before_load: function(frm) {
        if (frm.is_new()) {
            frm.set_value('start_time', null);
            frm.set_value('end_time', null);
        }
    },

});




frappe.ui.form.on('Inline Stitching CT', {
	inline_stitching_ct_add: function (frm, cdt, cdn) {
		calculate_totals(frm);
	},
	inline_stitching_ct_remove: function (frm, cdt, cdn) {
		calculate_totals(frm);
	},
	no_of_pcs: function (frm, cdt, cdn) {
		calculate_totals(frm);
	},
	before_save: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, double_stitch: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, open_seam: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, loose_stitch: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, oil_stain: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, overlap_feb: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, puckering: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, raw_edge: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, spi: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, defects_qty: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, uneven_stitch: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, bad_stitch: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, open_safty: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, skip_stitch: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, boot_mark: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, damage: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, wrong_direction: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, number_label_missing: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, no_of_pcs: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}, total_defects: function (frm, cdt, cdn) {
		calculate_totals(frm);
	}

});

function calculate_totals(frm) {
	let totals = {
		double_stitch: 0,
		open_seam: 0,
		loose_stitch: 0,
		oil_stain: 0,
		overlap_feb: 0,
		puckering: 0,
		raw_edge: 0,
		spi: 0,
		defects_qty: 0,
		uneven_stitch: 0,
		bad_stitch: 0,
		open_safty: 0,
		skip_stitch: 0,
		boot_mark: 0,
		damage: 0,
		wrong_direction: 0,
		number_label_missing: 0,
		no_of_pcs: 0,
		total_defects: 0
	};

	frm.doc.inline_stitching_ct.forEach(function (row) {
		totals.double_stitch += row.double_stitch || 0;
		totals.open_seam += row.open_seam || 0;
		totals.loose_stitch += row.loose_stitch || 0;
		totals.oil_stain += row.oil_stain || 0;
		totals.overlap_feb += row.overlap_feb || 0;
		totals.puckering += row.puckering || 0;
		totals.raw_edge += row.raw_edge || 0;
		totals.spi += row.spi || 0;
		totals.defects_qty += row.defects_qty || 0;
		totals.uneven_stitch += row.uneven_stitch || 0;
		totals.bad_stitch += row.bad_stitch || 0;
		totals.open_safty += row.open_safty || 0;
		totals.skip_stitch += row.skip_stitch || 0;
		totals.boot_mark += row.boot_mark || 0;
		totals.damage += row.damage || 0;
		totals.wrong_direction += row.wrong_direction || 0;
		totals.number_label_missing += row.number_label_missing || 0;
		totals.no_of_pcs += row.no_of_pcs || 0;
		totals.total_defects += row.total_defect_pcs || 0;
	});

	frm.set_value('double_stitch_total', totals.double_stitch);
	frm.set_value('open_seam_total', totals.open_seam);
	frm.set_value('loose_stitch_total', totals.loose_stitch);
	frm.set_value('oil_stain_total', totals.oil_stain);
	frm.set_value('overlap_feb_total', totals.overlap_feb);
	frm.set_value('puckering_total', totals.puckering);
	frm.set_value('raw_edge_total', totals.raw_edge);
	frm.set_value('spi_total', totals.spi);
	frm.set_value('other_defect_qty', totals.defects_qty);
	frm.set_value('uneven_stitch_total', totals.uneven_stitch);
	frm.set_value('bad_stitch_total', totals.bad_stitch);
	frm.set_value('open_safty_total', totals.open_safty);
	frm.set_value('skip_stitch_total', totals.skip_stitch);
	frm.set_value('boot_mark_total', totals.boot_mark);
	frm.set_value('damage_total', totals.damage);
	frm.set_value('wrong_direction_total', totals.wrong_direction);
	frm.set_value('number_label_missing_total', totals.number_label_missing);
	frm.set_value('total_number_pcs', totals.no_of_pcs);
	frm.set_value('total_defects', totals.total_defects);

	frm.refresh_fields();
}
frappe.ui.form.on('Inline Stitching', {
	total_defects(frm) {
		frm.set_value('ds_percent', (frm.doc.double_stitch_total * 100) / frm.doc.total_number_pcs);
		frm.set_value('of_percent', (frm.doc.overlap_feb_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('us_percent', (frm.doc.uneven_stitch_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('bm_percent', (frm.doc.boot_mark_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('od_percent', (frm.doc.other_defect_qty * 100) / frm.doc.total_number_pcs)
		frm.set_value('o_seam_percent', (frm.doc.open_seam_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('p_percent', (frm.doc.puckering_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('bs_percent', (frm.doc.bad_stitch_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('d_percent', (frm.doc.damage_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('ls_percent', (frm.doc.loose_stitch_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('re_percent', (frm.doc.raw_edge_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('o_percent', (frm.doc.open_safty_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('wd_percent', (frm.doc.wrong_direction_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('os_percent', (frm.doc.oil_stain_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('s_percent', (frm.doc.spi_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('ss_percent', (frm.doc.skip_stitch_total * 100) / frm.doc.total_number_pcs)
		frm.set_value('nlm_percent', (frm.doc.number_label_missing_total * 100) / frm.doc.total_number_pcs)


	},
	before_Save(frm) {
		frm.set_value('defect_percentage', (frm.doc.total_defects * 100) / frm.doc.total_number_pcs);
	},
	total_number_pcs(frm) {
		frm.set_value('defect_percentage', (frm.doc.total_defects * 100) / frm.doc.total_number_pcs);
	},
	total_defects(frm) {
		frm.set_value('defect_percentage', (frm.doc.total_defects * 100) / frm.doc.total_number_pcs);
	},

}
);

frappe.ui.form.on('Inline Stitching CT', {
	no_of_pcs: function (frm, cdt, cdn) {
		var d = locals[cdt][cdn];
		// console.log(d)
		var total_defect_pcs = 0;
		frm.doc.inline_stitching_ct.forEach(function (d) {
			total_defect_pcs += d.total_defect_pcs;
		});

		frm.set_value('total_defects', total_defect_pcs);
		refresh_field('total_defects');

	}
});




frappe.ui.form.on('Inline Stitching CT', {
	double_stitch(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},

	open_seam(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},

	loose_stitch(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},
	oil_stain(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},
	overlap_feb(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},
	puckering(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},
	raw_edge(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},
	spi(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},
	uneven_stitch(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},
	bad_stitch(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},
	open_safty(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},
	skip_stitch(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},

	boot_mark(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},

	damage(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},

	wrong_direction(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},

	number_label_missing(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},


	defects_qty(frm, cdt, cdn) {
		set_tax(frm, cdt, cdn);
	},
	inline_stitching_ct:function(frm,cdt,cdn){
		set_tax(frm, cdt, cdn);
	},
	inline_stitching_ct_on_remove:function(frm,cdt,cdn){
		set_tax(frm, cdt, cdn);
	},
	inline_stitching_ct_on_add:function(frm,cdt,cdn){
		set_tax(frm, cdt, cdn);
	},
	refresh:function(frm,cdt,cdn){
		set_tax(frm, cdt, cdn);
	}		

});



function set_tax(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	// console.log(d)
	// frappe.model.set_value(d.doctype, d.name, 'total_defect_pcs', d.double_stitch + d.defects_qty + d.open_seam + d.loose_stitch + d.oil_stain + d.overlap_feb + d.puckering + d.raw_edge + d.spi + d.uneven_stitch + d.bad_stitch + d.open_safty + d.skip_stitch + d.boot_mark + d.damage + d.wrong_direction + d.number_label_missing);
	frappe.model.set_value(d.doctype, d.name, 'total_defect_pcs',(d.double_stitch + d.open_seam + d.loose_stitch + d.oil_stain+d.overlap_feb + d.puckering + d.raw_edge+ d.spi +d.uneven_stitch + d.bad_stitch + d.open_safty + d.skip_stitch +d.boot_mark + d.damage + d.wrong_direction + d.number_label_missing + d.defects_qty) );

	frm.refresh_field('total_defect_pcs');	
}
frappe.ui.form.on('Inline Stitching CT', {
	no_of_pcs: function (frm, cdt, cdn) {
		var d = locals[cdt][cdn];
		var total_defects = 0;
		frm.doc.inline_stitching_ct.forEach(function (d) {
			total_defects += d.total_defect_pcs;
		});

		frm.set_value('total_defects', total_defects);
		refresh_field('total_defects');

	}
});

frappe.ui.form.on('Inline Stitching CT', {
	total_defect_pcs: function (frm, cdt, cdn) {
		var d = locals[cdt][cdn];
		var total_defects = 0;
		frm.doc.inline_stitching_ct.forEach(function (d) {
			total_defects += d.total_defect_pcs;
		});

		frm.set_value('total_defects', total_defects);
		refresh_field('total_defects');

	}
});

