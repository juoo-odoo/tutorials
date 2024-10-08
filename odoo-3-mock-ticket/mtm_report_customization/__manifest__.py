# -*- coding: utf-8 -*-
{
    'name': "2941588 Mock Ticket",

    'author': "Odoo",
    'website': "https://www.odoo.com/",
    'version': '0.1',
    'application': True,
    'installable': True,
    'depends': ['base', 'account'],

    'data': [
        'views/report_views.xml',
        'views/account_report.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'mtm_report_customization/static/**/*',
        ],
    },
}
