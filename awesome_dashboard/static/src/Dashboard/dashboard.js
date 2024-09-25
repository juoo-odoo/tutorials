/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { DashboardItem } from "./DashboardItem/DashboardItem"
import { PieChart } from "./PieChart"
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";
import { _t } from "@web/core/l10n/translation";

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem, PieChart }

    setup() {
        this.action = useService('action');
        this.statistics = useService('awesome_dashboard.statistics');
        this.dashboard = useState(this.statistics.statistics)
        onWillStart(async () => {
            // const result = await this.rpc("/awesome_dashboard/statistics")
            // this.dashboard = result
            let stats = await this.statistics.loadStatistics()
            this.dashboard.data = stats.data
        })
    }

    openCustomers() {
        this.action.doAction("base.action_partner_form")
    }

    openLeads() {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: _t('Leads'),
            target: 'current',
            // res_id: activity.res_id,
            res_model: 'crm.lead',
            views: [[false, 'form'], [false, 'tree']],
        });
    }
}

registry.category("lazy_components").add("awesome_dashboard.dashboard", AwesomeDashboard);
// registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);
