frappe.pages["quality-dashboard"].on_page_load = function (wrapper) {
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: __("Quality Dashboard"),
		single_column: true,
	});

	frappe.require("/assets/quality_addon/css/quality_dashboard.css");

	const $root = $(`
		<div class="quality-dashboard-page">
			<div class="qd-filters row"></div>
			<div class="qd-content">
				<div class="qd-loading"><i class="fa fa-spinner fa-spin"></i> ${__("Loading...")}</div>
			</div>
		</div>
	`).appendTo(page.main);

	const dashboard = new QualityDashboardPage(page, $root);
	dashboard.init();
};

class QualityDashboardPage {
	constructor(page, $root) {
		this.page = page;
		this.$root = $root;
		this.$filters = $root.find(".qd-filters");
		this.$content = $root.find(".qd-content");
		this.filter_controls = {};
		this.charts = {};
	}

	init() {
		this.make_filters();
		this.load_chartjs().then(() => this.refresh()).catch(() => this.refresh());
	}

	make_filters() {
		const from = frappe.datetime.add_days(frappe.datetime.get_today(), -30);
		const to = frappe.datetime.get_today();

		this.filter_controls.from_date = frappe.ui.form.make_control({
			parent: $('<div class="col-md-3"></div>').appendTo(this.$filters)[0],
			df: { fieldtype: "Date", label: __("From Date"), fieldname: "from_date", default: from },
			render_input: true,
		});
		this.filter_controls.to_date = frappe.ui.form.make_control({
			parent: $('<div class="col-md-3"></div>').appendTo(this.$filters)[0],
			df: { fieldtype: "Date", label: __("To Date"), fieldname: "to_date", default: to },
			render_input: true,
		});
		this.filter_controls.order_sheet = frappe.ui.form.make_control({
			parent: $('<div class="col-md-4"></div>').appendTo(this.$filters)[0],
			df: {
				fieldtype: "Link",
				label: __("Order Sheet"),
				fieldname: "order_sheet",
				options: "Order Sheet",
			},
			render_input: true,
		});

		const $actions = $('<div class="col-md-2 d-flex align-items-end"></div>').appendTo(this.$filters);
		$('<button class="btn btn-primary btn-sm mr-2">')
			.text(__("Apply"))
			.on("click", () => this.refresh())
			.appendTo($actions);
		$('<button class="btn btn-default btn-sm">')
			.text(__("Clear"))
			.on("click", () => {
				this.filter_controls.order_sheet.set_value("");
				this.filter_controls.from_date.set_value(from);
				this.filter_controls.to_date.set_value(to);
				this.refresh();
			})
			.appendTo($actions);
	}

	get_filters() {
		return {
			from_date: this.filter_controls.from_date.get_value(),
			to_date: this.filter_controls.to_date.get_value(),
			order_sheet: this.filter_controls.order_sheet.get_value() || undefined,
		};
	}

	load_chartjs() {
		return frappe.require([
			"/assets/quality_addon/js/chart.min.js",
			"/assets/quality_addon/js/quality_chartjs.js",
		]).then(() => {
			if (typeof quality_addon !== "undefined" && quality_addon.chartjs) {
				return quality_addon.chartjs.load();
			}
			if (typeof Chart !== "undefined") return Chart;
			throw new Error("Chart.js not available");
		});
	}

	refresh() {
		this.$content.html(
			`<div class="qd-loading"><i class="fa fa-spinner fa-spin"></i> ${__("Loading quality data...")}</div>`
		);
		frappe.call({
			method:
				"quality_addon.quality_addon.page.quality_dashboard.quality_dashboard.get_dashboard_data",
			args: { filters: this.get_filters() },
			callback: (r) => this.render(r.message || {}),
			error: () => {
				this.$content.html(
					`<div class="alert alert-danger">${__("Failed to load quality dashboard.")}</div>`
				);
			},
		});
	}

	fmt(n) {
		return frappe.format(n || 0, { fieldtype: "Float", precision: 0 });
	}

	pct(n) {
		return (Number(n) || 0).toFixed(1);
	}

	summary_card(title, value, icon, colorClass, sub) {
		return `
			<div class="col-md-2 col-sm-4 col-xs-6">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">${title}</h6>
								<h3 class="mb-0 ${colorClass || ""}">${value}</h3>
								${sub ? `<small class="text-muted">${sub}</small>` : ""}
							</div>
							<div class="align-self-center"><i class="fa ${icon} fa-2x ${colorClass || "text-primary"}"></i></div>
						</div>
					</div>
				</div>
			</div>`;
	}

