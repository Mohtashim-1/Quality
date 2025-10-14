frappe.pages['inline-stitching-das'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Inline Stitching Dashboard',
		single_column: true
	});

	// Add CSS
	frappe.require('/assets/quality_addon/css/inline_stitching_das.css');
	
	// Load Chart.js
	loadChartJS();

	// Create dashboard container
	let dashboard_container = $(`<div class="inline-stitching-dashboard">
		<div class="dashboard-filters"></div>
		<div class="dashboard-summary"></div>
		<div class="dashboard-charts"></div>
		<div class="dashboard-breakdown"></div>
		<div class="dashboard-detailed-analysis"></div>
		<div class="dashboard-table"></div>
	</div>`).appendTo(page.main);

	// Initialize dashboard
	init_dashboard(dashboard_container);
}

function init_dashboard(container) {
	// Create filters
	create_filters(container.find('.dashboard-filters'));
	
	// Create summary cards
	create_summary_cards(container.find('.dashboard-summary'));
	
	// Create charts
	create_charts(container.find('.dashboard-charts'));
	
	// Create breakdown section
	create_breakdown_section(container.find('.dashboard-breakdown'));
	
	// Create detailed analysis section
	create_detailed_analysis_section(container.find('.dashboard-detailed-analysis'));
	
	// Create data table
	create_data_table(container.find('.dashboard-table'));
	
	// Load initial data
	load_dashboard_data();
}

function loadChartJS() {
	// Try multiple methods to load Chart.js
	if (typeof Chart !== 'undefined') {
		console.log('Chart.js already loaded');
		return;
	}
	
	// Method 1: Try frappe.require
	frappe.require([
		'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js'
	]).then(() => {
		console.log('Chart.js loaded via frappe.require');
		checkChartJS();
	}).catch(() => {
		console.log('frappe.require failed, trying direct script loading');
		loadChartJSDirect();
	});
}

function loadChartJSDirect() {
	// Method 2: Direct script loading
	const script = document.createElement('script');
	script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
	script.onload = () => {
		console.log('Chart.js loaded via direct script');
		checkChartJS();
	};
	script.onerror = () => {
		console.log('Direct script loading failed, using table format');
	};
	document.head.appendChild(script);
}

function checkChartJS() {
	setTimeout(() => {
		if (typeof Chart !== 'undefined' && Chart) {
			console.log('Chart.js is now available!');
			// Force refresh of charts
			load_dashboard_data();
		} else {
			console.log('Chart.js still not available after loading');
		}
	}, 500);
}

function create_filters(container) {
	let filters_html = `
		<div class="row">
			<div class="col-md-3">
				<div class="form-group">
					<label>From Date</label>
					<input type="date" class="form-control" id="from_date">
				</div>
			</div>
			<div class="col-md-3">
				<div class="form-group">
					<label>To Date</label>
					<input type="date" class="form-control" id="to_date">
				</div>
			</div>
			<div class="col-md-3">
				<div class="form-group">
					<label>Process Type</label>
					<select class="form-control" id="process_type">
						<option value="">All</option>
						<option value="09 to 12">09 to 12</option>
						<option value="12 to 03">12 to 03</option>
						<option value="03 to 06">03 to 06</option>
					</select>
				</div>
			</div>
			<div class="col-md-3">
				<div class="form-group">
					<label>Sales Order</label>
					<input type="text" class="form-control" id="sales_order" placeholder="Search PO...">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3">
				<div class="form-group">
					<label>Machine</label>
					<input type="text" class="form-control" id="machine" placeholder="Search Machine...">
				</div>
			</div>
			<div class="col-md-3">
				<div class="form-group">
					<label>Operator</label>
					<input type="text" class="form-control" id="operator" placeholder="Search Operator...">
				</div>
			</div>
			<div class="col-md-3">
				<div class="form-group">
					<label>Article</label>
					<input type="text" class="form-control" id="article" placeholder="Search Article...">
				</div>
			</div>
			<div class="col-md-3">
				<div class="form-group">
					<label>&nbsp;</label>
					<div>
						<button class="btn btn-primary" onclick="apply_filters()">Apply Filters</button>
						<button class="btn btn-secondary" onclick="clear_filters()">Clear</button>
						<button class="btn btn-info" onclick="refresh_data()">Refresh</button>
						<button class="btn btn-success" onclick="force_chart_recreation()">Load Charts</button>
						<button class="btn btn-warning" onclick="refresh_chart_data()">Refresh Forms</button>
					</div>
				</div>
			</div>
		</div>
	`;
	
	container.html(filters_html);
	
	// Set default date range (last 30 days)
	let today = new Date();
	let thirty_days_ago = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
	$('#from_date').val(thirty_days_ago.toISOString().split('T')[0]);
	$('#to_date').val(today.toISOString().split('T')[0]);
}

function create_summary_cards(container) {
	let summary_html = `
		<div class="row">
			<div class="col-md-2">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">Total Records</h6>
								<h3 class="mb-0" id="total_records">0</h3>
								<small class="text-muted" id="records_trend">+0%</small>
							</div>
							<div class="align-self-center">
								<i class="fa fa-file-text-o fa-2x text-primary"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-2">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">Total Pieces</h6>
								<h3 class="mb-0" id="total_pieces">0</h3>
								<small class="text-muted" id="pieces_trend">+0%</small>
							</div>
							<div class="align-self-center">
								<i class="fa fa-cubes fa-2x text-success"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-2">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">Total Defects</h6>
								<h3 class="mb-0" id="total_defects">0</h3>
								<small class="text-muted" id="defects_trend">+0%</small>
							</div>
							<div class="align-self-center">
								<i class="fa fa-exclamation-triangle fa-2x text-warning"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-2">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">Defect %</h6>
								<h3 class="mb-0" id="defect_percentage">0%</h3>
								<small class="text-muted" id="defect_pct_trend">+0%</small>
							</div>
							<div class="align-self-center">
								<i class="fa fa-percent fa-2x text-danger"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-2">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">Quality Score</h6>
								<h3 class="mb-0" id="quality_score">0</h3>
								<small class="text-muted" id="quality_trend">+0%</small>
							</div>
							<div class="align-self-center">
								<i class="fa fa-star fa-2x text-info"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-2">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">Efficiency</h6>
								<h3 class="mb-0" id="efficiency_score">0</h3>
								<small class="text-muted" id="efficiency_trend">+0%</small>
							</div>
							<div class="align-self-center">
								<i class="fa fa-tachometer fa-2x text-secondary"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-md-3">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">Avg Defect %</h6>
								<h4 class="mb-0" id="avg_defect_percentage">0%</h4>
								<small class="text-muted">Range: <span id="min_defect_percentage">0%</span> - <span id="max_defect_percentage">0%</span></small>
							</div>
							<div class="align-self-center">
								<i class="fa fa-chart-line fa-2x text-primary"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">Pieces/Record</h6>
								<h4 class="mb-0" id="pieces_per_record">0</h4>
								<small class="text-muted">Defects/Record: <span id="defects_per_record">0</span></small>
							</div>
							<div class="align-self-center">
								<i class="fa fa-calculator fa-2x text-success"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">Active Machines</h6>
								<h4 class="mb-0" id="total_machines">0</h4>
								<small class="text-muted">Operators: <span id="total_operators">0</span></small>
							</div>
							<div class="align-self-center">
								<i class="fa fa-cogs fa-2x text-warning"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<div class="card summary-card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div>
								<h6 class="card-title text-muted">Articles</h6>
								<h4 class="mb-0" id="total_articles">0</h4>
								<small class="text-muted">POs: <span id="total_pos">0</span></small>
							</div>
							<div class="align-self-center">
								<i class="fa fa-tags fa-2x text-info"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	
	container.html(summary_html);
}

function create_charts(container) {
	let charts_html = `
		<div class="row">
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5>Defect Types Distribution</h5>
					</div>
					<div class="card-body">
						<div class="chart-container">
							<canvas id="defect_chart"></canvas>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5>Defect Trends Over Time</h5>
					</div>
					<div class="card-body">
						<div class="chart-container">
							<canvas id="trend_chart"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5>Pieces vs Defects Trend</h5>
					</div>
					<div class="card-body">
						<div class="chart-container">
							<canvas id="pieces_defects_chart"></canvas>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5>Process Type Performance</h5>
					</div>
					<div class="card-body">
						<div class="chart-container">
							<canvas id="process_chart"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5>Operator Performance</h5>
					</div>
					<div class="card-body">
						<div class="chart-container">
							<canvas id="operator_chart"></canvas>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5>Machine Performance</h5>
					</div>
					<div class="card-body">
						<div class="chart-container">
							<canvas id="machine_chart"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5>Hourly Performance</h5>
					</div>
					<div class="card-body">
						<div class="chart-container">
							<canvas id="hourly_chart"></canvas>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5>Article Performance</h5>
					</div>
					<div class="card-body">
						<div class="chart-container">
							<canvas id="article_chart"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	
	container.html(charts_html);
}

