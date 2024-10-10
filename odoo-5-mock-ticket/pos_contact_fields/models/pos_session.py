from odoo import api, fields, models


class PosSession(models.Model):
    _inherit = "pos.session"

    def _loader_params_res_partner(self):
        res = super()._loader_params_res_partner()
        res['search_params']['fields'].extend(['first_name', 'last_name', 'account_number', 'contact_type'])
        return res

    def _get_partners_domain(self):
        res = super()._get_partners_domain()
        res.append(('contact_type', '=', 'customer'))
        return res

    def _get_pos_ui_res_partner(self, params):
        res = super()._get_pos_ui_res_partner(params)
        # you could iterate through the list,
        # O(n)
        # for partner in res,
        # append to arr if partner. 
        
        # O(2n)
        res = list(filter(lambda r: r.get('contact_type', '') == 'customer', res))

        return res#