// Copyright (c) 2016, Vinhbk2000 and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Selling VAT"] = {
	"filters": [
		{
			"fieldname":"from_date",
			"label": "From Date",
			"fieldtype": "Date",
			"default": frappe.defaults.get_user_default("year_start_date"),
			"width": "80"
		},
		{
			"fieldname":"to_date",
			"label": "To Date",
			"fieldtype": "Date",
			"default": get_today()
		},
		{
			"fieldname":"account",
			"label": __("Account"),
			"fieldtype": "Link",
			"options": "Account",
			"get_query": function() {
				var company = frappe.query_report.filters_by_name.company.get_value();
				return {
					"query": "erpnext.controllers.queries.get_account_list", 
					"filters": {
						"report_type": "Balance Sheet",
						"company": company,
						"master_type": "Customer"
					}
				}
			}
		},
		{
			"fieldname":"letter_head",
			"label": "Letter Head",
			"fieldtype": "Link",
			"options": "Letter Head"
		},
		{
			"fieldname":"company",
			"label": "Company",
			"fieldtype": "Link",
			"options": "Company",
			"default": sys_defaults.company
		}
	]
}
