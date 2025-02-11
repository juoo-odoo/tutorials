from odoo import fields, models

class ResUser(models.Model):
    _inherit = "res.users"

    property_ids = fields.One2many(
        "estate.property", 
        "salesperson_id", 
        domain=[("state", "in", ['new', 'canceled'])]
    )
