// Copyright (c) 2016, Vinhbk2000 and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Selling VAT"] = {
	"filters": [
		{
			"fieldname":"period",
			"label": __("Period"),
			"fieldtype": "Select",
			"options": "Quarter\nMonth",
			"default": "Quarter",
			"width": "80",
			"on_change": function(query_report) {
				//check == Quarter
				var period = query_report.get_values().period;
				var period_num = query_report.get_values().period_num;
				if (period=='Quarter' && period_num>5) {
					frappe.query_report_filters_by_name.period_num.set_input(4);
				}
				query_report.trigger_refresh();
			}
		},
		{
			"fieldname":"period_num",
			"label": __("Period Num"),
			"fieldtype": "Select",
			"options": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12",
			"default": "1",
			"width": "80",
			"on_change": function(query_report) {
				//check == Quarter
				var period = query_report.get_values().period;
				var period_num = query_report.get_values().period_num;
				if (period=='Quarter' && period_num>5) {
					frappe.query_report_filters_by_name.period_num.set_input(4);
				}
				query_report.trigger_refresh();
			}
		},
		{
			"fieldname": "year",
			"label": __("Year"),
			"fieldtype": "Link",
			"options": "Year",
			"default": frappe.defaults.get_user_default("fiscal_year"),
			"reqd": 1
		},
		{
			"fieldname":"company",
			"label": "Company",
			"fieldtype": "Link",
			"options": "Company",
			"default": frappe.sys_defaults.company
		},
		{
			"fieldtype": "Break",
		},
		{
			"fieldname":"version",
			"label": __("Update Version"),
			"fieldtype": "Int",
			"default": ""
		},
	],

	"onload": function() {
		return  frappe.call({
			method: "erpnext.hr.report.monthly_attendance_sheet.monthly_attendance_sheet.get_attendance_years",
			callback: function(r) {
				var year_filter = frappe.query_report_filters_by_name.year;
				year_filter.df.options = r.message;
				year_filter.df.default = r.message.split("\n")[0];
				year_filter.refresh();
				year_filter.set_input(year_filter.df.default);
			}
		});
	}
}
