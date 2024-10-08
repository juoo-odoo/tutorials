/** @odoo-module **/


import { patch } from "@web/core/utils/patch";
import { ProductCard } from "@point_of_sale/app/generic_components/product_card/product_card"

// extend static props to accept the props we need
ProductCard.props = {
    
}
patch(ProductCard, {
    props: {
        ...ProductCard.props,
        internalReference: { String, optional: true, default: false },
        quantitySold: { String, optional: true }
    }
  });