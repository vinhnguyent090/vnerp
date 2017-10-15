from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Vietnam Reports"),
			"icon": "fa fa-table",
			"items": [
				{
					"type": "report",
					"name": "Selling VAT",
					"doctype": "GL Entry",
					"is_query_report": True,
				},
				{
					"type": "doctype",
					"name": "Tax Report GTGT01",
					"description": _("Tax Report GTGT01")
				}
			]

		},
		{
			"label": _("Setup"),
			"icon": "fa fa-table",
			"items": [
				{
					"type": "doctype",
					"name": "Tax Report Info",
					"description": _("Tax Report Info")
				}
			]

		}
    ]        