	render_inspection_table(ins) {
		const bySrc = ins.by_source || {};
		const rows = [
			["Daily Checking", bySrc["Daily Checking"] || {}],
			["Inline Stitching", bySrc["Inline Stitching"] || {}],
			["Final Inspection", bySrc["Final Inspection"] || {}],
		];
		return `
			<table class="table table-bordered table-sm mb-0">
				<thead><tr>
					<th>${__("Source")}</th>
					<th class="text-right">${__("Pcs Checked")}</th>
					<th class="text-right">${__("Major")}</th>
					<th class="text-right">${__("Minor")}</th>
					<th class="text-right">${__("Critical")}</th>
					<th class="text-right">${__("Total Defects")}</th>
					<th class="text-right">${__("Defect %")}</th>
				</tr></thead>
				<tbody>
					${rows
						.map(([label, r]) => {
							const pcs = Number(r.pcs_checked) || 0;
							const def = Number(r.defect_qty) || 0;
							const rate = pcs ? ((def / pcs) * 100).toFixed(1) : "0.0";
							return `<tr>
								<td>${frappe.utils.escape_html(label)}</td>
								<td class="text-right">${this.fmt(pcs)}</td>
								<td class="text-right text-danger">${this.fmt(r.major)}</td>
								<td class="text-right text-warning">${this.fmt(r.minor)}</td>
								<td class="text-right">${this.fmt(r.critical)}</td>
								<td class="text-right">${this.fmt(def)}</td>
								<td class="text-right">${rate}%</td>
							</tr>`;
						})
						.join("")}
					<tr class="qd-totals-row">
						<td>${__("Grand Total")}</td>
						<td class="text-right">${this.fmt(ins.pcs_checked)}</td>
						<td class="text-right text-danger">${this.fmt(ins.major)}</td>
						<td class="text-right text-warning">${this.fmt(ins.minor)}</td>
						<td class="text-right">${this.fmt(ins.critical)}</td>
						<td class="text-right">${this.fmt(ins.total_defects)}</td>
						<td class="text-right">${this.pct(ins.defect_rate)}%</td>
					</tr>
				</tbody>
			</table>`;
	}

	render_operator_table(opData) {
		const operators = opData.operators || [];
		if (!operators.length) {
			return `<p class="text-muted text-center p-4">${__(
				"No operator or checker data for the selected filters."
			)}</p>`;
		}
		const worst = opData.worst_operator;
		return `
			${worst ? `<div class="alert alert-danger py-2 mb-3"><i class="fa fa-exclamation-triangle"></i> <strong>${__("Worst performer")}:</strong> ${frappe.utils.escape_html(worst)}</div>` : ""}
			<table class="table table-bordered table-sm table-hover mb-0">
				<thead><tr>
					<th>${__("Rank")}</th>
					<th>${__("Operator / Checker")}</th>
					<th>${__("Source")}</th>
					<th class="text-right">${__("Pcs Checked")}</th>
					<th class="text-right">${__("Major")}</th>
					<th class="text-right">${__("Minor")}</th>
					<th class="text-right">${__("Critical")}</th>
					<th class="text-right">${__("Total Defects")}</th>
					<th class="text-right">${__("Defect %")}</th>
					<th class="text-center">${__("Status")}</th>
				</tr></thead>
				<tbody>
					${operators
						.map((op) => {
							const sk = op.status_key || "ok";
							const rowCls =
								sk === "worst" ? "qd-op-worst" : sk === "high" ? "qd-op-high" : "";
							let badge = "qd-badge-ok";
							if (sk === "worst") badge = "qd-badge-worst";
							else if (sk === "high") badge = "qd-badge-high";
							else if (sk === "watch") badge = "badge badge-warning";
							return `<tr class="${rowCls}">
								<td class="text-center">${op.rank}</td>
								<td><strong>${frappe.utils.escape_html(op.operator)}</strong></td>
								<td><small>${frappe.utils.escape_html(op.sources)}</small></td>
								<td class="text-right">${this.fmt(op.pcs_checked)}</td>
								<td class="text-right">${this.fmt(op.major)}</td>
								<td class="text-right">${this.fmt(op.minor)}</td>
								<td class="text-right">${this.fmt(op.critical)}</td>
								<td class="text-right"><strong>${this.fmt(op.defect_qty)}</strong></td>
								<td class="text-right"><strong>${this.pct(op.defect_rate)}%</strong></td>
								<td class="text-center"><span class="badge ${badge}">${frappe.utils.escape_html(op.status)}</span></td>
							</tr>`;
						})
						.join("")}
				</tbody>
			</table>`;
	}

