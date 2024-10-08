from odoo import api, fields, models

class ResCompany(models.Model):
    _inherit = "res.company"

    header = fields.Binary(related='partner_id.image_1920', default=_get_logo, string="Company Logo", readonly=False)