/** @odoo-module **/

import { Component, useState, xml } from "@odoo/owl";

export class Card extends Component {
    // static props = ['title', 'text'];
    static template = "awesome_owl.card";

    setup() {
        this.state = useState({ isVisible: true })
    }

    toggleVisibility() {
        this.state.isVisible = !this.state.isVisible
    }
}