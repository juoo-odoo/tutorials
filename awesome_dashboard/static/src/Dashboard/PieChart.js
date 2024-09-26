/** @odoo-module **/

import { Component, useRef, useEffect, onWillStart, xml } from "@odoo/owl";
import { loadJS } from "@web/core/assets"

export class PieChart extends Component {
    static props = ['data']
    static template = xml`
        <canvas t-ref="tshirt-chart" width="400" height="400" />
    `

    setup() {
        this.chartRef = useRef("tshirt-chart")

        onWillStart(async () => {
            await loadJS("/web/static/lib/Chart/Chart.js");
        })

        let curChart;

        useEffect(
            () => {
                if (!this.chartRef.el) return;

                const { s, m, l, xl } = this.props.data

                if (curChart) curChart.destroy();

                curChart = new Chart(this.chartRef.el, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: [s, m, l, xl]
                        }],
                        labels: ['s', 'm', 'l', 'xl']
                    },
                    options: {}
                });
            },
            () => [this.chartRef.el, curChart, this.props.data]
        );
        this.size = this.props.size || 1
    }
}