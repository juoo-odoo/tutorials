/** @odoo-module **/

import { Component, useState, xml } from "@odoo/owl";

export class TodoItem extends Component {
    static props = ['id', 'description', 'isCompleted', 'toggleState', 'removeTodo']
    static template = xml`
        <div t-att-class="props.isCompleted ? 'text-muted text-decoration-line-through' : ''">
            <input t-att-id="props.id" type="checkbox" t-on-change="toggleCheckbox" t-att-checked="props.isCompleted"/>
            <label t-att-for="props.id">
                <t t-esc="props.id"/>: 
                <t t-esc="props.description"/>
            </label>
            <span t-on-click="removeTodo" class="fa fa-trash"/>
        </div>
    `;

    toggleCheckbox(e) {
        this.props.toggleState(this.props.id)
    }

    removeTodo(e) {
        this.props.removeTodo(this.props.id)
    }
}