	render(data) {
		const s = data.summary || {};
		const ins = data.inspection_summary || {};
		const opData = data.operator_performance || {};
		const bySource = data.by_source || [];
		const topOps = (opData.operators || []).slice(0, 10);

		this.$content.html(`
			<div class="row dashboard-summary">
				${this.summary_card(__("Pcs Checked"), this.fmt(s.pcs_checked), "fa-check-square", "text-primary")}
				${this.summary_card(__("Major"), this.fmt(s.major), "fa-times-circle", "text-danger")}
				${this.summary_card(__("Minor"), this.fmt(s.minor), "fa-exclamation-circle", "text-warning")}
				${this.summary_card(__("Critical"), this.fmt(s.critical), "fa-ban", "text-danger")}
				${this.summary_card(__("Total Defects"), this.fmt(s.total_defects), "fa-bug", "text-warning")}
				${this.summary_card(__("Defect Rate"), `${this.pct(s.defect_rate)}%`, "fa-percent", "text-danger")}
			</div>
			<div class="row dashboard-summary">
				${this.summary_card(__("Daily Checking"), s.daily_checking_count || 0, "fa-clipboard", "text-primary", __("docs"))}
				${this.summary_card(__("Inline Stitching"), s.inline_stitching_count || 0, "fa-scissors", "text-warning", __("docs"))}
				${this.summary_card(__("Final Inspection"), s.final_inspection_count || 0, "fa-check-square-o", "text-success", __("docs"))}
			</div>

			<div class="row">
				<div class="col-md-12">
					<div class="card">
						<div class="card-header gradient-header">
							<h5 class="mb-0"><i class="fa fa-table"></i> ${__("Inspection Summary")}</h5>
						</div>
						<div class="card-body table-responsive">${this.render_inspection_table(ins)}</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-7">
					<div class="card">
						<div class="card-header gradient-header-danger">
							<h5 class="mb-0"><i class="fa fa-user"></i> ${__("Operator / Checker Performance")} <small>(${__("worst first")})</small></h5>
						</div>
						<div class="card-body table-responsive" style="max-height:480px;overflow:auto;">
							${this.render_operator_table(opData)}
						</div>
					</div>
				</div>
				<div class="col-md-5">
					<div class="card">
						<div class="card-header gradient-header-success">
							<h5 class="mb-0"><i class="fa fa-bar-chart"></i> ${__("Top 10 Worst Operators")}</h5>
						</div>
						<div class="card-body p-0">
							<div class="chart-container"><canvas id="qd_worst_ops"></canvas></div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<div class="card">
						<div class="card-header gradient-header-success">
							<h5 class="mb-0"><i class="fa fa-pie-chart"></i> ${__("Inspection by Source")}</h5>
						</div>
						<div class="card-body p-0">
							<div class="chart-container"><canvas id="qd_source_pie"></canvas></div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card">
						<div class="card-header gradient-header">
							<h5 class="mb-0"><i class="fa fa-line-chart"></i> ${__("Quality Activity Trend")}</h5>
						</div>
						<div class="card-body p-0">
							<div class="chart-container"><canvas id="qd_trend"></canvas></div>
						</div>
					</div>
				</div>
			</div>
		`);

		setTimeout(() => {
			this.render_charts(bySource, topOps, data.trend);
		}, 100);
	}

	destroy_chart(key) {
		if (this.charts[key]?.destroy) {
			this.charts[key].destroy();
		}
		delete this.charts[key];
	}

	render_charts(bySource, topOps, trend) {
		const helper = typeof quality_addon !== "undefined" ? quality_addon.chartjs : null;

		// Source pie
		this.destroy_chart("source");
		const srcLabels = bySource.map((r) => r.source);
		const srcValues = bySource.map((r) => r.inspected_qty || 0);
		if (srcLabels.length && srcValues.some((v) => v > 0)) {
			const cfg = {
				type: "pie",
				data: {
					labels: srcLabels,
					datasets: [
						{
							data: srcValues,
							backgroundColor: ["#4facfe", "#fa709a", "#43e97b"],
						},
					],
				},
				options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } },
			};
			if (helper) {
				this.charts.source = helper.create("qd_source", "qd_source_pie", cfg);
			} else if (typeof Chart !== "undefined") {
				const el = document.getElementById("qd_source_pie");
				if (el) this.charts.source = new Chart(el.getContext("2d"), cfg);
			}
		}

		// Worst operators horizontal bar
		this.destroy_chart("worst");
		if (topOps.length) {
			const labels = topOps.map((o) => o.operator).reverse();
			const values = topOps.map((o) => o.defect_qty).reverse();
			const cfg = {
				type: "bar",
				data: {
					labels,
					datasets: [{ label: __("Defects"), data: values, backgroundColor: "#dc3545" }],
				},
				options: {
					indexAxis: "y",
					responsive: true,
					maintainAspectRatio: false,
					plugins: { legend: { display: false } },
				},
			};
			if (helper) {
				this.charts.worst = helper.create("qd_worst", "qd_worst_ops", cfg);
			} else if (typeof Chart !== "undefined") {
				const el = document.getElementById("qd_worst_ops");
				if (el) this.charts.worst = new Chart(el.getContext("2d"), cfg);
			}
		}

		// Trend line
		this.destroy_chart("trend");
		const t = trend || {};
		if (t.labels?.length) {
			const datasets = (t.datasets || []).map((ds, i) => ({
				label: ds.name,
				data: ds.values,
				borderColor: ["#4facfe", "#fa709a", "#43e97b"][i % 3],
				backgroundColor: "transparent",
				tension: 0.3,
			}));
			const cfg = {
				type: "line",
				data: { labels: t.labels, datasets },
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: { legend: { position: "bottom" } },
				},
			};
			if (helper) {
				this.charts.trend = helper.create("qd_trend", "qd_trend", cfg);
			} else if (typeof Chart !== "undefined") {
				const el = document.getElementById("qd_trend");
				if (el) this.charts.trend = new Chart(el.getContext("2d"), cfg);
			}
		}
	}
}
