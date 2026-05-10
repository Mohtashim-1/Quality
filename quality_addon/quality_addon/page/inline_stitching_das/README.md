# Inline Stitching Dashboard

A comprehensive, enterprise-grade dashboard for monitoring, analyzing, and optimizing inline stitching quality data in real-time. This dashboard provides deep insights into production quality, operator performance, machine efficiency, and defect patterns.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Dashboard Sections](#dashboard-sections)
- [Technical Architecture](#technical-architecture)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The Inline Stitching Dashboard is a powerful analytics tool designed for quality control teams, production managers, and operations staff. It provides:

- **Real-time Quality Monitoring**: Track defect rates, quality scores, and efficiency metrics
- **Performance Analytics**: Analyze operator, machine, and process performance
- **Trend Analysis**: Identify patterns and trends over time
- **Root Cause Analysis**: Understand defect causes and prioritize improvements
- **Export Capabilities**: Download data for further analysis

## ✨ Features

### 📊 Summary Cards (12 Key Metrics)

1. **Total Records**: Count of all inline stitching records
2. **Total Operations**: Total number of operations performed
3. **Total Pieces**: Sum of all pieces processed
4. **Total Defects**: Total number of defects found
5. **Defect Percentage**: Overall defect rate
6. **Quality Score**: Calculated quality performance score
7. **Efficiency Score**: Operational efficiency metric
8. **Average Defect %**: Mean defect percentage
9. **Min/Max Defect %**: Range of defect percentages
10. **Pieces per Record**: Average pieces per record
11. **Defects per Record**: Average defects per record
12. **Machines/Operators/Articles/POs**: Count of unique entities

### 🔍 Advanced Filtering System

- **Date Range**: Filter by reporting date (from/to)
- **Process Type**: Filter by time slots (09-12, 12-03, 03-06)
- **Sales Order/PO**: Search by Purchase Order or Sales Order number
- **Machine**: Filter by machine number/identifier
- **Operator**: Filter by operator name
- **Article**: Filter by article type/product

### 📈 Comprehensive Visual Analytics

The dashboard includes **20+ chart types**:

#### Primary Charts
- **Defect Distribution Pie/Doughnut**: Breakdown of defect types
- **Defect Types Bar Chart**: Comparison of defect categories
- **Defect Trend Line Chart**: Defect percentage trends over time
- **Pieces vs Defects Chart**: Correlation analysis

#### Performance Charts
- **Operator Performance Chart**: Individual operator quality scores
- **Machine Performance Chart**: Machine efficiency and quality metrics
- **Process Performance Chart**: Time slot analysis (09-12, 12-03, 03-06)
- **Hourly Performance Chart**: Performance by hour of day
- **Article Performance Chart**: Quality by article type

#### Advanced Analytics
- **Size Analysis Chart**: Defect rates by size
- **Design Quality Chart**: Quality by design type
- **Daily Production Chart**: Production volume trends
- **Quality Score Distribution**: Histogram of quality scores
- **Performance Ranking Chart**: Top/bottom performers
- **Defect Severity Chart**: Severity level distribution
- **Machine-Operator Comparison**: Cross-analysis matrix
- **Production Efficiency Chart**: Efficiency trends
- **Defect Pattern Chart**: Pattern identification
- **Improvement Trends Chart**: Progress over time
- **Production Distribution Chart**: Volume distribution
- **KPI Overview Chart**: Key performance indicators
- **Target vs Actual Chart**: Goal achievement analysis

### 📋 Detailed Analysis Sections

#### 1. Breakdown Section
- **Top Performers**: Best operators and machines
- **Machine Performance Matrix**: Machine-by-machine analysis
- **Operator Performance Matrix**: Operator-by-operator analysis
- **Article Analysis Table**: Quality by article type
- **Size Defect Analysis**: Defect rates by size
- **Design Defect Analysis**: Quality by design

#### 2. Detailed Analysis Section
- **Quality Score Analysis**: Score distribution and trends
- **Efficiency Time Analysis**: Time-based efficiency metrics
- **Defect Trend Analysis**: Historical defect patterns
- **Defect Pattern Analysis**: Frequency and severity patterns
- **Daily Performance Trends**: Day-by-day performance
- **Quality Champions**: Top performing operators
- **Improvement Areas**: Areas needing attention
- **Production Distribution**: Volume analysis
- **Machine-Operator Comparison**: Cross-functional analysis
- **Time Efficiency Analysis**: Time-based metrics
- **Root Cause Analysis**: Defect cause identification
- **Performance Summary Matrix**: Comprehensive KPI matrix

### 📊 Data Table

- **Comprehensive View**: All inline stitching records with full details
- **Sortable Columns**: Click headers to sort by any column
- **Quick Actions**: View individual records with one click
- **Export Functionality**: Download filtered data as CSV
- **Pagination**: Navigate through large datasets efficiently

## 🏗️ Dashboard Sections

### 1. Filters Section
Located at the top, provides all filtering controls with:
- Date range pickers
- Dropdown selects for process types
- Text inputs for searchable fields
- Action buttons (Apply, Clear, Refresh, Load Charts)

### 2. Summary Cards Section
Displays 12 key metrics in visually appealing cards with:
- Large numbers for quick reference
- Trend indicators (percentage changes)
- Color-coded icons
- Responsive grid layout

### 3. Charts Section
Dynamic chart area that:
- Automatically loads Chart.js library
- Falls back to table view if Chart.js unavailable
- Supports multiple chart types
- Responsive and interactive

### 4. Breakdown Section
Detailed breakdowns including:
- Top performers tables
- Performance matrices
- Analysis tables with color-coded badges
- Expandable/collapsible sections

### 5. Detailed Analysis Section
Deep-dive analytics with:
- Trend analysis
- Pattern identification
- Root cause analysis
- Performance comparisons

### 6. Data Table Section
Complete record listing with:
- All record fields
- Sorting capabilities
- Quick view actions
- Export functionality

## 🔧 Technical Architecture

### Files Structure
```
inline_stitching_das/
├── __init__.py                    # Python package initialization
├── inline_stitching_das.js        # Frontend dashboard logic (4560+ lines)
├── inline_stitching_das.py        # Backend API endpoints
├── inline_stitching_das.css       # Dashboard styling
├── inline_stitching_das.json      # Page configuration
└── README.md                      # This documentation
```

### Technology Stack

**Frontend:**
- jQuery (DOM manipulation)
- Bootstrap 4/5 (responsive layout)
- Chart.js 3.9.1 (data visualization)
- Frappe UI Framework

**Backend:**
- Python 3.x
- Frappe Framework
- MySQL/MariaDB

### Key Functions

#### Frontend (JavaScript)
- `init_dashboard()`: Initialize dashboard components
- `load_dashboard_data()`: Fetch data from backend
- `create_filters()`: Build filter UI
- `create_summary_cards()`: Generate summary cards
- `create_charts()`: Setup chart containers
- `update_charts()`: Render chart data
- `create_data_table()`: Build data table
- `apply_filters()`: Apply user filters
- `export_data()`: Export to CSV
- 20+ chart creation functions
- 15+ analysis update functions

#### Backend (Python)
- `get_dashboard_data()`: Main API endpoint
- `build_conditions()`: Build SQL WHERE clauses
- `get_detailed_summary_data()`: Calculate summary statistics
- `get_comprehensive_chart_data()`: Generate chart datasets
- `get_records_data()`: Fetch record details
- `get_trend_analysis()`: Calculate trends
- `get_operator_analysis()`: Operator performance data
- `get_machine_analysis()`: Machine performance data
- `get_article_analysis()`: Article quality data
- `get_time_analysis()`: Time-based analysis
- `get_defect_analysis()`: Defect breakdown
- `export_data()`: CSV export functionality

## 📡 API Documentation

### Main Endpoint

#### `get_dashboard_data(filters=None)`

**Description**: Returns comprehensive dashboard data including summary statistics, chart data, records, and all analysis sections.

**Method**: `@frappe.whitelist()`

**Parameters**:
```python
filters = {
    'from_date': '2024-01-01',      # Start date (YYYY-MM-DD)
    'to_date': '2024-01-31',        # End date (YYYY-MM-DD)
    'process_type': '09 to 12',     # Process time slot
    'sales_order': 'PO-001',         # PO/Sales Order search
    'machine': 'M001',              # Machine filter
    'operator': 'John Doe',         # Operator filter
    'article': 'Article A'          # Article filter
}
```

**Returns**:
```json
{
    "summary": {
        "total_records": 150,
        "total_operations": 450,
        "total_pieces": 5000,
        "total_defects": 250,
        "defect_percentage": 5.0,
        "quality_score": 95.0,
        "efficiency_score": 92.5,
        "avg_defect_percentage": 4.8,
        "min_defect_percentage": 2.1,
        "max_defect_percentage": 8.5,
        "pieces_per_record": 33.3,
        "defects_per_record": 1.67,
        "total_machines": 5,
        "total_operators": 12,
        "total_articles": 8,
        "total_pos": 25
    },
    "chart_data": {
        "defect_labels": ["Double Stitch", "Open Seam", "..."],
        "defect_values": [50, 30, ...],
        "trend_labels": ["2024-01-01", "2024-01-02", ...],
        "trend_values": [4.5, 5.2, ...],
        "operator_data": {...},
        "machine_data": {...},
        "article_data": {...},
        "hourly_data": {...},
        "process_data": {...}
    },
    "records": [
        {
            "name": "IS-00001",
            "reporting_date": "2024-01-15",
            "process_type": "09 to 12",
            "select_po": "PO-001",
            "total_number_pcs": 100,
            "total_defects": 5,
            "defect_percentage": 5.0,
            ...
        }
    ],
    "trend_analysis": {...},
    "operator_analysis": {...},
    "machine_analysis": {...},
    "article_analysis": {...},
    "time_analysis": {...},
    "defect_analysis": {...}
}
```

#### `export_data(filters=None)`

**Description**: Exports filtered data as CSV file.

**Method**: `@frappe.whitelist()`

**Parameters**: Same as `get_dashboard_data()`

**Returns**: CSV file download

#### `test_dashboard()`

**Description**: Test function to verify dashboard connectivity and basic functionality.

**Method**: `@frappe.whitelist()`

**Returns**: `{"status": "success", "message": "Dashboard is working"}`

## 📖 Usage Guide

### Basic Usage

1. **Navigate to Dashboard**
   - Go to `/app/inline-stitching-das` in your Frappe instance
   - Or search for "Inline Stitching Dashboard" in the search bar

2. **Set Filters**
   - Select date range (defaults to last 30 days)
   - Choose process type if needed
   - Enter search terms for PO, Machine, Operator, or Article
   - Click "Apply Filters"

3. **View Summary**
   - Review summary cards for quick insights
   - Check trend indicators for changes

4. **Analyze Charts**
   - Scroll to charts section
   - If charts don't load, click "Load Charts" button
   - Hover over chart elements for details

5. **Explore Breakdowns**
   - Review top performers
   - Check performance matrices
   - Analyze article and size breakdowns

6. **Deep Dive Analysis**
   - Scroll to detailed analysis section
   - Review trend analysis
   - Check root cause analysis
   - Identify improvement areas

7. **Export Data**
   - Click "Export" button
   - CSV file will download with filtered data

### Advanced Usage

#### Loading All Charts
If charts don't load automatically:
1. Click "Load All Charts" button
2. Wait for Chart.js to load
3. Charts will render automatically

#### Refreshing Data
- Click "Refresh" to reload current filters
- Click "Refresh Forms" to reload form data
- Data updates in real-time

#### Viewing Individual Records
- Click on any record in the data table
- Record opens in Frappe form view
- Make edits if needed

## 🎨 Customization

### Adding New Filters

1. **Frontend (JavaScript)**
   ```javascript
   // In create_filters() function, add new input:
   <div class="col-md-3">
       <div class="form-group">
           <label>New Filter</label>
           <input type="text" class="form-control" id="new_filter">
       </div>
   </div>
   ```

2. **Update get_filters() function**
   ```javascript
   function get_filters() {
       return {
           // ... existing filters
           new_filter: $('#new_filter').val()
       };
   }
   ```

3. **Backend (Python)**
   ```python
   # In build_conditions() function:
   if filters and filters.get('new_filter'):
       conditions.append(f"`tabInline Stitching`.new_field = '{filters['new_filter']}'")
   ```

### Adding New Charts

1. **Create Chart Container**
   ```javascript
   // In create_charts() function:
   <div class="col-md-6">
       <canvas id="new_chart"></canvas>
   </div>
   ```

2. **Create Chart Function**
   ```javascript
   function create_new_chart(data) {
       let ctx = document.getElementById('new_chart');
       if (ctx) {
           new Chart(ctx, {
               type: 'bar',
               data: {
                   labels: data.labels,
                   datasets: [{
                       label: 'New Metric',
                       data: data.values
                   }]
               }
           });
       }
   }
   ```

3. **Update Chart Data**
   ```javascript
   // In update_charts() function:
   create_new_chart(chart_data.new_chart_data);
   ```

4. **Backend Data**
   ```python
   # In get_comprehensive_chart_data() function:
   new_chart_data = {
       'labels': [...],
       'values': [...]
   }
   ```

### Styling Customization

Edit `inline_stitching_das.css` to customize:
- Card colors and gradients
- Chart colors
- Table styling
- Responsive breakpoints
- Animation effects

### Adding New Summary Cards

1. **Add Card HTML**
   ```javascript
   // In create_summary_cards() function:
   <div class="col-md-2">
       <div class="card summary-card">
           <div class="card-body">
               <h6 class="card-title text-muted">New Metric</h6>
               <h3 class="mb-0" id="new_metric">0</h3>
           </div>
       </div>
   </div>
   ```

2. **Update Card Value**
   ```javascript
   // In update_summary_cards() function:
   $('#new_metric').text(summary.new_metric || 0);
   ```

3. **Backend Calculation**
   ```python
   # In get_detailed_summary_data() function:
   new_metric = calculate_new_metric(conditions)
   summary['new_metric'] = new_metric
   ```

## 🐛 Troubleshooting

### Charts Not Displaying

**Symptoms**: Charts show as empty or tables instead of visual charts

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify Chart.js is loaded: `console.log(typeof Chart)`
3. Click "Load Charts" or "Load All Charts" button
4. Check network tab for Chart.js CDN loading
5. Dashboard will automatically fallback to table view if Chart.js unavailable

**Debug Steps**:
```javascript
// In browser console:
console.log('Chart.js available:', typeof Chart !== 'undefined');
// Should output: Chart.js available: true
```

### Data Not Loading

**Symptoms**: Dashboard shows "No data available" or empty sections

**Solutions**:
1. Check Frappe logs: `bench --site [site] logs`
2. Verify database permissions
3. Check user roles and permissions
4. Verify date range has data
5. Test API directly: `/api/method/forcasting.forcasting.api.get_dashboard_data`

**Debug Steps**:
```python
# In Python console:
import frappe
from quality_addon.quality_addon.page.inline_stitching_das.inline_stitching_das import get_dashboard_data
result = get_dashboard_data({})
print(result)
```

### Performance Issues

**Symptoms**: Dashboard loads slowly or times out

**Solutions**:
1. Reduce date range (use smaller date windows)
2. Apply specific filters to narrow results
3. Add database indexes on frequently filtered fields:
   ```sql
   CREATE INDEX idx_reporting_date ON `tabInline Stitching`(reporting_date);
   CREATE INDEX idx_process_type ON `tabInline Stitching`(process_type);
   ```
4. Limit records per page
5. Use pagination for large datasets

### Filter Not Working

**Symptoms**: Filters don't affect displayed data

**Solutions**:
1. Check filter values in browser console:
   ```javascript
   console.log(get_filters());
   ```
2. Verify backend conditions are built correctly
3. Check SQL query in Frappe logs
4. Test filter directly in database:
   ```sql
   SELECT * FROM `tabInline Stitching` 
   WHERE reporting_date >= '2024-01-01' 
   AND reporting_date <= '2024-01-31';
   ```

### Export Not Working

**Symptoms**: Export button doesn't download file

**Solutions**:
1. Check browser download settings
2. Verify user has export permissions
3. Check Frappe logs for export errors
4. Try smaller date range (large exports may timeout)
5. Check file size limits

## 🔒 Security & Permissions

### Required Permissions

Users need the following permissions to use the dashboard:
- **Read** access to "Inline Stitching" DocType
- **Read** access to "Inline Stitching CT" Child Table
- **Export** permission for data export functionality

### Setting Permissions

1. Go to **Role Permissions** in Frappe
2. Select user's role
3. Grant **Read** permission to "Inline Stitching"
4. Grant **Export** permission if needed

## 📊 Performance Optimization

### Database Indexes

Recommended indexes for optimal performance:
```sql
-- Main table indexes
CREATE INDEX idx_reporting_date ON `tabInline Stitching`(reporting_date);
CREATE INDEX idx_process_type ON `tabInline Stitching`(process_type);
CREATE INDEX idx_select_po ON `tabInline Stitching`(select_po);

-- Child table indexes
CREATE INDEX idx_machine ON `tabInline Stitching CT`(machine);
CREATE INDEX idx_operator ON `tabInline Stitching CT`(operator_name);
CREATE INDEX idx_article ON `tabInline Stitching CT`(article);
```

### Caching

Consider implementing caching for:
- Summary statistics (cache for 5-10 minutes)
- Chart data (cache for 2-5 minutes)
- Static reference data (cache for 1 hour)

### Query Optimization

- Use `LIMIT` clauses for large datasets
- Avoid `SELECT *` - select only needed fields
- Use proper JOINs instead of subqueries
- Add WHERE conditions early in query

## 🌐 Browser Support

- **Chrome**: 60+ (Recommended)
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+

## 📝 Version History

- **v1.0.0**: Initial release with basic dashboard
- **v2.0.0**: Added comprehensive charts and analysis
- **v2.1.0**: Added export functionality
- **v2.2.0**: Performance optimizations
- **v2.3.0**: Enhanced breakdown and analysis sections

## 🤝 Contributing

To contribute improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
- Check Frappe logs: `bench --site [site] logs`
- Review browser console for JavaScript errors
- Check this README for common solutions
- Contact the development team

## 📄 License

Copyright (c) 2024, mohtashim and contributors
For license information, please see license.txt

---

**Last Updated**: 2024
**Maintained By**: Quality Addon Development Team