function create_breakdown_section(container) {
	let breakdown_html = `
		<div class="row">
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-list"></i> Defect Breakdown</h5>
					</div>
					<div class="card-body">
						<div id="defect_breakdown_table">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading defect breakdown...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-users"></i> Top Performers</h5>
					</div>
					<div class="card-body">
						<div id="top_performers_table">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading performance data...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-cogs"></i> Machine Performance</h5>
					</div>
					<div class="card-body">
						<div id="machine_performance_table">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading machine data...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-tags"></i> Article Analysis</h5>
					</div>
					<div class="card-body">
						<div id="article_analysis_table">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading article data...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	
	container.html(breakdown_html);
}

function create_detailed_analysis_section(container) {
	let analysis_html = `
		<div class="row">
			<div class="col-12">
				<h3 class="text-center mb-4"><i class="fa fa-bar-chart"></i> Detailed Analysis & Matrices</h3>
			</div>
		</div>
		
		<!-- Article-wise Analysis -->
		<div class="row">
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-tags"></i> Article-wise Defect Analysis</h5>
					</div>
					<div class="card-body">
						<div id="article_defect_analysis">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading article analysis...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-ruler"></i> Size-wise Defect Analysis</h5>
					</div>
					<div class="card-body">
						<div id="size_defect_analysis">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading size analysis...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Design & Operation Analysis -->
		<div class="row mt-3">
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-paint-brush"></i> Design-wise Defect Analysis</h5>
					</div>
					<div class="card-body">
						<div id="design_defect_analysis">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading design analysis...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-cogs"></i> Operation-wise Defect Analysis</h5>
					</div>
					<div class="card-body">
						<div id="operation_defect_analysis">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading operation analysis...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Top Defect Types Analysis -->
		<div class="row mt-3">
			<div class="col-12">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-exclamation-triangle"></i> Top Defect Types - Machine & Operator Analysis</h5>
					</div>
					<div class="card-body">
						<div id="top_defect_analysis">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading defect analysis...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Machine Performance Matrices -->
		<div class="row mt-3">
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-cogs"></i> Machine Performance Matrix</h5>
					</div>
					<div class="card-body">
						<div id="machine_performance_matrix">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading machine matrix...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-users"></i> Operator Performance Matrix</h5>
					</div>
					<div class="card-body">
						<div id="operator_performance_matrix">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading operator matrix...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Quality Score Analysis -->
		<div class="row mt-3">
			<div class="col-md-4">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-star"></i> Quality Score by Article</h5>
					</div>
					<div class="card-body">
						<div id="quality_score_article">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading quality scores...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-clock"></i> Efficiency by Time Period</h5>
					</div>
					<div class="card-body">
						<div id="efficiency_time_analysis">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading efficiency analysis...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card">
					<div class="card-header">
						<h5><i class="fa fa-trending-up"></i> Defect Trend Analysis</h5>
					</div>
					<div class="card-body">
						<div id="defect_trend_analysis">
							<div class="text-center p-3">
								<div class="loading-spinner"></div>
								<p>Loading trend analysis...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	
	container.html(analysis_html);
}

function create_data_table(container) {
	let table_html = `
		<div class="card">
			<div class="card-header d-flex justify-content-between align-items-center">
				<h5>Inline Stitching Records</h5>
				<div>
					<button class="btn btn-sm btn-primary" onclick="export_data()">
						<i class="fa fa-download"></i> Export
					</button>
					<button class="btn btn-sm btn-success" onclick="refresh_data()">
						<i class="fa fa-refresh"></i> Refresh
					</button>
				</div>
			</div>
			<div class="card-body">
				<div class="table-responsive">
					<table class="table table-striped table-hover" id="inline_stitching_table">
						<thead class="thead-dark">
							<tr>
								<th>Date</th>
								<th>Process Type</th>
								<th>Sales Order</th>
								<th>Machine</th>
								<th>Operator</th>
								<th>Article</th>
								<th>Size</th>
								<th>Design</th>
								<th>Pieces</th>
								<th>Defects</th>
								<th>Defect %</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody id="table_body">
							<tr>
								<td colspan="12" class="text-center">Loading...</td>
							</tr>
						</tbody>
					</table>
				</div>
				<nav aria-label="Table pagination">
					<ul class="pagination justify-content-center" id="pagination">
					</ul>
				</nav>
			</div>
		</div>
	`;
	
	container.html(table_html);
}

function load_dashboard_data() {
	let filters = get_filters();
	
	console.log('Loading dashboard data with filters:', filters);
	
	// Show loading state
	show_loading_state();
	
	// Use real data instead of test data
	frappe.call({
		method: 'quality_addon.quality_addon.page.inline_stitching_das.inline_stitching_das.get_dashboard_data',
		args: {
			filters: filters
		},
		callback: function(r) {
			console.log('Dashboard data response:', r);
			if (r.message) {
				try {
					// Store data globally for chart functions
					window.current_dashboard_data = r.message;
					
					update_summary_cards(r.message.summary || {});
					update_charts(r.message.chart_data || {});
					update_breakdown_section(r.message);
					update_detailed_analysis_section(r.message);
					update_data_table(r.message.records || []);
					update_analysis_sections(r.message);
					hide_loading_state();
					console.log('Dashboard loaded successfully with real data');
				} catch (error) {
					console.error('Error updating dashboard:', error);
					hide_loading_state();
					show_error_message('Error updating dashboard: ' + error.message);
				}
			} else {
				console.log('No message in response');
				hide_loading_state();
				show_error_message('No data received from server');
			}
		},
		error: function(err) {
			console.error('API Error:', err);
			hide_loading_state();
			show_error_message('Error loading dashboard data: ' + (err.message || 'Unknown error'));
		}
	});
}

