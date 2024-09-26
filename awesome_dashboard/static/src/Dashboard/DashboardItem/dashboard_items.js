/** @odoo-module **/

import { registry } from "@web/core/registry";
import { NumberCard } from './NumberCard'
import { PieChartCard } from './PieChartCard'

const items = [{
    id: "average_quantity",
    description: "Average amount of t-shirt",
    Component: NumberCard,
    // size and props are optionals
    props: (data) => ({
       title: "Average amount of t-shirt by order this month",
       value: data.average_quantity
    })
}, {
    id: "orders_by_size",
    description: "Pie chart of shirt sizes",
    Component: PieChartCard,
    // size and props are optionals
    size: 1,
    props: (data) => ({
       title: "Pie chart of shirt sizes",
       value: data.orders_by_size
    })
}, {
    id: "average_time",
    description: "Average time for an order to be sent from order creation",
    Component: NumberCard,
    // size and props are optionals
    props: (data) => ({
       title: "Average time for an order to be sent",
       value: data.average_time
    })
}, {
    id: "nb_cancelled_orders",
    description: "Number of cancelled orders this month",
    Component: NumberCard,
    // size and props are optionals
    props: (data) => ({
       title: "Number of cancelled orders this month",
       value: data.nb_cancelled_orders
    })
}, {
    id: "nb_new_orders",
    description: "Number of new orders",
    Component: NumberCard,
    // size and props are optionals
    props: (data) => ({
       title: "Number of new orders this month",
       value: data.nb_new_orders
    })
}, {
    id: "total_amount",
    description: "Total number of orders",
    Component: NumberCard,
    // size and props are optionals
    props: (data) => ({
       title: "Total number of orders this month",
       value: data.total_amount
    })
}];

export default items

const awesomeDashboardRegistry = registry.category("awesomeDashboard")

items.forEach((item) => {
    awesomeDashboardRegistry.add(item.id, item)
})