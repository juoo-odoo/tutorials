/** @odoo-module **/

import { useState, xml, markup, Component } from "@odoo/owl";
import { Counter } from "./components/Counter"
import { Card } from "./components/Card"
import { TodoList } from "./components/TodoList"

export class Playground extends Component {
    static template = "awesome_owl.playground";
    static components = { Counter, Card, TodoList };

    setup() {
        this.htmlVal = markup("<div style='background: red'>Hello World</div>")
        this.state = useState({ value: 0 })
    }

    increment() {
        this.state.value += 1
    }
}
