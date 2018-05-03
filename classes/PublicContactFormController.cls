public with sharing class PublicContactFormController {
   
    @AuraEnabled
    public static String createLeads(List<Lead> newLeads){
        String msg = '';
        
        try{
            insert newLeads;
            msg = 'SUCCESS';
        }catch(DMLException insEx){
            for(Integer i = 0; i < insEx.getNumDml(); i++){
            	msg += insEx.getDmlMessage(i) + '\n';   
            }
        }
        return msg;        
    }
}