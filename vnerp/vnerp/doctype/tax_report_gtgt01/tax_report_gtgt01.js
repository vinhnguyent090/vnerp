// Copyright (c) 2017, Vinhbk2000 and contributors
// For license information, please see license.txt

cur_frm.add_fetch('company','domain','domain');
cur_frm.add_fetch('company','person_name','text04');
cur_frm.add_fetch('company','tax_id','text05');
cur_frm.add_fetch('company','address','text06');
cur_frm.add_fetch('company','district','text07');
cur_frm.add_fetch('company','city','text08');
cur_frm.add_fetch('company','phone','text09');
cur_frm.add_fetch('company','fax','text10');
cur_frm.add_fetch('company','email','text11');
cur_frm.add_fetch('company','person_sign','person_sign');

frappe.ui.form.on('Tax Report GTGT01', {
	refresh: function(frm) {
		var year = frm.doc.year||'';
		if(year == ''){
			var ymd = frm.doc.posting_date;
			cur_frm.set_value('year', ymd.substring(0,4));
		}
		cur_frm.add_custom_button(__('Export Xml'), function() {
			var period_type = frm.doc.period_type;
			var period_num = frm.doc.period_num;
			var year = frm.doc.year;
			var company = frm.doc.company;

			var args = {
				cmd: 'vnerp.vnerp.doctype.tax_report_gtgt01.tax_report_gtgt01.get_xml',
				name: frm.doc.name,
			}

			open_url_post(frappe.request.url, args, 1);
		});
    },
	first_time: function(frm){
		if(frm.doc.first_time==1){
			cur_frm.set_value('update_version', 0);
		}
	},
	getpl01_1: function(frm){
		frm.events.getpl01_1_x(frm, '33311001', 'pl01_1_1');
		frm.events.getpl01_1_x(frm, '33311002', 'pl01_1_2');
		frm.events.getpl01_1_x(frm, '33311003', 'pl01_1_3');
		frm.events.getpl01_1_x(frm, '33311004', 'pl01_1_4');
	},
	clearpl01_1: function(frm){
		frm.clear_table('pl01_1_1');
		frm.clear_table('pl01_1_2');
		frm.clear_table('pl01_1_3');
		frm.clear_table('pl01_1_4');

		refresh_field('pl01_1_1');
		refresh_field('pl01_1_2');
		refresh_field('pl01_1_3');
		refresh_field('pl01_1_4');
	},
	getpl01_1_x: function(frm, account, field){
		
		frm.clear_table(field);

		var period_type = frm.doc.period_type;
		var period_num = frm.doc.period_num;
		var year = frm.doc.year;
		var company = frm.doc.company;

		return  frappe.call({
			method: 'vnerp.vnerp.doctype.tax_report_gtgt01.tax_report_gtgt01.getpl01_1',
			args: {
				filters:{
					company: company,
					period_type: period_type,
					period_num: period_num,
					year: year.toString(),
					account_head: account,
				}
			},
			callback: function(r, rt) {
				if(r.message) {
					$.each(r.message, function(i, d) {
						var c = frm.add_child(field);
						c.reference_doctype = d.reference_doctype;
						c.reference_name = d.reference_name;
						c.reference_date = d.reference_date;
						c.party_type = d.party_type;
						c.party_name = d.party_name;
						c.tax_id = d.tax_id;
						c.net_total = d.net_total;
						c.tax_amount = d.tax_amount;
						c.total_amount = d.total_amount;
						c.account_head = d.account_head;
					});
					refresh_field(field)
				}
			}
		});

	},
	period_type: function(frm, cdt, cdn){
        countTaxReportGTGT01(frm);
    },
	period_num: function(frm, cdt, cdn){
        countTaxReportGTGT01(frm);
    },
	year: function(frm, cdt, cdn){
        countTaxReportGTGT01(frm);
    },
	company: function(frm, cdt, cdn){
        countTaxReportGTGT01(frm);
    },
	num21: function(frm, cdt, cdn){
		countTaxReportGTGT01(frm);
    },
	
	num22: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	
	num23: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	
	num24: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	num25: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	num26: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	num29: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	num30: function(frm, cdt, cdn){
		var num30 = frm.doc.num30||0;
		num31 = num30*0.05;
		cur_frm.set_value('num31', num31);
    },
	num31: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	num32: function(frm, cdt, cdn){
        var num32 = frm.doc.num32||0;
		num33 = num32*0.1;
		cur_frm.set_value('num33', num33);
    },
	num33: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	num37: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	num38: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	num39: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	num40b: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },
	num42: function(frm, cdt, cdn){
        updateGTGT01(frm);
    },

});

