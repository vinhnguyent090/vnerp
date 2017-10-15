# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "vnerp",
			"color": "grey",
			"icon": "octicon octicon-file-directory",
			"label": _("vvv"),
			"link": "List/Room",
			"_doctype": "Room",
			"type": "list"
		}
	]
