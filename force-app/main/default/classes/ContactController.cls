public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContactsByAccountId(Id accountId) {
        List<Contact> contacts = [SELECT Name, Title, Email, Phone
                                  FROM Contact
                                  WHERE AccountId = :accountId];
        return contacts;
    }
}
