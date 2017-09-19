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
			"default": frappe.datetime.get_today()
		},
		{
			"fieldname":"company",
			"label": "Company",
			"fieldtype": "Link",
			"options": "Company",
			"default": frappe.sys_defaults.company
		}
	]
}
