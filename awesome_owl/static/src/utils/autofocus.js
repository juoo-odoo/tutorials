/** @odoo-module **/

import { Component, useEffect, useRef, useState, xml } from "@odoo/owl";


export function useAutofocus(ref) {
    useEffect(() => {
        if (ref.el) ref.el.focus();
    }, () => [ref.el])

    return ref;
}