/** @odoo-module **/

import { Component, xml } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { _t } from "@web/core/l10n/translation";

export class NumberCard extends Component {
    static template = xml`
        <span class="card-title"><t t-out="props.title" /></span>
        <h1><t t-out="props.value"/></h1>
    `

    setup() {
        this.size = this.props.size || 1
    }
}