function show_loading_state() {
	$('.dashboard-summary').html('<div class="text-center p-4"><div class="loading-spinner"></div><p>Loading summary data...</p></div>');
	$('.dashboard-charts').html('<div class="text-center p-4"><div class="loading-spinner"></div><p>Loading charts...</p></div>');
	$('.dashboard-table').html('<div class="text-center p-4"><div class="loading-spinner"></div><p>Loading table data...</p></div>');
}

function hide_loading_state() {
	// Loading state will be replaced by actual content
}

function show_error_message(message) {
	$('.dashboard-summary, .dashboard-charts, .dashboard-table').html(`<div class="alert alert-danger">${message}</div>`);
}

function get_filters() {
	return {
		from_date: $('#from_date').val(),
		to_date: $('#to_date').val(),
		process_type: $('#process_type').val(),
		sales_order: $('#sales_order').val(),
		machine: $('#machine').val(),
		operator: $('#operator').val(),
		article: $('#article').val()
	};
}

function update_summary_cards(summary) {
	console.log('Updating summary cards with data:', summary);
	
	// Make sure the summary cards are created first
	if ($('#total_records').length === 0) {
		console.log('Summary cards not found, recreating...');
		create_summary_cards($('.dashboard-summary'));
	}
	
	// Basic metrics
	$('#total_records').text(summary.total_records || 0);
	$('#total_pieces').text(summary.total_pieces || 0);
	$('#total_defects').text(summary.total_defects || 0);
	$('#defect_percentage').text((summary.defect_percentage || 0).toFixed(2) + '%');
	
	// Additional metrics
	$('#quality_score').text((summary.quality_score || 0).toFixed(1));
	$('#efficiency_score').text((summary.efficiency_score || 0).toFixed(1));
	$('#avg_defect_percentage').text((summary.avg_defect_percentage || 0).toFixed(2) + '%');
	$('#min_defect_percentage').text((summary.min_defect_percentage || 0).toFixed(2) + '%');
	$('#max_defect_percentage').text((summary.max_defect_percentage || 0).toFixed(2) + '%');
	$('#pieces_per_record').text((summary.pieces_per_record || 0).toFixed(1));
	$('#defects_per_record').text((summary.defects_per_record || 0).toFixed(1));
	$('#total_machines').text(summary.total_machines || 0);
	$('#total_operators').text(summary.total_operators || 0);
	$('#total_articles').text(summary.total_articles || 0);
	$('#total_pos').text(summary.total_pos || 0);
	
	// Calculate and display trends (simplified for now)
	$('#records_trend').text('+0%').addClass('text-success');
	$('#pieces_trend').text('+0%').addClass('text-success');
	$('#defects_trend').text('+0%').addClass('text-warning');
	$('#defect_pct_trend').text('+0%').addClass('text-danger');
	$('#quality_trend').text('+0%').addClass('text-success');
	$('#efficiency_trend').text('+0%').addClass('text-success');
	
	console.log('Summary cards updated successfully');
}

function update_charts(chart_data) {
	console.log('Updating charts with data:', chart_data);
	
	// Make sure the charts container exists
	if ($('.dashboard-charts').length === 0) {
		console.log('Charts container not found, recreating...');
		create_charts($('.dashboard-charts'));
	}
	
	// Clear any existing loading state
	$('.dashboard-charts').empty();
	
	// Recreate the charts structure
	create_charts($('.dashboard-charts'));
	
	// Try to create real charts if Chart.js is available
	if (typeof Chart !== 'undefined' && Chart) {
		try {
			console.log('Creating charts with Chart.js...');
			create_simple_charts(chart_data);
		} catch (error) {
			console.error('Error creating charts:', error);
			show_chart_data_as_table(chart_data);
		}
	} else {
		console.log('Chart.js not available, using table format. Chart type:', typeof Chart);
		// Fallback to table format
		show_chart_data_as_table(chart_data);
	}
}

function create_simple_charts(chart_data) {
	// Create a simple defect chart
	if (chart_data.defect_labels && chart_data.defect_labels.length > 0) {
		let defectCtx = document.getElementById('defect_chart');
		if (defectCtx) {
			new Chart(defectCtx, {
				type: 'doughnut',
				data: {
					labels: chart_data.defect_labels,
					datasets: [{
						data: chart_data.defect_values,
						backgroundColor: [
							'#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
							'#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
						]
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							position: 'bottom'
						}
					}
				}
			});
		}
	}
	
	// Create a simple trend chart
	if (chart_data.trend_labels && chart_data.trend_labels.length > 0) {
		let trendCtx = document.getElementById('trend_chart');
		if (trendCtx) {
			new Chart(trendCtx, {
				type: 'line',
				data: {
					labels: chart_data.trend_labels,
					datasets: [{
						label: 'Defect Percentage',
						data: chart_data.trend_values,
						borderColor: '#36A2EB',
						backgroundColor: 'rgba(54, 162, 235, 0.1)',
						tension: 0.1,
						fill: true
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
							max: 100
						}
					}
				}
			});
		}
	}
	
	// Show other charts as data tables
	show_additional_charts_as_tables(chart_data);
}

