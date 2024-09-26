/** @odoo-module **/

import { Component, useRef, useEffect, onWillStart, xml } from "@odoo/owl";
import { loadJS } from "@web/core/assets"

export class PieChartCard extends Component {
    static props = ['title', 'value']
    static template = xml`
        <span class="card-title"><t t-out="props.title" /></span>
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
                console.log(this.props)
                if (!this.chartRef.el) return;

                const { s, m, l, xl } = this.props.value

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
            () => [this.chartRef.el, curChart, this.props.value]
        );
        this.size = this.props.size || 1
    }
}