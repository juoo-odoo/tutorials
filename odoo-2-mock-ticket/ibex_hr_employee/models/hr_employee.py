from odoo import api, fields, models

class HrEmployee(models.Model):
    _inherit = "hr.employee"

    sequence_type = fields.Selection([('staff', 'Staff'), ('inhouse', 'In-House'), ('outsourced', 'Outsourced')])

    sequences_dict = fields.Json(readonly=True, default=dict)
    sequence = fields.Char(readonly=True, compute="_compute_sequence_from_dict")

    # sequence = fields.Char(readonly=True)

    def get_sequence_id(self, sequence_type):
        sequence_map = {
            'staff': 'ibex.hr.spaso_sequence',
            'inhouse': 'ibex.hr.inhouse_sequence',
            'outsourced': 'ibex.hr.outsource_sequence'
        }

        return sequence_map[sequence_type]

    @api.depends('sequence_type')
    def _compute_sequence_from_dict(self):
        for record in self:
            record.sequence = record.sequences_dict and record.sequences_dict.get(self.sequence_type, "") or ''


    # Q: Ask Abishek how to handle existing rows that do not have the new fields we created. sequences_dict is not a dict 
    # when you try to update existing rows with new code
    @api.model_create_multi
    def create(self, vals):
        res = super().create(vals)
        for record in res:
            record.sequence = self.env['ir.sequence'].next_by_code(record.get_sequence_id(record.sequence_type))
            record.sequences_dict = { record.sequence_type: record.sequence }

        return res
   
    # [5,4,2].write
    def write(self, vals):
        # sequence type changed
        if vals.get('sequence_type'): 
            sequence_type = vals.get('sequence_type')
            seq_dict = self.sequences_dict
            # check if this employee already have an exsiting sequence for this sequence type ('staff','outsource' etc)
            if self.sequences_dict and self.sequences_dict.get(sequence_type):
                vals['sequence'] = self.sequences_dict.get(sequence_type)
            else: # else, we generate the next step for the sequence, and store it in th edict
                vals['sequence'] = self.env['ir.sequence'].next_by_code(self.get_sequence_id(sequence_type))
                vals['sequences_dict'] = self.sequences_dict or {} # fallback for existing rows
                vals['sequences_dict'][sequence_type] = vals['sequence']
        return super().write(vals)