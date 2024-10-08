# -*- coding: utf-8 -*-
{
    'name': "Abishek custom POS Mock Ticket",
    'summary': '''
            Link POS product to multiple sale order line

            New field in product.template
            One2many relationship to POS order line

            - Business need: Want to see popular items ( high count of selling )
            And see it in the POS screen, along w internal reference

            UI in POS screen:
            ------------
            Item
            {Internal reference}
            {Price}   {Sell Count}
    ''',

    'author': "Odoo",
    'website': "https://www.odoo.com/",
    'version': '0.1',
    'application': True,
    'installable': True,
    'depends': ['base', 'point_of_sale'],

    'data': [
        "views/product_product_views.xml",
        "views/product_template_views.xml"
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'pos_popular_items/static/src/**/*'
        ]
    },
}
