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
			]

		}
    ]        