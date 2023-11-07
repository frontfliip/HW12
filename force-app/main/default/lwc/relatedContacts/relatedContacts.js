import { LightningElement, api, wire, track } from 'lwc';
import getRelatedContactsByAccountId from '@salesforce/apex/ContactController.getRelatedContactsByAccountId';

export default class RelatedContacts extends LightningElement {

    @api recordId;
    @track isModalOpen = false;

    @wire(getRelatedContactsByAccountId, {accountId: '$recordId'})
    retrievedContacts;

    get contactData() {
        return this.retrievedContacts?.data;
    }

    createNewContact(event) {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
}