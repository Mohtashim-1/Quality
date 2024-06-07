// Copyright (c) 2024, mohtashim and contributors
// For license information, please see license.txt

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
});

function set_tax(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	frappe.model.set_value(d.doctype, d.name, 'total_defect_pcs', d.double_stitch + d.defects_qty + d.open_seam + d.loose_stitch + d.oil_stain + d.overlap_feb + d.puckering + d.raw_edge + d.spi + d.uneven_stitch + d.bad_stitch + d.open_safty + d.skip_stitch + d.boot_mark + d.damage + d.wrong_direction + d.number_label_missing);
}


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

frappe.ui.form.on('Inline Stitching CT', {
	no_of_pcs: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let double_stitch = 0;
		let open_seam = 0;
		let loose_stitch = 0;
		let oil_stain = 0;
		let overlap_feb = 0;
		let puckering = 0;
		let raw_edge = 0;
		let spi = 0;
		let defects_qty = 0;
		let uneven_stitch = 0;
		let bad_stitch = 0;
		let open_safty = 0;
		let skip_stitch = 0;
		let boot_mark = 0;
		let damage = 0;
		let wrong_direction = 0;
		let number_label_missing = 0;
		let no_of_pcs = 0;
		for (let i in frm.doc.inline_stitching_ct) {
			double_stitch += frm.doc.inline_stitching_ct[i].double_stitch;
			open_seam += frm.doc.inline_stitching_ct[i].open_seam;
			loose_stitch += frm.doc.inline_stitching_ct[i].loose_stitch;
			oil_stain += frm.doc.inline_stitching_ct[i].oil_stain;
			overlap_feb += frm.doc.inline_stitching_ct[i].overlap_feb;
			puckering += frm.doc.inline_stitching_ct[i].puckering;
			raw_edge += frm.doc.inline_stitching_ct[i].raw_edge;
			spi += frm.doc.inline_stitching_ct[i].spi;
			defects_qty += frm.doc.inline_stitching_ct[i].defects_qty;
			uneven_stitch += frm.doc.inline_stitching_ct[i].uneven_stitch;
			bad_stitch += frm.doc.inline_stitching_ct[i].bad_stitch;
			open_safty += frm.doc.inline_stitching_ct[i].open_safty;
			skip_stitch += frm.doc.inline_stitching_ct[i].skip_stitch;
			boot_mark += frm.doc.inline_stitching_ct[i].boot_mark;
			damage += frm.doc.inline_stitching_ct[i].damage;
			wrong_direction += frm.doc.inline_stitching_ct[i].wrong_direction;
			number_label_missing += frm.doc.inline_stitching_ct[i].number_label_missing;
			no_of_pcs += frm.doc.inline_stitching_ct[i].no_of_pcs;
		}
		frm.set_value('double_stitch_total', double_stitch);
		frm.set_value('open_seam_total', open_seam);
		frm.set_value('loose_stitch_total', loose_stitch);
		frm.set_value('oil_stain_total', oil_stain);
		frm.set_value('overlap_feb_total', overlap_feb);
		frm.set_value('puckering_total', puckering);
		frm.set_value('raw_edge_total', raw_edge);
		frm.set_value('spi_total', spi);
		frm.set_value('other_defect_qty', defects_qty);
		frm.set_value('uneven_stitch_total', uneven_stitch);
		frm.set_value('bad_stitch_total', bad_stitch);
		frm.set_value('open_safty_total', open_safty);
		frm.set_value('skip_stitch_total', skip_stitch);
		frm.set_value('boot_mark_total', boot_mark);
		frm.set_value('damage_total', damage);
		frm.set_value('wrong_direction_total', wrong_direction);
		frm.set_value('number_label_missing_total', number_label_missing);
		frm.set_value('total_number_pcs', no_of_pcs);

		frm.refresh();
	},
	inline_stitching_ct: function (frm, cdt, cdn) {
		frm.script_manager.trigger('double_stitch', cdt, cdn);
		frm.script_manager.trigger('open_seam', cdt, cdn);
		frm.script_manager.trigger('loose_stitch_total', cdt, cdn);
		frm.script_manager.trigger('oil_stain_total', cdt, cdn);
		frm.script_manager.trigger('overlap_feb_total', cdt, cdn);
		frm.script_manager.trigger('puckering_total', cdt, cdn);
		frm.script_manager.trigger('raw_edge_total', cdt, cdn);
		frm.script_manager.trigger('spi_total', cdt, cdn);
		frm.script_manager.trigger('other_defect_qty', cdt, cdn);
		frm.script_manager.trigger('uneven_stitch', cdt, cdn);
		frm.script_manager.trigger('bad_stitch', cdt, cdn);
		frm.script_manager.trigger('open_safty', cdt, cdn);
		frm.script_manager.trigger('skip_stitch', cdt, cdn);
		frm.script_manager.trigger('boot_mark', cdt, cdn);
		frm.script_manager.trigger('damage', cdt, cdn);
		frm.script_manager.trigger('wrong_direction', cdt, cdn);
		frm.script_manager.trigger('number_label_missing', cdt, cdn);
		frm.script_manager.trigger('no_of_pcs', cdt, cdn)
	},
	inline_stitching_ct_remove(frm, cdt, cdn) {
		frm.script_manager.trigger('double_stitch', cdt, cdn);
		frm.script_manager.trigger('open_seam', cdt, cdn);
		frm.script_manager.trigger('loose_stitch_total', cdt, cdn);
		frm.script_manager.trigger('oil_stain_total', cdt, cdn);
		frm.script_manager.trigger('overlap_feb_total', cdt, cdn);
		frm.script_manager.trigger('puckering_total', cdt, cdn);
		frm.script_manager.trigger('raw_edge_total', cdt, cdn);
		frm.script_manager.trigger('spi_total', cdt, cdn);
		frm.script_manager.trigger('other_defect_qty', cdt, cdn);
		frm.script_manager.trigger('uneven_stitch', cdt, cdn);
		frm.script_manager.trigger('bad_stitch', cdt, cdn);
		frm.script_manager.trigger('open_safty', cdt, cdn);
		frm.script_manager.trigger('skip_stitch', cdt, cdn);
		frm.script_manager.trigger('boot_mark', cdt, cdn);
		frm.script_manager.trigger('damage', cdt, cdn);
		frm.script_manager.trigger('wrong_direction', cdt, cdn);
		frm.script_manager.trigger('number_label_missing', cdt, cdn);
		frm.script_manager.trigger('no_of_pcs', cdt, cdn)
	}
})

frappe.ui.form.on('Inline Stitching', {
	refresh(frm) {
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