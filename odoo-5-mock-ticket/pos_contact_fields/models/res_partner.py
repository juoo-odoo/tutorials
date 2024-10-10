from odoo import api, fields, models
from odoo.exceptions import ValidationError
import re

class ResPartner(models.Model):
    _inherit = "res.partner"

    # NOTE: should pass a default value for required selection fields
    contact_type = fields.Selection([('vendor', 'Vendor'), ('customer', 'Customer'), ('internal_location', 'Internal Location')])

    # NOTE: used stored for values that we want to keep instead of recomputing
    account_number = fields.Char(compute="_compute_account_number", readonly=True) 
    name = fields.Char(readonly=True, compute="_compute_full_name")

    first_name = fields.Char()
    last_name = fields.Char()

    # used to store a unique account number for eahc customer. when a cusotmer is moved to vendor and back to customer, they will kepe the same
    # account number they had earlier
    existing_account_number = fields.Char(readonly=True)

    # NOTE : Ask abishek about compute function bs tpractices 
    @api.depends('first_name', 'last_name')
    def _compute_full_name(self):
        for record in self:
            record.name = (record.first_name or "") + " " + (record.last_name or "")

    @api.depends('contact_type')
    def _compute_account_number(self):
        for record in self:
            if record.contact_type == 'customer': 
                record.account_number = record.existing_account_number
            else:
                record.account_number = ''
    
    # this currently works on JS frontend as well, because that component handles the error for us. 
    # this would throw an error that propagates to JS frontend, but you have to catch it on the frontend
    # and display an error message/modal etc
    @api.constrains('mobile')
    def _validate_mobile_number(self):
        for record in self:
            # testing regex
            if re.match(r'05\d{8}', record.mobile) is None:
                raise ValidationError("Mobile number must start with '05' and must be 10 digits long.")
    

    def write(self, vals):
        if vals.get('contact_type') == 'customer': 
            for record in self:
                if not record.existing_account_number:
                    record.existing_account_number = self.env['ir.sequence'].next_by_code('pos_contact_fields.account_number_sequence')
                else:
                    record.account_number = record.existing_account_number
                    
        return super().write(vals)