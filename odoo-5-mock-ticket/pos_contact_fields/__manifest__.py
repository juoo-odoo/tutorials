# -*- coding: utf-8 -*-
{
    'name': "[2705976] Contact new fields + POS new fields ",
    'summary': '''
            Mock Ticket 2705976 - https://www.odoo.com/odoo/project.task/2705976
    ''',

    'author': "Odoo",
    'website': "https://www.odoo.com/",
    'version': '0.1',
    'application': True,
    'installable': True,
    'depends': ['base', 'point_of_sale'],

    'data': [
        'data/employee_sequence.xml',
        "views/res_partner_views.xml",
        # "views/product_template_views.xml"
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'pos_contact_fields/static/src/**/*'
        ]
    },
}
