/* @odoo-module */

import { reactive } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions"

const SECOND_IN_MS = 1000

export const statisticsService = {
    dependencies: ['rpc'],

    start(env, { rpc }) {
        // reactive tracks changes in an obj/arr
        let statistics = reactive({ data: {} })

        var timer;

        const loadStatistics = async () => {
            let stats = await rpc("/awesome_dashboard/statistics")
            statistics.data = stats

            timer = setTimeout(() => {
                loadStatistics();
            }, 5 * SECOND_IN_MS)
            return statistics
        }


        return { statistics, loadStatistics }
    },
};

registry.category("services").add("awesome_dashboard.statistics", statisticsService);
