# Copyright (c) 2013, Vinhbk2000 and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.utils import flt
from frappe import msgprint, _

def execute(filters=None):
	if not filters: filters = {}

	address = frappe.get_doc("Address", filters.company)
	company = frappe.get_doc("Company", filters.company)

	data_to_be_printed = {
		"company": company,
		"address": address
	}

	columns = get_columns()
	data = get_invoices(filters)
	return columns, data, None, None, data_to_be_printed
	
def get_columns():
	return [
		"VAT Type::450",
		"Net Total:Currency:150", "Tax %:Percent:50",
		"Total Sales Tax Amount:Currency:150"
	]

def get_invoices(filters):
	conditions = get_conditions(filters)

	data = []
	arrRate = [0,5,10]

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
	
		#frappe.msgprint(query)
	
	#frappe.msgprint (data)
	#tin = frappe.db.sql ("""SELECT name, customer, tin_no from `tabAddress` """, as_list=1)
	
	#frappe.msgprint(len(si))
	
	# for i in range(0, len(si)):	
	# 	si[i][4] = si[i][4]-si[i][6]
	# 	for j in range(0,len(tin)):
	# 		if si[i][2]==tin[j][0]:
	# 			si[i][2]= tin[j][2]

	return data
	

def get_conditions(filters):
	conditions = ""

	if filters.get("from_date"):
		conditions += " and si.posting_date >= '%s'" % filters["from_date"]

	if filters.get("to_date"):
		conditions += " and si.posting_date <= '%s'" % filters["to_date"]
	
	return conditions	
