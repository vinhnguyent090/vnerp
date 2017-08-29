# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "vnerp"
app_title = "vnerp"
app_publisher = "Vinhbk2000"
app_description = "Erp for Viet Nam"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "vinhbk2000@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/vnerp/css/vnerp.css"
# app_include_js = "/assets/vnerp/js/vnerp.js"

# include js, css files in header of web template
# web_include_css = "/assets/vnerp/css/vnerp.css"
# web_include_js = "/assets/vnerp/js/vnerp.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "vnerp.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "vnerp.install.before_install"
# after_install = "vnerp.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "vnerp.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"vnerp.tasks.all"
# 	],
# 	"daily": [
# 		"vnerp.tasks.daily"
# 	],
# 	"hourly": [
# 		"vnerp.tasks.hourly"
# 	],
# 	"weekly": [
# 		"vnerp.tasks.weekly"
# 	]
# 	"monthly": [
# 		"vnerp.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "vnerp.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "vnerp.event.get_events"
# }

