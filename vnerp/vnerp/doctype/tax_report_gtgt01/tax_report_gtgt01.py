# -*- coding: utf-8 -*-
# Copyright (c) 2017, Vinhbk2000 and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe, json
from frappe.model.document import Document
from frappe.utils import get_first_day, get_last_day, add_to_date, nowdate, getdate, add_days, add_months

class TaxReportGTGT01(Document):
	pass


@frappe.whitelist()
def get_total_pi(filters):

	filters = json.loads(filters)


	if(filters["period_type"]=="Month"):
		#convert from_date
		from_date = get_first_day(filters["period_num"] + '-' + filters["year"])
		filters["to_date"] =  get_last_day(filters["period_num"] + '-' + filters["year"])
		#frappe.msgprint(filters["from_date)
	
	if(filters["period_type"]=="Quarter"):
		#convert from_date
		period_num = "1"
		if(filters["period_num"]=="2"):
			period_num = "4"
		if(filters["period_num"]=="3"):
			period_num = "7"
		if(filters["period_num"]=="4"):
			period_num = "10"
			
		filters["from_date"] = get_first_day(period_num + '-' + filters["year"])
		filters["to_date"] = add_months(filters["from_date"], 3)
		filters["to_date"] = add_days(filters["to_date"], -1)
	
	#Purchase Invoice
	query = """ SELECT name, tax_rate FROM `tabAccount`
	WHERE `account_type`='Tax' 
	AND `freeze_account`='No' 
	AND `is_group` = 0 
	AND `name` LIKE '133%' 
	ORDER BY name """

	listAcount = frappe.db.sql(query, as_list=1)
	arrAcount = []
	arrTaxRate = []

	for i in range(0, len(listAcount)):
		arrAcount.append(listAcount[i][0])
		arrTaxRate.append(listAcount[i][1])
	
	conditions = get_conditions(filters)
	data = []
	total_pi = 0

	for i in range(0, len(arrAcount)):
		rate_name = arrAcount[i]
		tax_rate = arrTaxRate[i]

		query = """SELECT si_tax.account_head,
		sum(si.base_net_total), %d, sum(si_tax.base_tax_amount)
		FROM `tabPurchase Invoice` si, `tabPurchase Taxes and Charges` si_tax
		WHERE si.docstatus = 1 AND si_tax.parent = si.name AND si_tax.account_head = '%s'
		%s
		GROUP BY si_tax.account_head
		""" %(tax_rate, rate_name, conditions)

	
		row = frappe.db.sql(query, as_list=1)

		if (row):
			data.append(row[0])
			total_pi = total_pi + row[0][1]
		else:
			data.append([rate_name, 0, tax_rate, 0])
	
	#Sales Invoice
	query = """ SELECT name, tax_rate FROM `tabAccount`
	WHERE `account_type`='Tax' 
	AND `freeze_account`='No' 
	AND `is_group` = 0 
	AND `name` LIKE '3331%' 
	ORDER BY name """

	listAcount = frappe.db.sql(query, as_list=1)
	arrAcount = []
	arrTaxRate = []

	for i in range(0, len(listAcount)):
		arrAcount.append(listAcount[i][0])
		arrTaxRate.append(listAcount[i][1])

	for i in range(0, len(arrAcount)):
		rate_name = arrAcount[i]
		tax_rate = arrTaxRate[i]

		query = """SELECT si_tax.account_head,
		sum(si.base_net_total), %d, sum(si_tax.base_tax_amount)
		FROM `tabSales Invoice` si, `tabSales Taxes and Charges` si_tax
		WHERE si.docstatus = 1 AND si_tax.parent = si.name AND si_tax.account_head = '%s'
		%s
		GROUP BY si_tax.account_head
		""" %(tax_rate, rate_name, conditions)

	
		row = frappe.db.sql(query, as_list=1)

		if (row):
			data.append(row[0])
		else:
			data.append([rate_name, 0, tax_rate, 0])
	
	result = {
		'total_pi': total_pi,
		'total_tax_pi': data[2][3]+data[3][3],
		'data': data
	}
	return  result

def get_conditions(filters):
	conditions = ""

	if filters.get("from_date"):
		conditions += " and si.posting_date >= '%s'" % filters["from_date"]

	if filters.get("to_date"):
		conditions += " and si.posting_date <= '%s'" % filters["to_date"]
	
	return conditions
