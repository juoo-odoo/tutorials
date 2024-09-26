/** @odoo-module **/

import { Component, useState, useEffect, onWillStart } from "@odoo/owl";
import { DashboardItem } from "./DashboardItem/DashboardItem"
import { DashboardConfig } from "./config_dialog"
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";
import { _t } from "@web/core/l10n/translation";
import { browser } from "@web/core/browser/browser";
// import items from './DashboardItem/dashboard_items'

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem, DashboardConfig }

    setup() {
        this.action = useService('action');
        this.statistics = useService('awesome_dashboard.statistics');
        this.dashboard = useState(this.statistics.statistics)
        this.dashboardItems = []
        this._items = registry.category('awesomeDashboard').getAll()

        this.itemsToRemove = JSON.parse(browser.localStorage.getItem("dashboardConfig"));
        
        this.items = useState({ data: this._items });
        if (this.itemsToRemove) {
            this.items.data = this._items.filter(item => this.itemsToRemove[item.id])
        }

        onWillStart(async () => {
            // const result = await this.rpc("/awesome_dashboard/statistics")
            // this.dashboard = result
            let stats = await this.statistics.loadStatistics()
            this.dashboard.data = stats.data
        })
    }

    onConfigChange(newConfig) {
        this.items.data = this._items.filter(item => newConfig[item.id])
    }

    openCustomers() {
        this.action.doAction("base.action_partner_form")
    }

    showConfig() {
        this.env.services.dialog.add(DashboardConfig, {
            items: this._items,
            onClose: (e) => this.onConfigChange(e)
        });
        // this.action.doAction("awesome_dashboard.open_config")
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
