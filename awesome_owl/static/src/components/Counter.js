/** @odoo-module **/

import { Component, useState, xml } from "@odoo/owl";

export class Counter extends Component {
    static template = xml`
        <p>Counter: <t t-esc="state.value"/></p>
        <button class="btn btn-primary" t-on-click="increment">Increment</button>
    `;

    setup() {
        this.state = useState({ value: 0 });
    }

    increment() {
        this.state.value++;
        this.props.callback();
    }
}