/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { PartnerDetailsEdit } from "@point_of_sale/app/screens/partner_list/partner_editor/partner_editor"

patch(PartnerDetailsEdit.prototype, {
    setup() {
        super.setup()
        const partner = this.props.partner
        this.changes = {
            ...this.changes,
            first_name: partner.first_name,
            last_name: partner.last_name,
            account_number: partner.account_number,
            contact_type: partner.contact_type && partner.contact_type[0],
        }
        debugger
        this.partnerDetailsFields = {
            ...this.partnerDetailsFields,
            first_name: _t('First Name'),
            last_name: _t('Last Name'),
            account_number: _t('Account Number')
        }
    }
});