var get = function(frm){

}

var set0 = function(frm){
	cur_frm.set_value('num22', 0);
	cur_frm.set_value('num23', 0);
	cur_frm.set_value('num24', 0);
	cur_frm.set_value('num25', 0);
	cur_frm.set_value('num26', 0);
	cur_frm.set_value('num27', 0);
	cur_frm.set_value('num28', 0);
	cur_frm.set_value('num29', 0);
	cur_frm.set_value('num30', 0);
	cur_frm.set_value('num31', 0);
	cur_frm.set_value('num32', 0);
	cur_frm.set_value('num33', 0);
	cur_frm.set_value('num34', 0);
	cur_frm.set_value('num35', 0);
	cur_frm.set_value('num36', 0);
	cur_frm.set_value('num37', 0);
	cur_frm.set_value('num38', 0);
	cur_frm.set_value('num39', 0);
	cur_frm.set_value('num40a', 0);
	cur_frm.set_value('num40b', 0);
	cur_frm.set_value('num40', 0);
	cur_frm.set_value('num41', 0);
	cur_frm.set_value('num42', 0);
	cur_frm.set_value('num43', 0);

	frm.events.clearpl01_1(frm);

	cur_frm.refresh();

}

var countTaxReportGTGT01 = function(frm){

	var num21 = frm.doc.num21||0;
	if(num21==1){
		set0(frm);
		return;
	}
	countNum23(frm);
	frm.events.getpl01_1(frm);
}

var updateGTGT01 = function(frm){

	var num21 = frm.doc.num21||0;
	if(num21==1){
		set0(frm);
		return;
	}

	var num22 = frm.doc.num22||0;
	var num37 = frm.doc.num37||0;
	var num38 = frm.doc.num38||0;
	var num39 = frm.doc.num39||0;
	var num25 = frm.doc.num25||0;
	var num29 = frm.doc.num29||0;
	var num30 = frm.doc.num30||0;
	var num32 = frm.doc.num32||0;

	var num31 = frm.doc.num31||0;
	var num33 = frm.doc.num33||0;
	var num26 = frm.doc.num26||0;
	var num40b = frm.doc.num40b||0;
	var num42 = frm.doc.num42||0;

	var num27 = num29+num30+num32;

	var num28 = num31+num33;
	var num34 = num26+num27;

	var num35 = num28;
	var num36 = num35 - num25;

	var num40a = num36-num22+num37-num38-num39;

	if(num40a<0)
		num40a = 0;
			
	var num40 = num40a-num40b;

	var num41 = num36-num22+num37-num38-num39;
	if(num41<0)
		num41 = num41*(-1);
	else
		num41 = 0;

	var num43 = num41-num42;

	cur_frm.set_value('num27', num27);
	cur_frm.set_value('num28', num28);
	cur_frm.set_value('num34', num34);
	cur_frm.set_value('num35', num35);
	cur_frm.set_value('num36', num36);
	cur_frm.set_value('num40a', num40a);
	cur_frm.set_value('num40', num40);
	cur_frm.set_value('num41', num41);
	cur_frm.set_value('num43', num43);

	cur_frm.refresh();

}
var countNum23 = function(frm){
	
	var period_type = frm.doc.period_type;
	var period_num = frm.doc.period_num;
	var year = frm.doc.year;
	var company = frm.doc.company;

	frappe.call({
		method:"vnerp.vnerp.doctype.tax_report_gtgt01.tax_report_gtgt01.get_total_pi",
		args:{
			filters:{
				company: company,
				period_type: period_type,
				period_num: period_num,
				year: year.toString()
			}
		},
		callback: function(r){
			result = r.message
			cur_frm.set_value('num23', result.total_pi);
			cur_frm.set_value('num24', result.total_tax_pi);
			cur_frm.set_value('num25', result.total_tax_pi);
			
			cur_frm.set_value('num26', result.data[4][1]);
			cur_frm.set_value('num29', result.data[5][1]);
			cur_frm.set_value('num30', result.data[6][1]);
			cur_frm.set_value('num32', result.data[7][1]);

			cur_frm.set_value('num31', result.data[6][3]);
			cur_frm.set_value('num33', result.data[7][3]);

			updateGTGT01(frm);

		}
	});
}
