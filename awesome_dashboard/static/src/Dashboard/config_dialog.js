/** @odoo-module **/

import { Component, useState, xml, useEffect, onWillStart } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

import { browser } from "@web/core/browser/browser";
import { _t } from "@web/core/l10n/translation";
// import items from './DashboardItem/dashboard_items'

export class DashboardConfig extends Component {
    static template = xml`
            <Dialog size="'md'">
                <h2>Dashboard Config</h2>
                <p>Check the dashboard items that you wish to see</p>
                <t t-foreach="props.items" t-key="item.id" t-as="item">
                    <div>
                        <input style="margin-right: 5px" t-att-id="item.id" type="checkbox" t-att-checked="checked[item.id]" t-on-change="toggleCheckbox"/>
                        <label t-att-for="item.id">
                            <t t-esc="item.description"/>
                        </label>
                    </div>
                </t>
                <t t-set-slot="footer">
                    <button class="btn btn-primary" t-on-click="onClickConfirm">
                        Apply
                    </button>
                </t>
            </Dialog>
        `;
    static components = { Dialog }

    toggleCheckbox(e) {
        this.checked[e.target.id] = !this.checked[e.target.id]
    }

    onClickConfirm(e) {
        browser.localStorage.setItem("dashboardConfig", JSON.stringify(this.checked))
        this.props.onClose(this.checked) // callback fn
        this.props.close()
    }
    

    setup() {
        this.checked = JSON.parse(browser.localStorage.getItem("dashboardConfig"));

        // try getting the stored dashboardConfig, if it doesn't exist, we default to all checked
        if (!this.checked) {
            this.checked = useState(this.props.items.reduce((a, v) => { return { ...a, [v.id]: true } }, {}))
        }

        this.localStorage = browser.localStorage
        console.log(this.checked)
    }
}


