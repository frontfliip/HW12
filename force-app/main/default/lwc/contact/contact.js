import { LightningElement, api } from 'lwc';

export default class Contact extends LightningElement {

    @api contact;

    get name() {
        return this.contact?.Name;
    }

    get title() {
        return this.contact?.Title;
    }

    get email() {
        return this.contact?.Email;
    }

    get phone() {
        return this.contact?.Phone;
    }
}