function show_additional_charts_as_tables(chart_data) {
	// Pieces vs Defects chart
	let pieces_defects_table = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr><th>Date</th><th>Pieces</th><th>Defects</th><th>Defect %</th></tr>
				</thead>
				<tbody>
	`;
	
	if (chart_data.pieces_trend && chart_data.pieces_trend.length > 0) {
		for (let i = 0; i < chart_data.pieces_trend.length; i++) {
			let pieces = chart_data.pieces_trend[i] || 0;
			let defects = chart_data.defects_trend ? chart_data.defects_trend[i] || 0 : 0;
			let defect_pct = pieces > 0 ? ((defects / pieces) * 100).toFixed(2) : 0;
			pieces_defects_table += `
				<tr>
					<td>${chart_data.trend_labels[i] || 'N/A'}</td>
					<td>${pieces}</td>
					<td>${defects}</td>
					<td>${defect_pct}%</td>
				</tr>
			`;
		}
	} else {
		pieces_defects_table += '<tr><td colspan="4" class="text-center">No pieces vs defects data available</td></tr>';
	}
	
	pieces_defects_table += '</tbody></table></div>';
	$('#pieces_defects_chart').parent().html(pieces_defects_table);
	
	// Process chart - show actual data
	show_process_chart_data();
	
	// Operator chart - show actual data
	show_operator_chart_data();
	
	// Machine chart - show actual data
	show_machine_chart_data();
	
	// Hourly chart - show actual data
	show_hourly_chart_data();
	
	// Article chart - show actual data
	show_article_chart_data();
}

function create_defect_chart(chart_data) {
	let element = $('#defect_chart').get(0);
	if (!element) {
		console.warn('Defect chart element not found');
		return;
	}
	
	let ctx = element.getContext('2d');
	new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: chart_data.defect_labels || [],
			datasets: [{
				data: chart_data.defect_values || [],
				backgroundColor: [
					'#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
					'#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
				]
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: 'bottom'
				}
			}
		}
	});
}

function create_trend_chart(chart_data) {
	let element = $('#trend_chart').get(0);
	if (!element) {
		console.warn('Trend chart element not found');
		return;
	}
	
	let ctx = element.getContext('2d');
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: chart_data.trend_labels || [],
			datasets: [{
				label: 'Defect Percentage',
				data: chart_data.trend_values || [],
				borderColor: '#36A2EB',
				backgroundColor: 'rgba(54, 162, 235, 0.1)',
				tension: 0.1,
				fill: true
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true,
					max: 100
				}
			},
			plugins: {
				legend: {
					display: true
				}
			}
		}
	});
}

function create_pieces_defects_chart(chart_data) {
	let ctx = $('#pieces_defects_chart').get(0).getContext('2d');
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: chart_data.trend_labels || [],
			datasets: [{
				label: 'Pieces',
				data: chart_data.pieces_trend || [],
				borderColor: '#28a745',
				backgroundColor: 'rgba(40, 167, 69, 0.1)',
				yAxisID: 'y'
			}, {
				label: 'Defects',
				data: chart_data.defects_trend || [],
				borderColor: '#dc3545',
				backgroundColor: 'rgba(220, 53, 69, 0.1)',
				yAxisID: 'y1'
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					type: 'linear',
					display: true,
					position: 'left',
					title: {
						display: true,
						text: 'Pieces'
					}
				},
				y1: {
					type: 'linear',
					display: true,
					position: 'right',
					title: {
						display: true,
						text: 'Defects'
					},
					grid: {
						drawOnChartArea: false,
					},
				}
			}
		}
	});
}

function create_process_chart(chart_data) {
	// This will be populated with process analysis data
	let ctx = $('#process_chart').get(0).getContext('2d');
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['09-12', '12-03', '03-06'],
			datasets: [{
				label: 'Defect %',
				data: [0, 0, 0],
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}

function create_operator_chart(chart_data) {
	let ctx = $('#operator_chart').get(0).getContext('2d');
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: [],
			datasets: [{
				label: 'Defect %',
				data: [],
				backgroundColor: '#36A2EB'
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}

function create_machine_chart(chart_data) {
	let ctx = $('#machine_chart').get(0).getContext('2d');
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: [],
			datasets: [{
				label: 'Defect %',
				data: [],
				backgroundColor: '#FF6384'
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}

function create_hourly_chart(chart_data) {
	let ctx = $('#hourly_chart').get(0).getContext('2d');
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: Array.from({length: 24}, (_, i) => i + ':00'),
			datasets: [{
				label: 'Defect %',
				data: new Array(24).fill(0),
				borderColor: '#FF6384',
				backgroundColor: 'rgba(255, 99, 132, 0.1)',
				fill: true
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}

function create_article_chart(chart_data) {
	let ctx = $('#article_chart').get(0).getContext('2d');
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: [],
			datasets: [{
				label: 'Defect %',
				data: [],
				backgroundColor: '#4BC0C0'
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}

function show_chart_data_as_table(chart_data) {
	console.log('Showing chart data as table:', chart_data);
	
	// Show defect data as table
	let defect_table = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr><th>Defect Type</th><th>Count</th></tr>
				</thead>
				<tbody>
	`;
	
	if (chart_data.defect_labels && chart_data.defect_labels.length > 0) {
		for (let i = 0; i < chart_data.defect_labels.length; i++) {
			defect_table += `<tr><td>${chart_data.defect_labels[i]}</td><td>${chart_data.defect_values[i] || 0}</td></tr>`;
		}
	} else {
		defect_table += `<tr><td colspan="2">No defect data available</td></tr>`;
	}
	
	defect_table += `</tbody></table></div>`;
	
	// Replace the chart container content
	$('#defect_chart').parent().html(defect_table);
	
	// Show trend data as table
	let trend_table = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr><th>Date</th><th>Defect %</th></tr>
				</thead>
				<tbody>
	`;
	
	if (chart_data.trend_labels && chart_data.trend_labels.length > 0) {
		for (let i = 0; i < chart_data.trend_labels.length; i++) {
			trend_table += `<tr><td>${chart_data.trend_labels[i]}</td><td>${chart_data.trend_values[i] || 0}%</td></tr>`;
		}
	} else {
		trend_table += `<tr><td colspan="2">No trend data available</td></tr>`;
	}
	
	trend_table += `</tbody></table></div>`;
	
	// Replace the chart container content
	$('#trend_chart').parent().html(trend_table);
	
	// Show other charts as simple tables
	$('#pieces_defects_chart').parent().html('<div class="alert alert-info">Pieces vs Defects chart will be available soon</div>');
	$('#process_chart').parent().html('<div class="alert alert-info">Process analysis will be available soon</div>');
	$('#operator_chart').parent().html('<div class="alert alert-info">Operator analysis will be available soon</div>');
	$('#machine_chart').parent().html('<div class="alert alert-info">Machine analysis will be available soon</div>');
	$('#hourly_chart').parent().html('<div class="alert alert-info">Hourly analysis will be available soon</div>');
	$('#article_chart').parent().html('<div class="alert alert-info">Article analysis will be available soon</div>');
	
	console.log('Chart data displayed as tables successfully');
}

function update_data_table(records) {
	console.log('Updating data table with records:', records);
	
	// Make sure the table exists
	if ($('#table_body').length === 0) {
		console.log('Data table not found, recreating...');
		create_data_table($('.dashboard-table'));
	}
	
	let tbody = $('#table_body');
	tbody.empty();
	
	if (records && records.length > 0) {
		records.forEach(function(record) {
			let row = `
				<tr>
					<td>${record.reporting_date || ''}</td>
					<td>${record.process_type || ''}</td>
					<td>${record.select_po || ''}</td>
					<td>${record.machine || ''}</td>
					<td>${record.operator_name || ''}</td>
					<td>${record.article || ''}</td>
					<td>${record.size || ''}</td>
					<td>${record.design || ''}</td>
					<td>${record.total_number_pcs || 0}</td>
					<td>${record.total_defects || 0}</td>
					<td>${(record.defect_percentage || 0).toFixed(2)}%</td>
					<td>
						<button class="btn btn-sm btn-info" onclick="view_record('${record.name}')">
							<i class="fa fa-eye"></i>
						</button>
					</td>
				</tr>
			`;
			tbody.append(row);
		});
	} else {
		tbody.append('<tr><td colspan="12" class="text-center">No records found</td></tr>');
	}
	
	console.log('Data table updated successfully');
}

function apply_filters() {
	load_dashboard_data();
}

function clear_filters() {
	$('#from_date').val('');
	$('#to_date').val('');
	$('#process_type').val('');
	$('#sales_order').val('');
	$('#machine').val('');
	$('#operator').val('');
	$('#article').val('');
	load_dashboard_data();
}

function refresh_data() {
	console.log('Refreshing dashboard data...');
	load_dashboard_data();
}

function force_chart_recreation() {
	console.log('Forcing chart recreation...');
	if (typeof Chart !== 'undefined' && Chart) {
		console.log('Chart.js available, recreating charts...');
		// Get current data and recreate charts
		let filters = get_filters();
		frappe.call({
			method: 'quality_addon.quality_addon.page.inline_stitching_das.inline_stitching_das.get_dashboard_data',
			args: { filters: filters },
			callback: function(r) {
				if (r.message && r.message.chart_data) {
					update_charts(r.message.chart_data);
				}
			}
		});
	} else {
		console.log('Chart.js not available, cannot recreate charts');
	}
}

function refresh_chart_data() {
	console.log('Refreshing chart data...');
	if (window.current_dashboard_data) {
		// Refresh all chart sections with current data
		show_process_chart_data();
		show_operator_chart_data();
		show_machine_chart_data();
		show_hourly_chart_data();
		show_article_chart_data();
		console.log('Chart data refreshed successfully');
	} else {
		console.log('No dashboard data available, refreshing all data...');
		refresh_data();
	}
}

function export_data() {
	let filters = get_filters();
	window.open(`/api/method/quality_addon.quality_addon.page.inline_stitching_das.inline_stitching_das.export_data?filters=${encodeURIComponent(JSON.stringify(filters))}`);
}

function view_record(record_name) {
	frappe.set_route('Form', 'Inline Stitching', record_name);
}

function update_breakdown_section(data) {
	console.log('Updating breakdown section with data:', data);
	
	// Update defect breakdown - use chart data if available
	let defect_breakdown = data.summary?.defect_breakdown || {};
	if (data.chart_data?.defect_labels && data.chart_data?.defect_values) {
		// Create defect breakdown from chart data
		defect_breakdown = {};
		for (let i = 0; i < data.chart_data.defect_labels.length; i++) {
			defect_breakdown[data.chart_data.defect_labels[i]] = data.chart_data.defect_values[i];
		}
	}
	update_defect_breakdown(defect_breakdown);
	
	// Update top performers
	update_top_performers(data.operator_analysis || []);
	
	// Update machine performance
	update_machine_performance(data.machine_analysis || []);
	
	// Update article analysis
	update_article_analysis_table(data.article_analysis || []);
}

function update_defect_breakdown(defect_data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr>
						<th>Defect Type</th>
						<th>Count</th>
						<th>Percentage</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	if (defect_data && Object.keys(defect_data).length > 0) {
		let total_defects = Object.values(defect_data).reduce((sum, val) => sum + (val || 0), 0);
		
		Object.entries(defect_data).forEach(([defect_type, count]) => {
			if (count > 0) {
				let percentage = total_defects > 0 ? ((count / total_defects) * 100).toFixed(1) : 0;
				table_html += `
					<tr>
						<td>${defect_type.replace(/_/g, ' ').toUpperCase()}</td>
						<td>${count}</td>
						<td>${percentage}%</td>
					</tr>
				`;
			}
		});
	} else {
		table_html += '<tr><td colspan="3" class="text-center">No defect data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#defect_breakdown_table').html(table_html);
}

function update_top_performers(operator_data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr>
						<th>Operator</th>
						<th>Records</th>
						<th>Pieces</th>
						<th>Defect %</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	if (operator_data && operator_data.length > 0) {
		operator_data.slice(0, 5).forEach(op => {
			table_html += `
				<tr>
					<td>${op.operator_name || 'Unknown'}</td>
					<td>${op.records || 0}</td>
					<td>${op.pieces || 0}</td>
					<td>${(op.defect_percentage || 0).toFixed(2)}%</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No operator data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#top_performers_table').html(table_html);
}

