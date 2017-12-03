from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Ke khai"),
			"icon": "fa fa-table",
			"items": [
				{
					"type": "doctype",
					"name": "Tax Report GTGT01",
					"label": _("Tax Report GTGT01")
				}
			]

		},
		{
			"label": _("He thong"),
			"icon": "fa fa-table",
			"items": [
				{
					"type": "doctype",
					"name": "Tax Report Info",
					"label": _("Tax Report Info")
				}
			]

		}
    ]        