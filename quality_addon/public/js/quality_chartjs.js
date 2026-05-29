/* Chart.js helpers for Quality Addon pages */
frappe.provide('quality_addon.chartjs');

quality_addon.chartjs = {
	_loading: null,
	instances: {},

	load() {
		if (typeof Chart !== 'undefined') {
			return Promise.resolve(Chart);
		}
		if (this._loading) {
			return this._loading;
		}
		this._loading = new Promise((resolve, reject) => {
			frappe.require('/assets/quality_addon/js/chart.min.js', () => {
				if (typeof Chart !== 'undefined') {
					resolve(Chart);
				} else {
					reject(new Error('Chart.js failed to load'));
				}
			});
		});
		return this._loading;
	},

	getCanvas(id) {
		const canvas = document.getElementById(id);
		if (!canvas) {
			return null;
		}
		const parent = canvas.parentElement;
		if (parent && (!parent.style.height || parent.style.height === '0px')) {
			parent.style.height = '280px';
			parent.style.position = 'relative';
		}
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		return canvas;
	},

	destroy(key) {
		const chart = this.instances[key] || window[key];
		if (chart && typeof chart.destroy === 'function') {
			try {
				chart.destroy();
			} catch (e) {
				/* ignore */
			}
		}
		delete this.instances[key];
		if (window[key]) {
			window[key] = null;
		}
	},

	create(key, canvasId, config) {
		const canvas = typeof canvasId === 'string' ? this.getCanvas(canvasId) : canvasId;
		if (!canvas || typeof Chart === 'undefined') {
			return null;
		}
		this.destroy(key);
		const merged = this._mergeDefaults(config);
		const chart = new Chart(canvas.getContext('2d'), merged);
		this.instances[key] = chart;
		window[key] = chart;
		return chart;
	},

	_mergeDefaults(config) {
		const type = config.type || 'bar';
		const base = {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: true,
						position: 'bottom',
						labels: { boxWidth: 12, padding: 14, usePointStyle: true },
					},
					tooltip: { enabled: true },
				},
			},
		};
		if (type === 'pie' || type === 'doughnut') {
			base.options.cutout = type === 'doughnut' ? '52%' : 0;
			base.options.plugins.legend.position = 'bottom';
			base.options.plugins.tooltip = {
				enabled: true,
				callbacks: {
					label(ctx) {
						const label = ctx.label || '';
						const val = ctx.parsed || 0;
						const total = (ctx.dataset.data || []).reduce((a, b) => a + b, 0);
						const pct = total ? ((val / total) * 100).toFixed(1) : 0;
						return `${label}: ${val} (${pct}%)`;
					},
				},
			};
		}
		if (type === 'line' || type === 'bar') {
			const horizontal = config.options && config.options.indexAxis === 'y';
			if (horizontal) {
				base.options.scales = {
					x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' } },
					y: { grid: { display: false }, ticks: { autoSkip: false } },
				};
			} else {
				base.options.scales = {
					y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' } },
					x: { grid: { display: false }, ticks: { maxRotation: 45, minRotation: 0, autoSkip: true, maxTicksLimit: 12 } },
				};
			}
		}
		return Object.assign({}, config, {
			options: Object.assign({}, base.options, config.options || {}),
		});
	},
};
