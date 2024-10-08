from odoo import api, fields, models
import functools

class ProductProduct(models.Model):
    _inherit = "product.product"
    
    qty_sold = fields.Integer(compute="_compute_qty_sold")
    product_ids = fields.One2many("pos.order.line", "product_id")

    @api.depends("product_ids")
    def _compute_qty_sold(self):
        for record in self:
            if len(record.product_ids) == 0:
                record.qty_sold = 0
                continue
            
            record.products_ids.mapped("qty")
            record.qty_sold = functools.reduce(lambda a, b: a + b.qty, record.product_ids, 0)

class ProductTemplate(models.Model):
    _inherit = "product.template"
    
    qty_sold = fields.Integer(compute="_compute_qty_sold")

    @api.depends("product_variant_ids", "is_product_variant", "product_variant_id")
    def _compute_qty_sold(self):
        for record in self:
            record.qty_sold = functools.reduce(lambda a, b: a + b.qty_sold, record.product_variant_ids, 0)