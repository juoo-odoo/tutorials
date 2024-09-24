/** @odoo-module **/

import { Component, useEffect, useRef, useState, xml } from "@odoo/owl";
import { useAutofocus } from "../utils/autofocus";
import { TodoItem } from "./TodoItem"

export class TodoList extends Component {
    static template = xml`
        <input t-ref="todoInput" placeholder="Add todo" t-on-keyup="addTodo"/>
        <t t-foreach="todos" t-as="i" t-key="i.id">
            <TodoItem removeTodo.bind="removeTodo" toggleState.bind="toggleState" id="i.id" description="i.description" isCompleted="i.isCompleted"/>
        </t>
    `;

    static components = { TodoItem };

    setup() {
        this.todoRef = useRef('todoInput');
        this.todos = useState(
            [{ id: 0, description: "buy tomato", isCompleted: true },
            { id: 1, description: "buy milk", isCompleted: false }]
        );
        this.numTodos = this.todos.length

        useAutofocus(this.todoRef)
    }

    addTodo(e) {
        if (e.key !== "Enter") {
            return
        }
        if (e.target.val === "") {
            return
        }

        this.todos.push({
            id: this.numTodos++,
            description: e.target.value,
            isCompleted: false
        })

        e.target.value = ""
    }

    removeTodo(id) {
        const index = this.todos.findIndex((elem) => elem.id === id);
        if (index >= 0) {
            // remove the element at index from list
            this.todos.splice(index, 1);
        }
        // This does not work becuase of OWL's reactivity system, which tracks mutations to the variable and not reassignments
        // this.todos = this.todos.filter(x => x.id !== id)
    }

    toggleState(id) {
        let idx = this.todos.findIndex(x => x.id === id)
        if (idx !== undefined) {
            this.todos[idx].isCompleted = !this.todos[idx].isCompleted
        }
    }
}