# Inline Stitching Dashboard

A comprehensive dashboard for monitoring and analyzing inline stitching quality data.

## Features

### 📊 Summary Cards
- **Total Records**: Count of all inline stitching records
- **Total Pieces**: Sum of all pieces processed
- **Total Defects**: Total number of defects found
- **Defect Percentage**: Overall defect rate

### 🔍 Advanced Filters
- **Date Range**: Filter by reporting date
- **Process Type**: Filter by time slots (09-12, 12-03, 03-06)
- **Sales Order**: Search by PO/Sales Order number
- **Machine**: Filter by machine number
- **Operator**: Filter by operator name
- **Article**: Filter by article type

### 📈 Visual Analytics
- **Defect Distribution Chart**: Doughnut chart showing breakdown of defect types
- **Trend Analysis**: Line chart showing defect percentage trends over time
- **Fallback Tables**: Data displayed as tables if Chart.js is not available

### 📋 Data Table
- **Comprehensive View**: All inline stitching records with key details
- **Sortable Columns**: Click headers to sort data
- **Quick Actions**: View individual records
- **Export Functionality**: Download data as CSV

## Technical Details

### Files Structure
```
inline_stitching_das/
├── __init__.py
├── inline_stitching_das.js      # Frontend dashboard logic
├── inline_stitching_das.py      # Backend API endpoints
├── inline_stitching_das.css     # Dashboard styling
└── README.md                    # This documentation
```

### API Endpoints

#### `get_dashboard_data(filters)`
Returns dashboard data including summary statistics, chart data, and records.

**Parameters:**
- `filters` (dict): Filter criteria including date range, process type, etc.

**Returns:**
```json
{
  "summary": {
    "total_records": 150,
    "total_pieces": 5000,
    "total_defects": 250,
    "defect_percentage": 5.0
  },
  "chart_data": {
    "defect_labels": ["Double Stitch", "Open Seam", ...],
    "defect_values": [50, 30, ...],
    "trend_labels": ["2024-01-01", "2024-01-02", ...],
    "trend_values": [4.5, 5.2, ...]
  },
  "records": [...]
}
```

#### `export_data(filters)`
Exports filtered data as CSV file.

### Database Queries

The dashboard uses optimized SQL queries to:
- Aggregate defect data by type
- Calculate summary statistics
- Generate trend data for the last 7 days
- Filter records based on user criteria

### Performance Considerations

- **Pagination**: Records are limited to 100 per page
- **Indexed Queries**: Uses proper database indexes for filtering
- **Caching**: Summary calculations are optimized
- **Responsive Design**: Mobile-friendly interface

## Usage

1. Navigate to the Inline Stitching Dashboard page
2. Use the filter controls to narrow down your data
3. Click "Apply Filters" to update the dashboard
4. Use "Export" to download data as CSV
5. Click on individual records to view details

## Customization

### Adding New Filters
1. Add filter input in `create_filters()` function
2. Update `get_filters()` function to include new filter
3. Modify `build_conditions()` in Python backend

### Adding New Charts
1. Add chart container in `create_charts()` function
2. Update `update_charts()` function with new chart logic
3. Modify `get_chart_data()` in Python backend

### Styling
- Modify `inline_stitching_das.css` for custom styling
- Uses Bootstrap classes for responsive design
- Custom CSS for enhanced visual appeal

## Dependencies

- **Frontend**: jQuery, Bootstrap, Chart.js (optional)
- **Backend**: Frappe Framework, Python 3.x
- **Database**: MySQL/MariaDB

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Charts Not Displaying
- Ensure Chart.js is loaded in your Frappe installation
- Check browser console for JavaScript errors
- Dashboard will fallback to table view if Chart.js is unavailable

### Data Not Loading
- Check Frappe logs for backend errors
- Verify database permissions
- Ensure proper user roles and permissions

### Performance Issues
- Reduce date range for large datasets
- Use specific filters to narrow down results
- Consider adding database indexes for frequently filtered fields
