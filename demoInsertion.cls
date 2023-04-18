public with sharing class DemoInsertionClass {
    @AuraEnabled(cacheable=false)
    public static Resource__c insertResourceRecord(Resource__c resourceData){
        try {
            system.debug('resourceData '+resourceData);
            insert resourceData;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    return resourceData;
    }

    @AuraEnabled
    public static Resource_Detail__c insertResourceDetailRecord(Resource_Detail__c rdData, Id resDetId){
        try {
            rdData.Resource__c = resDetId;
            insert rdData;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    return rdData;
    }
}
