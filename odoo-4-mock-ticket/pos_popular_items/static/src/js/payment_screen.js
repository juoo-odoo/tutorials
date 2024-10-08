/** @odoo-module **/


import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen"

patch(PaymentScreen.prototype, {
    async afterOrderValidation(suggestToSync = true) {
        const res = await super.afterOrderValidation(suggestToSync)
        
        // update qty_sold on the frontend
        this.currentOrder.orderlines.forEach(orderline => {
            const productId = orderline.product.id;
            this.pos.db.product_by_id[productId].qty_sold = this.pos.db.product_by_id[productId].qty_sold + orderline.quantity
        })
        
        // # attempt 2: orm can't call private functions
        // const loadedData = await this.orm.silent.call("pos.session", "_load_model", ['product.product']);
        // this.pos._loadProductProduct(loadedData)
        return res
    }
  });

   
        