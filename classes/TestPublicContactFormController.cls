@isTest
private class TestPublicContactFormController {
    
    private static testMethod void testCreateLeads(){
        List<Lead> testLeads = new List<Lead>();
        List<Lead> testFailLeads = new List<Lead>();
        String resultMsg;
        
        for(Integer i = 0; i < 20; i++){
            testLeads.add(new Lead(FirstName = 'TestLead' + i, LastName = 'TestLead' + i, 
                                   Email = 'testlead' + i + '@testlead.com', Phone='555-555-5555', Company='TestCompany'));
            
            testFailLeads.add(new Lead(FirstName = 'TestLead' + (i+30), LastName = 'TestLead' + (i+30), 
                                   Email = 'testlead', Phone='555-555-5555', Company='TestCompany'));
        }
        
        
        Test.startTest();
        resultMsg = PublicContactFormController.createLeads(testLeads);
        
        system.assertEquals('SUCCESS', resultMsg, 'Lead records should have been created without errors');
        
        resultMsg = PublicContactFormController.createLeads(testFailLeads);
        
        system.assertEquals(true, resultMsg.contains('email'), 'Lead records with invalid email should result in dml exception occurring');
        
        Test.stopTest();
    }

}