function update_machine_performance(machine_data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr>
						<th>Machine</th>
						<th>Records</th>
						<th>Pieces</th>
						<th>Defect %</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	if (machine_data && machine_data.length > 0) {
		machine_data.slice(0, 5).forEach(machine => {
			table_html += `
				<tr>
					<td>${machine.machine || 'Unknown'}</td>
					<td>${machine.records || 0}</td>
					<td>${machine.pieces || 0}</td>
					<td>${(machine.defect_percentage || 0).toFixed(2)}%</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No machine data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#machine_performance_table').html(table_html);
}

function update_article_analysis_table(article_data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr>
						<th>Article</th>
						<th>Size</th>
						<th>Records</th>
						<th>Defect %</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	if (article_data && article_data.length > 0) {
		article_data.slice(0, 5).forEach(article => {
			table_html += `
				<tr>
					<td>${article.article || 'Unknown'}</td>
					<td>${article.size || 'N/A'}</td>
					<td>${article.records || 0}</td>
					<td>${(article.defect_percentage || 0).toFixed(2)}%</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No article data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#article_analysis_table').html(table_html);
}

function update_analysis_sections(data) {
	// Update operator analysis charts
	if (data.operator_analysis) {
		update_operator_chart(data.operator_analysis);
	}
	
	// Update machine analysis charts
	if (data.machine_analysis) {
		update_machine_chart(data.machine_analysis);
	}
	
	// Update process analysis charts
	if (data.time_analysis && data.time_analysis.process_analysis) {
		update_process_chart(data.time_analysis.process_analysis);
	}
	
	// Update hourly analysis charts
	if (data.time_analysis && data.time_analysis.hourly_analysis) {
		update_hourly_chart(data.time_analysis.hourly_analysis);
	}
	
	// Update article analysis charts
	if (data.article_analysis) {
		update_article_chart(data.article_analysis);
	}
}

function update_operator_chart(operator_data) {
	if (operator_data && operator_data.length > 0) {
		// For now, just show data in table format since Chart.js might not be available
		let table_html = `
			<div class="table-responsive">
				<table class="table table-sm">
					<thead>
						<tr><th>Operator</th><th>Defect %</th><th>Records</th></tr>
					</thead>
					<tbody>
		`;
		
		operator_data.slice(0, 10).forEach(op => {
			table_html += `
				<tr>
					<td>${op.operator_name || 'Unknown'}</td>
					<td>${(op.defect_percentage || 0).toFixed(2)}%</td>
					<td>${op.records || 0}</td>
				</tr>
			`;
		});
		
		table_html += '</tbody></table></div>';
		$('#operator_chart').parent().html(table_html);
	}
}

function update_machine_chart(machine_data) {
	if (machine_data && machine_data.length > 0) {
		// Show data in table format
		let table_html = `
			<div class="table-responsive">
				<table class="table table-sm">
					<thead>
						<tr><th>Machine</th><th>Defect %</th><th>Records</th></tr>
					</thead>
					<tbody>
		`;
		
		machine_data.slice(0, 10).forEach(machine => {
			table_html += `
				<tr>
					<td>${machine.machine || 'Unknown'}</td>
					<td>${(machine.defect_percentage || 0).toFixed(2)}%</td>
					<td>${machine.records || 0}</td>
				</tr>
			`;
		});
		
		table_html += '</tbody></table></div>';
		$('#machine_chart').parent().html(table_html);
	}
}

function update_process_chart(process_data) {
	if (process_data && process_data.length > 0) {
		// Show data in table format
		let table_html = `
			<div class="table-responsive">
				<table class="table table-sm">
					<thead>
						<tr><th>Process Type</th><th>Defect %</th><th>Records</th></tr>
					</thead>
					<tbody>
		`;
		
		process_data.forEach(process => {
			table_html += `
				<tr>
					<td>${process.process_type || 'Unknown'}</td>
					<td>${(process.defect_percentage || 0).toFixed(2)}%</td>
					<td>${process.records || 0}</td>
				</tr>
			`;
		});
		
		table_html += '</tbody></table></div>';
		$('#process_chart').parent().html(table_html);
	}
}

function update_hourly_chart(hourly_data) {
	if (hourly_data && hourly_data.length > 0) {
		// Show data in table format
		let table_html = `
			<div class="table-responsive">
				<table class="table table-sm">
					<thead>
						<tr><th>Hour</th><th>Defect %</th><th>Records</th></tr>
					</thead>
					<tbody>
		`;
		
		hourly_data.forEach(hour => {
			table_html += `
				<tr>
					<td>${hour.hour || 'Unknown'}</td>
					<td>${(hour.defect_percentage || 0).toFixed(2)}%</td>
					<td>${hour.records || 0}</td>
				</tr>
			`;
		});
		
		table_html += '</tbody></table></div>';
		$('#hourly_chart').parent().html(table_html);
	}
}

function update_article_chart(article_data) {
	if (article_data && article_data.length > 0) {
		// Show data in table format
		let table_html = `
			<div class="table-responsive">
				<table class="table table-sm">
					<thead>
						<tr><th>Article</th><th>Defect %</th><th>Records</th></tr>
					</thead>
					<tbody>
		`;
		
		article_data.slice(0, 10).forEach(article => {
			table_html += `
				<tr>
					<td>${article.article || 'Unknown'}</td>
					<td>${(article.defect_percentage || 0).toFixed(2)}%</td>
					<td>${article.records || 0}</td>
				</tr>
			`;
		});
		
		table_html += '</tbody></table></div>';
		$('#article_chart').parent().html(table_html);
	}
}

function show_process_chart_data() {
	// Get process data from breakdown section
	let process_data = [];
	if (window.current_dashboard_data && window.current_dashboard_data.time_analysis && window.current_dashboard_data.time_analysis.process_analysis) {
		process_data = window.current_dashboard_data.time_analysis.process_analysis;
	}
	
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr><th>Process Type</th><th>Records</th><th>Pieces</th><th>Defect %</th></tr>
				</thead>
				<tbody>
	`;
	
	if (process_data && process_data.length > 0) {
		process_data.forEach(process => {
			table_html += `
				<tr>
					<td>${process.process_type || 'Unknown'}</td>
					<td>${process.records || 0}</td>
					<td>${process.pieces || 0}</td>
					<td>${(process.defect_percentage || 0).toFixed(2)}%</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No process data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#process_chart').parent().html(table_html);
}

function show_operator_chart_data() {
	// Get operator data from breakdown section
	let operator_data = [];
	if (window.current_dashboard_data && window.current_dashboard_data.operator_analysis) {
		operator_data = window.current_dashboard_data.operator_analysis;
	}
	
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr><th>Operator</th><th>Records</th><th>Pieces</th><th>Defect %</th></tr>
				</thead>
				<tbody>
	`;
	
	if (operator_data && operator_data.length > 0) {
		operator_data.slice(0, 10).forEach(operator => {
			table_html += `
				<tr>
					<td>${operator.operator_name || 'Unknown'}</td>
					<td>${operator.records || 0}</td>
					<td>${operator.pieces || 0}</td>
					<td>${(operator.defect_percentage || 0).toFixed(2)}%</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No operator data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#operator_chart').parent().html(table_html);
}

function show_machine_chart_data() {
	// Get machine data from breakdown section
	let machine_data = [];
	if (window.current_dashboard_data && window.current_dashboard_data.machine_analysis) {
		machine_data = window.current_dashboard_data.machine_analysis;
	}
	
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr><th>Machine</th><th>Records</th><th>Pieces</th><th>Defect %</th></tr>
				</thead>
				<tbody>
	`;
	
	if (machine_data && machine_data.length > 0) {
		machine_data.slice(0, 10).forEach(machine => {
			table_html += `
				<tr>
					<td>${machine.machine || 'Unknown'}</td>
					<td>${machine.records || 0}</td>
					<td>${machine.pieces || 0}</td>
					<td>${(machine.defect_percentage || 0).toFixed(2)}%</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No machine data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#machine_chart').parent().html(table_html);
}

function show_hourly_chart_data() {
	// Get hourly data from breakdown section
	let hourly_data = [];
	if (window.current_dashboard_data && window.current_dashboard_data.time_analysis && window.current_dashboard_data.time_analysis.hourly_analysis) {
		hourly_data = window.current_dashboard_data.time_analysis.hourly_analysis;
	}
	
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr><th>Hour</th><th>Records</th><th>Pieces</th><th>Defect %</th></tr>
				</thead>
				<tbody>
	`;
	
	if (hourly_data && hourly_data.length > 0) {
		hourly_data.forEach(hour => {
			table_html += `
				<tr>
					<td>${hour.hour || 'Unknown'}</td>
					<td>${hour.records || 0}</td>
					<td>${hour.pieces || 0}</td>
					<td>${(hour.defect_percentage || 0).toFixed(2)}%</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No hourly data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#hourly_chart').parent().html(table_html);
}

function show_article_chart_data() {
	// Get article data from breakdown section
	let article_data = [];
	if (window.current_dashboard_data && window.current_dashboard_data.article_analysis) {
		article_data = window.current_dashboard_data.article_analysis;
	}
	
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm">
				<thead>
					<tr><th>Article</th><th>Size</th><th>Records</th><th>Defect %</th></tr>
				</thead>
				<tbody>
	`;
	
	if (article_data && article_data.length > 0) {
		article_data.slice(0, 10).forEach(article => {
			table_html += `
				<tr>
					<td>${article.article || 'Unknown'}</td>
					<td>${article.size || 'N/A'}</td>
					<td>${article.records || 0}</td>
					<td>${(article.defect_percentage || 0).toFixed(2)}%</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No article data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#article_chart').parent().html(table_html);
}

function update_detailed_analysis_section(data) {
	console.log('Updating detailed analysis section with data:', data);
	
	// Update all detailed analysis sections
	update_article_defect_analysis(data);
	update_size_defect_analysis(data);
	update_design_defect_analysis(data);
	update_operation_defect_analysis(data);
	update_top_defect_analysis(data);
	update_machine_performance_matrix(data);
	update_operator_performance_matrix(data);
	update_quality_score_analysis(data);
	update_efficiency_time_analysis(data);
	update_defect_trend_analysis(data);
}

function update_article_defect_analysis(data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm table-striped">
				<thead class="thead-dark">
					<tr>
						<th>Article</th>
						<th>Total Defects</th>
						<th>Defect %</th>
						<th>Top Defect Type</th>
						<th>Quality Score</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	// Get article analysis data
	let article_data = data.article_analysis || [];
	
	if (article_data.length > 0) {
		article_data.forEach(article => {
			let quality_score = 100 - (article.defect_percentage || 0);
			table_html += `
				<tr>
					<td><strong>${article.article || 'Unknown'}</strong></td>
					<td>${article.total_defects || 0}</td>
					<td>${(article.defect_percentage || 0).toFixed(2)}%</td>
					<td>${article.top_defect_type || 'N/A'}</td>
					<td><span class="badge ${quality_score >= 95 ? 'badge-success' : quality_score >= 85 ? 'badge-warning' : 'badge-danger'}">${quality_score.toFixed(1)}</span></td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="5" class="text-center">No article data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#article_defect_analysis').html(table_html);
}

function update_size_defect_analysis(data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm table-striped">
				<thead class="thead-dark">
					<tr>
						<th>Size</th>
						<th>Records</th>
						<th>Total Defects</th>
						<th>Defect %</th>
						<th>Performance</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	// Group by size
	let size_data = {};
	if (data.records) {
		data.records.forEach(record => {
			let size = record.size || 'Unknown';
			if (!size_data[size]) {
				size_data[size] = { records: 0, total_defects: 0, total_pieces: 0 };
			}
			size_data[size].records += 1;
			size_data[size].total_defects += record.total_defects || 0;
			size_data[size].total_pieces += record.total_number_pcs || 0;
		});
	}
	
	let size_array = Object.entries(size_data).map(([size, stats]) => ({
		size: size,
		records: stats.records,
		total_defects: stats.total_defects,
		total_pieces: stats.total_pieces,
		defect_percentage: stats.total_pieces > 0 ? (stats.total_defects / stats.total_pieces) * 100 : 0
	})).sort((a, b) => b.defect_percentage - a.defect_percentage);
	
	if (size_array.length > 0) {
		size_array.forEach(size => {
			let performance = size.defect_percentage <= 2 ? 'Excellent' : size.defect_percentage <= 5 ? 'Good' : size.defect_percentage <= 10 ? 'Average' : 'Poor';
			let badge_class = size.defect_percentage <= 2 ? 'badge-success' : size.defect_percentage <= 5 ? 'badge-info' : size.defect_percentage <= 10 ? 'badge-warning' : 'badge-danger';
			
			table_html += `
				<tr>
					<td><strong>${size.size}</strong></td>
					<td>${size.records}</td>
					<td>${size.total_defects}</td>
					<td>${size.defect_percentage.toFixed(2)}%</td>
					<td><span class="badge ${badge_class}">${performance}</span></td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="5" class="text-center">No size data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#size_defect_analysis').html(table_html);
}

function update_design_defect_analysis(data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm table-striped">
				<thead class="thead-dark">
					<tr>
						<th>Design</th>
						<th>Records</th>
						<th>Total Defects</th>
						<th>Defect %</th>
						<th>Quality Rating</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	// Group by design
	let design_data = {};
	if (data.records) {
		data.records.forEach(record => {
			let design = record.design || 'Unknown';
			if (!design_data[design]) {
				design_data[design] = { records: 0, total_defects: 0, total_pieces: 0 };
			}
			design_data[design].records += 1;
			design_data[design].total_defects += record.total_defects || 0;
			design_data[design].total_pieces += record.total_number_pcs || 0;
		});
	}
	
	let design_array = Object.entries(design_data).map(([design, stats]) => ({
		design: design,
		records: stats.records,
		total_defects: stats.total_defects,
		total_pieces: stats.total_pieces,
		defect_percentage: stats.total_pieces > 0 ? (stats.total_defects / stats.total_pieces) * 100 : 0
	})).sort((a, b) => b.defect_percentage - a.defect_percentage);
	
	if (design_array.length > 0) {
		design_array.forEach(design => {
			let rating = design.defect_percentage <= 1 ? 'A+' : design.defect_percentage <= 3 ? 'A' : design.defect_percentage <= 5 ? 'B' : design.defect_percentage <= 8 ? 'C' : 'D';
			let badge_class = design.defect_percentage <= 1 ? 'badge-success' : design.defect_percentage <= 3 ? 'badge-info' : design.defect_percentage <= 5 ? 'badge-warning' : 'badge-danger';
			
			table_html += `
				<tr>
					<td><strong>${design.design}</strong></td>
					<td>${design.records}</td>
					<td>${design.total_defects}</td>
					<td>${design.defect_percentage.toFixed(2)}%</td>
					<td><span class="badge ${badge_class}">${rating}</span></td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="5" class="text-center">No design data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#design_defect_analysis').html(table_html);
}

function update_operation_defect_analysis(data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm table-striped">
				<thead class="thead-dark">
					<tr>
						<th>Operation</th>
						<th>Records</th>
						<th>Total Defects</th>
						<th>Defect %</th>
						<th>Efficiency</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	// Group by operation
	let operation_data = {};
	if (data.records) {
		data.records.forEach(record => {
			let operation = record.operation || 'Unknown';
			if (!operation_data[operation]) {
				operation_data[operation] = { records: 0, total_defects: 0, total_pieces: 0 };
			}
			operation_data[operation].records += 1;
			operation_data[operation].total_defects += record.total_defects || 0;
			operation_data[operation].total_pieces += record.total_number_pcs || 0;
		});
	}
	
	let operation_array = Object.entries(operation_data).map(([operation, stats]) => ({
		operation: operation,
		records: stats.records,
		total_defects: stats.total_defects,
		total_pieces: stats.total_pieces,
		defect_percentage: stats.total_pieces > 0 ? (stats.total_defects / stats.total_pieces) * 100 : 0
	})).sort((a, b) => b.defect_percentage - a.defect_percentage);
	
	if (operation_array.length > 0) {
		operation_array.forEach(operation => {
			let efficiency = 100 - operation.defect_percentage;
			let badge_class = efficiency >= 98 ? 'badge-success' : efficiency >= 95 ? 'badge-info' : efficiency >= 90 ? 'badge-warning' : 'badge-danger';
			
			table_html += `
				<tr>
					<td><strong>${operation.operation}</strong></td>
					<td>${operation.records}</td>
					<td>${operation.total_defects}</td>
					<td>${operation.defect_percentage.toFixed(2)}%</td>
					<td><span class="badge ${badge_class}">${efficiency.toFixed(1)}%</span></td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="5" class="text-center">No operation data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#operation_defect_analysis').html(table_html);
}

function update_top_defect_analysis(data) {
	let table_html = `
		<div class="row">
			<div class="col-md-6">
				<h6><i class="fa fa-cogs"></i> Top 10 Machines by Defect Type</h6>
				<div class="table-responsive">
					<table class="table table-sm table-striped">
						<thead class="thead-dark">
							<tr>
								<th>Defect Type</th>
								<th>Machine</th>
								<th>Count</th>
								<th>% of Total</th>
							</tr>
						</thead>
						<tbody>
	`;
	
	// Get defect types from chart data
	let defect_types = data.chart_data?.defect_labels || [];
	let defect_values = data.chart_data?.defect_values || [];
	
	if (defect_types.length > 0) {
		defect_types.forEach((defect_type, index) => {
			let count = defect_values[index] || 0;
			let percentage = data.summary?.total_defects > 0 ? ((count / data.summary.total_defects) * 100).toFixed(1) : 0;
			
			table_html += `
				<tr>
					<td><strong>${defect_type}</strong></td>
					<td>Top Machine</td>
					<td>${count}</td>
					<td>${percentage}%</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No defect data available</td></tr>';
	}
	
	table_html += `
						</tbody>
					</table>
				</div>
			</div>
			<div class="col-md-6">
				<h6><i class="fa fa-users"></i> Top 10 Operators by Defect Type</h6>
				<div class="table-responsive">
					<table class="table table-sm table-striped">
						<thead class="thead-dark">
							<tr>
								<th>Defect Type</th>
								<th>Operator</th>
								<th>Count</th>
								<th>% of Total</th>
							</tr>
						</thead>
						<tbody>
	`;
	
	if (defect_types.length > 0) {
		defect_types.forEach((defect_type, index) => {
			let count = defect_values[index] || 0;
			let percentage = data.summary?.total_defects > 0 ? ((count / data.summary.total_defects) * 100).toFixed(1) : 0;
			
			table_html += `
				<tr>
					<td><strong>${defect_type}</strong></td>
					<td>Top Operator</td>
					<td>${count}</td>
					<td>${percentage}%</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No defect data available</td></tr>';
	}
	
	table_html += `
						</tbody>
					</table>
				</div>
			</div>
		</div>
	`;
	
	$('#top_defect_analysis').html(table_html);
}

function update_machine_performance_matrix(data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm table-bordered">
				<thead class="thead-dark">
					<tr>
						<th>Machine</th>
						<th>Records</th>
						<th>Pieces</th>
						<th>Defects</th>
						<th>Defect %</th>
						<th>Quality Score</th>
						<th>Performance</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	let machine_data = data.machine_analysis || [];
	
	if (machine_data.length > 0) {
		machine_data.slice(0, 15).forEach(machine => {
			let quality_score = 100 - (machine.defect_percentage || 0);
			let performance = quality_score >= 98 ? 'Excellent' : quality_score >= 95 ? 'Good' : quality_score >= 90 ? 'Average' : 'Poor';
			let badge_class = quality_score >= 98 ? 'badge-success' : quality_score >= 95 ? 'badge-info' : quality_score >= 90 ? 'badge-warning' : 'badge-danger';
			
			table_html += `
				<tr>
					<td><strong>${machine.machine || 'Unknown'}</strong></td>
					<td>${machine.records || 0}</td>
					<td>${machine.pieces || 0}</td>
					<td>${machine.total_defects || 0}</td>
					<td>${(machine.defect_percentage || 0).toFixed(2)}%</td>
					<td>${quality_score.toFixed(1)}</td>
					<td><span class="badge ${badge_class}">${performance}</span></td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="7" class="text-center">No machine data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#machine_performance_matrix').html(table_html);
}

function update_operator_performance_matrix(data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm table-bordered">
				<thead class="thead-dark">
					<tr>
						<th>Operator</th>
						<th>Records</th>
						<th>Pieces</th>
						<th>Defects</th>
						<th>Defect %</th>
						<th>Quality Score</th>
						<th>Performance</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	let operator_data = data.operator_analysis || [];
	
	if (operator_data.length > 0) {
		operator_data.slice(0, 15).forEach(operator => {
			let quality_score = 100 - (operator.defect_percentage || 0);
			let performance = quality_score >= 98 ? 'Excellent' : quality_score >= 95 ? 'Good' : quality_score >= 90 ? 'Average' : 'Poor';
			let badge_class = quality_score >= 98 ? 'badge-success' : quality_score >= 95 ? 'badge-info' : quality_score >= 90 ? 'badge-warning' : 'badge-danger';
			
			table_html += `
				<tr>
					<td><strong>${operator.operator_name || 'Unknown'}</strong></td>
					<td>${operator.records || 0}</td>
					<td>${operator.pieces || 0}</td>
					<td>${operator.total_defects || 0}</td>
					<td>${(operator.defect_percentage || 0).toFixed(2)}%</td>
					<td>${quality_score.toFixed(1)}</td>
					<td><span class="badge ${badge_class}">${performance}</span></td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="7" class="text-center">No operator data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#operator_performance_matrix').html(table_html);
}

function update_quality_score_analysis(data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm table-striped">
				<thead class="thead-dark">
					<tr>
						<th>Article</th>
						<th>Quality Score</th>
						<th>Grade</th>
						<th>Trend</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	let article_data = data.article_analysis || [];
	
	if (article_data.length > 0) {
		article_data.forEach(article => {
			let quality_score = 100 - (article.defect_percentage || 0);
			let grade = quality_score >= 98 ? 'A+' : quality_score >= 95 ? 'A' : quality_score >= 90 ? 'B' : quality_score >= 80 ? 'C' : 'D';
			let badge_class = quality_score >= 98 ? 'badge-success' : quality_score >= 95 ? 'badge-info' : quality_score >= 90 ? 'badge-warning' : 'badge-danger';
			let trend = quality_score >= 95 ? '↗️' : quality_score >= 85 ? '→' : '↘️';
			
			table_html += `
				<tr>
					<td><strong>${article.article || 'Unknown'}</strong></td>
					<td>${quality_score.toFixed(1)}</td>
					<td><span class="badge ${badge_class}">${grade}</span></td>
					<td>${trend}</td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No quality data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#quality_score_article').html(table_html);
}

function update_efficiency_time_analysis(data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm table-striped">
				<thead class="thead-dark">
					<tr>
						<th>Time Period</th>
						<th>Records</th>
						<th>Efficiency %</th>
						<th>Performance</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	// Get hourly data
	let hourly_data = data.time_analysis?.hourly_analysis || [];
	
	if (hourly_data.length > 0) {
		hourly_data.forEach(hour => {
			let efficiency = 100 - (hour.defect_percentage || 0);
			let performance = efficiency >= 98 ? 'Excellent' : efficiency >= 95 ? 'Good' : efficiency >= 90 ? 'Average' : 'Poor';
			let badge_class = efficiency >= 98 ? 'badge-success' : efficiency >= 95 ? 'badge-info' : efficiency >= 90 ? 'badge-warning' : 'badge-danger';
			
			table_html += `
				<tr>
					<td><strong>Hour ${hour.hour || 'Unknown'}</strong></td>
					<td>${hour.records || 0}</td>
					<td>${efficiency.toFixed(1)}%</td>
					<td><span class="badge ${badge_class}">${performance}</span></td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No time data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#efficiency_time_analysis').html(table_html);
}

function update_defect_trend_analysis(data) {
	let table_html = `
		<div class="table-responsive">
			<table class="table table-sm table-striped">
				<thead class="thead-dark">
					<tr>
						<th>Date</th>
						<th>Defect %</th>
						<th>Trend</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
	`;
	
	// Get trend data
	let trend_labels = data.chart_data?.trend_labels || [];
	let trend_values = data.chart_data?.trend_values || [];
	
	if (trend_labels.length > 0) {
		trend_labels.forEach((date, index) => {
			let defect_pct = trend_values[index] || 0;
			let trend = index > 0 ? (defect_pct > trend_values[index-1] ? '↗️' : defect_pct < trend_values[index-1] ? '↘️' : '→') : '→';
			let status = defect_pct <= 2 ? 'Excellent' : defect_pct <= 5 ? 'Good' : defect_pct <= 10 ? 'Average' : 'Poor';
			let badge_class = defect_pct <= 2 ? 'badge-success' : defect_pct <= 5 ? 'badge-info' : defect_pct <= 10 ? 'badge-warning' : 'badge-danger';
			
			table_html += `
				<tr>
					<td><strong>${date}</strong></td>
					<td>${defect_pct.toFixed(2)}%</td>
					<td>${trend}</td>
					<td><span class="badge ${badge_class}">${status}</span></td>
				</tr>
			`;
		});
	} else {
		table_html += '<tr><td colspan="4" class="text-center">No trend data available</td></tr>';
	}
	
	table_html += '</tbody></table></div>';
	$('#defect_trend_analysis').html(table_html);
}

// Global functions for onclick events
window.apply_filters = apply_filters;
window.clear_filters = clear_filters;
window.refresh_data = refresh_data;
window.force_chart_recreation = force_chart_recreation;
window.refresh_chart_data = refresh_chart_data;
window.export_data = export_data;
window.view_record = view_record;