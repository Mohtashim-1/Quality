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
			<ul class="nav nav-tabs qd-tabs" role="tablist">
				<li class="active"><a data-tab="daily" href="#"><i class="fa fa-clipboard"></i> ${__("Daily Checking")}</a></li>
				<li><a data-tab="inline" href="#"><i class="fa fa-scissors"></i> ${__("Inline Stitching")}</a></li>
			</ul>
			<div class="qd-tab-panels">
				<div class="qd-panel" data-panel="daily"></div>
				<div class="qd-panel hidden" data-panel="inline"></div>
			</div>
		</div>
	`).appendTo(page.main);

	new QualityDashboardPage($root).init();
};

class QualityDashboardPage {
	constructor($root) {
		this.$root = $root;
		this.$filters = $root.find(".qd-filters");
		this.$panelDaily = $root.find('[data-panel="daily"]');
		this.$panelInline = $root.find('[data-panel="inline"]');
		this.filter_controls = {};
		this.charts = {};
		this.activeTab = "daily";
		this.data = { daily: null, inline: null };
	}

	init() {
		this.make_filters();
		this.$root.find(".qd-tabs a").on("click", (e) => {
			e.preventDefault();
			const tab = $(e.currentTarget).data("tab");
			this.switch_tab(tab);
		});
		this.load_chartjs().then(() => this.refresh()).catch(() => this.refresh());
	}

	switch_tab(tab) {
		this.activeTab = tab;
		this.$root.find(".qd-tabs li").removeClass("active");
		this.$root.find(`.qd-tabs a[data-tab="${tab}"]`).parent().addClass("active");
		this.$panelDaily.toggleClass("hidden", tab !== "daily");
		this.$panelInline.toggleClass("hidden", tab !== "inline");
		this.destroy_all_charts();
		if (tab === "daily" && this.data.daily) {
			this.render_daily(this.data.daily);
		} else if (tab === "inline" && this.data.inline) {
			this.render_inline(this.data.inline);
		}
	}

	make_filters() {
		const from = frappe.datetime.add_days(frappe.datetime.get_today(), -30);
		const to = frappe.datetime.get_today();

		this.filter_controls.from_date = frappe.ui.form.make_control({
			parent: $('<div class="col-md-3"></div>').appendTo(this.$filters)[0],
			df: { fieldtype: "Date", label: __("From Date"), default: from },
			render_input: true,
		});
		this.filter_controls.to_date = frappe.ui.form.make_control({
			parent: $('<div class="col-md-3"></div>').appendTo(this.$filters)[0],
			df: { fieldtype: "Date", label: __("To Date"), default: to },
			render_input: true,
		});
		this.filter_controls.order_sheet = frappe.ui.form.make_control({
			parent: $('<div class="col-md-4"></div>').appendTo(this.$filters)[0],
			df: { fieldtype: "Link", label: __("Order Sheet"), options: "Order Sheet" },
			render_input: true,
		});
		const $actions = $('<div class="col-md-2 d-flex align-items-end pb-2"></div>').appendTo(this.$filters);
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
		]).then(() => quality_addon?.chartjs?.load?.() || Chart);
	}

	refresh() {
		const loading = `<div class="qd-loading"><i class="fa fa-spinner fa-spin"></i> ${__("Loading...")}</div>`;
		this.$panelDaily.html(loading);
		this.$panelInline.html(loading);
		this.destroy_all_charts();
		this.data = { daily: null, inline: null };

		const filters = this.get_filters();
		Promise.all([
			frappe.call({
				method:
					"quality_addon.quality_addon.page.quality_dashboard.quality_dashboard.get_daily_checking_dashboard",
				args: { filters },
			}),
			frappe.call({
				method:
					"quality_addon.quality_addon.page.quality_dashboard.quality_dashboard.get_inline_stitching_dashboard",
				args: { filters },
			}),
		])
			.then(([dailyR, inlineR]) => {
				this.data.daily = dailyR.message || {};
				this.data.inline = inlineR.message || {};
				this.render_daily(this.data.daily);
				this.render_inline(this.data.inline);
				if (this.activeTab === "inline") {
					this.switch_tab("inline");
				}
			})
			.catch(() => {
				const err = `<div class="alert alert-danger">${__("Failed to load dashboard data.")}</div>`;
				this.$panelDaily.html(err);
				this.$panelInline.html(err);
			});
	}

	fmt(n) {
		return frappe.format(n || 0, { fieldtype: "Float", precision: 0 });
	}

	pct(n) {
		return (Number(n) || 0).toFixed(1);
	}

	summary_card(title, value, icon, cls, sub) {
		return `
			<div class="col-md-2 col-sm-4 col-xs-6">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">${title}</h6>
								<h3 class="mb-0 ${cls || ""}">${value}</h3>
								${sub ? `<small class="text-muted">${sub}</small>` : ""}
							</div>
							<div class="align-self-center"><i class="fa ${icon} fa-2x ${cls || "text-primary"}"></i></div>
						</div>
					</div>
				</div>
			</div>`;
	}

	destroy_all_charts() {
		Object.keys(this.charts).forEach((k) => {
			try {
				this.charts[k]?.destroy?.();
			} catch (e) {
				/* ignore */
			}
		});
		this.charts = {};
	}

	make_chart(key, canvasId, config) {
		this.charts[key]?.destroy?.();
		const helper = quality_addon?.chartjs;
		if (helper) {
			this.charts[key] = helper.create(key, canvasId, config);
			return;
		}
		const el = document.getElementById(canvasId);
		if (el && typeof Chart !== "undefined") {
			this.charts[key] = new Chart(el.getContext("2d"), config);
		}
	}

	render_person_table(perf, showSeverity) {
		const persons = perf.persons || [];
		const label = perf.person_label || __("Person");
		if (!persons.length) {
			return `<p class="text-muted text-center p-3">${__("No data for selected filters.")}</p>`;
		}
		const worst = perf.worst_person;
		return `
			${worst ? `<div class="alert alert-danger py-2 mb-2"><strong>${__("Worst")} ${label}:</strong> ${frappe.utils.escape_html(worst)}</div>` : ""}
			<table class="table table-bordered table-sm table-hover mb-0">
				<thead><tr>
					<th>#</th><th>${label}</th>
					<th class="text-right">${__("Pcs")}</th>
					${showSeverity ? `<th class="text-right">${__("Major")}</th><th class="text-right">${__("Minor")}</th><th class="text-right">${__("Critical")}</th>` : ""}
					<th class="text-right">${__("Defects")}</th><th class="text-right">${__("Defect %")}</th><th>${__("Status")}</th>
				</tr></thead>
				<tbody>${persons
					.map((p) => {
						const sk = p.status_key || "ok";
						const rowCls = sk === "worst" ? "qd-op-worst" : sk === "high" ? "qd-op-high" : "";
						let badge = "qd-badge-ok";
						if (sk === "worst") badge = "qd-badge-worst";
						else if (sk === "high") badge = "qd-badge-high";
						else if (sk === "watch") badge = "badge badge-warning";
						return `<tr class="${rowCls}">
							<td>${p.rank}</td>
							<td><strong>${frappe.utils.escape_html(p.person)}</strong></td>
							<td class="text-right">${this.fmt(p.pcs_checked)}</td>
							${showSeverity ? `<td class="text-right">${this.fmt(p.major)}</td><td class="text-right">${this.fmt(p.minor)}</td><td class="text-right">${this.fmt(p.critical)}</td>` : ""}
							<td class="text-right"><strong>${this.fmt(p.defect_qty)}</strong></td>
							<td class="text-right"><strong>${this.pct(p.defect_rate)}%</strong></td>
							<td><span class="badge ${badge}">${frappe.utils.escape_html(p.status)}</span></td>
						</tr>`;
					})
					.join("")}</tbody>
			</table>`;
	}

	render_details_table(details, showSeverity) {
		if (!details.length) {
			return `<p class="text-muted text-center p-3">${__("No detail rows.")}</p>`;
		}
		return `
			<table class="table table-bordered table-sm mb-0" style="font-size:12px;">
				<thead><tr>
					<th>${__("Order Sheet")}</th><th>${__("Article")}</th><th>${__("Size")}</th>
					<th>${__("Color")}</th><th>${__("Design")}</th><th class="text-right">${__("Plan Qty")}</th>
					<th class="text-right">${__("Pcs Checked")}</th>
					${showSeverity ? `<th class="text-right">${__("Major")}</th><th class="text-right">${__("Minor")}</th><th class="text-right">${__("Critical")}</th>` : ""}
					<th class="text-right">${__("Defects")}</th><th class="text-right">${__("Defect %")}</th>
					<th class="text-right">${__("Progress %")}</th>
				</tr></thead>
				<tbody>${details
					.slice(0, 100)
					.map(
						(r) => `<tr>
						<td>${frappe.utils.escape_html(r.order_sheet || "")}</td>
						<td>${frappe.utils.escape_html(r.article)}</td>
						<td>${frappe.utils.escape_html(r.size)}</td>
						<td>${frappe.utils.escape_html(r.color)}</td>
						<td>${frappe.utils.escape_html(r.design)}</td>
						<td class="text-right">${this.fmt(r.plan_qty)}</td>
						<td class="text-right">${this.fmt(r.pcs_checked)}</td>
						${showSeverity ? `<td class="text-right text-danger">${this.fmt(r.major)}</td><td class="text-right text-warning">${this.fmt(r.minor)}</td><td class="text-right">${this.fmt(r.critical)}</td>` : ""}
						<td class="text-right">${this.fmt(r.defect_qty)}</td>
						<td class="text-right">${this.pct(r.defect_rate)}%</td>
						<td class="text-right">${this.pct(r.progress_pct)}%</td>
					</tr>`
					)
					.join("")}</tbody>
			</table>`;
	}

	render_daily(data) {
		const s = data.summary || {};
		const perf = data.checker_performance || {};
		const prefix = "dc_";

		this.$panelDaily.html(`
			<div class="row">${this.summary_card(__("Pcs Checked"), this.fmt(s.pcs_checked), "fa-check-square", "text-primary")}
				${this.summary_card(__("Major"), this.fmt(s.major), "fa-times-circle", "text-danger")}
				${this.summary_card(__("Minor"), this.fmt(s.minor), "fa-exclamation-circle", "text-warning")}
				${this.summary_card(__("Critical"), this.fmt(s.critical), "fa-ban", "text-danger")}
				${this.summary_card(__("Total Defects"), this.fmt(s.total_defects), "fa-bug", "text-warning")}
				${this.summary_card(__("Defect Rate"), `${this.pct(s.defect_rate)}%`, "fa-percent", "text-danger", `${s.document_count || 0} ${__("docs")}`)}
			</div>
			<div class="row">
				<div class="col-md-6"><div class="card"><div class="card-header gradient-header-success"><h5 class="mb-0">${__("Major vs Minor")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}severity_pie"></canvas></div></div></div></div>
				<div class="col-md-6"><div class="card"><div class="card-header gradient-header-danger"><h5 class="mb-0">${__("Worst Checkers")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}worst_bar"></canvas></div></div></div></div>
			</div>
			<div class="row">
				<div class="col-md-6"><div class="card"><div class="card-header gradient-header"><h5 class="mb-0">${__("Defects by Article")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}article_bar"></canvas></div></div></div></div>
				<div class="col-md-6"><div class="card"><div class="card-header gradient-header"><h5 class="mb-0">${__("Pcs Checked by Size")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}size_bar"></canvas></div></div></div></div>
			</div>
			<div class="row">
				<div class="col-md-6"><div class="card"><div class="card-header gradient-header-info"><h5 class="mb-0">${__("By Color")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}color_bar"></canvas></div></div></div></div>
				<div class="col-md-6"><div class="card"><div class="card-header gradient-header-info"><h5 class="mb-0">${__("Activity Trend")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}trend"></canvas></div></div></div></div>
			</div>
			<div class="row">
				<div class="col-md-5"><div class="card"><div class="card-header gradient-header-danger"><h5 class="mb-0"><i class="fa fa-user"></i> ${__("Checker Performance")}</h5></div>
					<div class="card-body table-responsive" style="max-height:360px;overflow:auto;">${this.render_person_table(perf, true)}</div></div></div>
				<div class="col-md-7"><div class="card"><div class="card-header gradient-header"><h5 class="mb-0"><i class="fa fa-table"></i> ${__("By Article / Size / Color / Design")}</h5></div>
					<div class="card-body table-responsive" style="max-height:360px;overflow:auto;">${this.render_details_table(data.details || [], true)}</div></div></div>
			</div>
		`);

		if (this.activeTab !== "daily") return;

		setTimeout(() => {
			this.make_chart(`${prefix}severity`, `${prefix}severity_pie`, {
				type: "pie",
				data: {
					labels: [__("Major"), __("Minor"), __("Critical")],
					datasets: [
						{
							data: [s.major || 0, s.minor || 0, s.critical || 0],
							backgroundColor: ["#dc3545", "#ffc107", "#6c757d"],
						},
					],
				},
				options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } },
			});

			const topCheckers = (perf.persons || []).slice(0, 8).reverse();
			if (topCheckers.length) {
				this.make_chart(`${prefix}worst`, `${prefix}worst_bar`, {
					type: "bar",
					data: {
						labels: topCheckers.map((p) => p.person),
						datasets: [{ label: __("Defects"), data: topCheckers.map((p) => p.defect_qty), backgroundColor: "#dc3545" }],
					},
					options: { indexAxis: "y", responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
				});
			}

			this._dim_bar(`${prefix}article`, `${prefix}article_bar`, data.by_article, __("Defects"));
			this._dim_bar(`${prefix}size`, `${prefix}size_bar`, data.by_size, __("Pcs Checked"), "pcs_checked");
			this._dim_bar(`${prefix}color`, `${prefix}color_bar`, data.by_color, __("Defects"));
			this._trend_chart(`${prefix}trend`, data.trend, "#4facfe");
		}, 80);
	}

	render_inline(data) {
		const s = data.summary || {};
		const perf = data.operator_performance || {};
		const prefix = "is_";

		this.$panelInline.html(`
			<div class="row">${this.summary_card(__("Pcs Checked"), this.fmt(s.pcs_checked), "fa-check-square", "text-primary")}
				${this.summary_card(__("Total Defect Pcs"), this.fmt(s.total_defects), "fa-bug", "text-warning")}
				${this.summary_card(__("Defect Rate"), `${this.pct(s.defect_rate)}%`, "fa-percent", "text-danger")}
				${this.summary_card(__("Lines"), s.line_count || 0, "fa-list", "text-info")}
				${this.summary_card(__("Documents"), s.document_count || 0, "fa-file", "text-success")}
			</div>
			<div class="row">
				<div class="col-md-6"><div class="card"><div class="card-header gradient-header-danger"><h5 class="mb-0">${__("Worst Operators")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}worst_bar"></canvas></div></div></div></div>
				<div class="col-md-6"><div class="card"><div class="card-header gradient-header-success"><h5 class="mb-0">${__("Defects by Article")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}article_bar"></canvas></div></div></div></div>
			</div>
			<div class="row">
				<div class="col-md-4"><div class="card"><div class="card-header gradient-header"><h5 class="mb-0">${__("By Size")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}size_bar"></canvas></div></div></div></div>
				<div class="col-md-4"><div class="card"><div class="card-header gradient-header"><h5 class="mb-0">${__("By Color")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}color_bar"></canvas></div></div></div></div>
				<div class="col-md-4"><div class="card"><div class="card-header gradient-header-info"><h5 class="mb-0">${__("By Design")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}design_bar"></canvas></div></div></div></div>
			</div>
			<div class="row">
				<div class="col-md-12"><div class="card"><div class="card-header gradient-header-info"><h5 class="mb-0">${__("Activity Trend")}</h5></div>
					<div class="card-body p-0"><div class="chart-container chart-sm"><canvas id="${prefix}trend"></canvas></div></div></div></div>
			</div>
			<div class="row">
				<div class="col-md-5"><div class="card"><div class="card-header gradient-header-danger"><h5 class="mb-0"><i class="fa fa-user"></i> ${__("Operator Performance")}</h5></div>
					<div class="card-body table-responsive" style="max-height:360px;overflow:auto;">${this.render_person_table(perf, false)}</div></div></div>
				<div class="col-md-7"><div class="card"><div class="card-header gradient-header"><h5 class="mb-0"><i class="fa fa-table"></i> ${__("By Article / Size / Color / Design")}</h5></div>
					<div class="card-body table-responsive" style="max-height:360px;overflow:auto;">${this.render_details_table(data.details || [], false)}</div></div></div>
			</div>
		`);

		if (this.activeTab !== "inline") return;

		setTimeout(() => {
			const topOps = (perf.persons || []).slice(0, 8).reverse();
			if (topOps.length) {
				this.make_chart(`${prefix}worst`, `${prefix}worst_bar`, {
					type: "bar",
					data: {
						labels: topOps.map((p) => p.person),
						datasets: [{ label: __("Defect Pcs"), data: topOps.map((p) => p.defect_qty), backgroundColor: "#dc3545" }],
					},
					options: { indexAxis: "y", responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
				});
			}
			this._dim_bar(`${prefix}article`, `${prefix}article_bar`, data.by_article, __("Defect Pcs"));
			this._dim_bar(`${prefix}size`, `${prefix}size_bar`, data.by_size, __("Pcs Checked"), "pcs_checked");
			this._dim_bar(`${prefix}color`, `${prefix}color_bar`, data.by_color, __("Defect Pcs"));
			this._dim_bar(`${prefix}design`, `${prefix}design_bar`, data.by_design, __("Defect Pcs"));
			this._trend_chart(`${prefix}trend`, data.trend, "#fa709a");
		}, 80);
	}

	_dim_bar(key, canvasId, dimData, datasetLabel, valueKey = "defect_qty") {
		if (!dimData?.labels?.length) return;
		const values = dimData[valueKey] || dimData.defect_qty || [];
		this.make_chart(key, canvasId, {
			type: "bar",
			data: {
				labels: dimData.labels,
				datasets: [{ label: datasetLabel, data: values, backgroundColor: "#667eea" }],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				scales: { x: { ticks: { maxRotation: 45, minRotation: 0 } } },
			},
		});
	}

	_trend_chart(key, trend, color) {
		const t = trend || {};
		if (!t.labels?.length) return;
		this.make_chart(key, key, {
			type: "line",
			data: {
				labels: t.labels,
				datasets: (t.datasets || []).map((ds) => ({
					label: ds.name,
					data: ds.values,
					borderColor: color,
					backgroundColor: "transparent",
					tension: 0.3,
				})),
			},
			options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } },
		});
	}
}
