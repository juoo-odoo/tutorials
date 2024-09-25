/** @odoo-module **/

import { Component, xml } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { _t } from "@web/core/l10n/translation";

export class DashboardItem extends Component {
    static template = xml`
        <div class="card d-inline-block m-2" t-attf-style="width: #{18 * size}rem;">
            <div class="card-body d-flex flex-column align-items-center">
                <t t-slot="default"/>
            </div>
        </div>
    `

    setup() {
        this.size = this.props.size || 1
    }
}