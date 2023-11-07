 import { LightningElement, api, wire } from 'lwc';
 import { createRecord } from "lightning/uiRecordApi";
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
 import CONTACT_OBJECT from '@salesforce/schema/Contact'
 import PHONE_FIELD from "@salesforce/schema/Contact.Phone";
 import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
 import LASTNAME_FIELD from "@salesforce/schema/Contact.LastName";
 import TITLE_FIELD from "@salesforce/schema/Contact.Title";
 import ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";
 
 export default class NewContact extends LightningElement {
 
     @api accountId;
 
     name;
     title;
     phone;
     email;
     
 
     get isSubmitDisabled() {
         return !(this.name && this.title && this.phone && this.email);
     }
 
     closeModal() {
         this.name = null;
         this.email = null;
         this.title = null;
         this.phone = null;

 
         this.dispatchEvent(new CustomEvent('closemodal', {}));
     }
 
     handleNameChange(event) {
         this.name = event.target.value;
     }
 
     handleTitleChange(event) {
         this.title = event.target.value;
     }
 
     handlePhoneChange(event) {
         this.phone = event.target.value;
     }

     handleEmailChange(event) {
        this.email = event.target.value;
    }
 
     submitDetails(event) {
         const fields = {};
         fields[LASTNAME_FIELD.fieldApiName] = this.name;
         fields[PHONE_FIELD.fieldApiName] = this.phone;
         fields[EMAIL_FIELD.fieldApiName] = this.email;
         fields[TITLE_FIELD.fieldApiName] = this.title;
         fields[ACCOUNT_FIELD.fieldApiName] = this.accountId;
 
         const recordInput = {apiName: CONTACT_OBJECT.objectApiName, fields};
         createRecord(recordInput)
             .then(newContact => {
                 this.closeModal();
                 this.dispatchEvent(
                     new ShowToastEvent({
                         title: 'Success',
                         message: 'Contact successfully created!',
                         variant: 'success',
                     }),
                 );
             })
             .catch(error => {
                 this.dispatchEvent(
                     new ShowToastEvent({
                         title: 'Error creating record',
                         message: error.body.message,
                         variant: 'error',
                     }),
                 );
             })
     }
 }