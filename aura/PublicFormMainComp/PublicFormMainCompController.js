({
	handleAddLeadEvent : function(component, event, helper) {
		console.log('handling add form event');
        var newCnt = event.getParam("newCount");
        component.set('v.showSpinner', true);
        
        $A.createComponent(
            "c:PublicFormNewLeadComp",
            {
                "aura:id": "cntFrm" + newCnt,
                "count": newCnt,
                "showRemoveLeadBtn" : true
            },
            function(newContFrm, status, errorMessage){
                //Add the new button to the body array
                if (status === "SUCCESS") {
                    console.log('success');
                    var body = component.get("v.body");
                    body.push(newContFrm);
                    component.set("v.body", body);
                    var contactCnt = component.get('v.personCnt');
                    component.set('v.personCnt', ++contactCnt);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                    // Show offline error
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                    // Show error message
                }
                
                component.set('v.showSpinner', false);
            }
        );
        
	},
    
    saveLeadsClick : function(component, event, helper){
        
        component.set('v.showSpinner', true);
        
    	var leadArr = new Array();
        var cmpErrArr = new Array();
        console.log(leadArr);
        
        var totalNumOfLeads = component.get('v.personCnt');
        
        
        for(var i = 1; i <= totalNumOfLeads; i++){
            var leadFrmCmp = component.find('cntFrm' + i);
            
            if(leadFrmCmp){
                
                var newLead = leadFrmCmp.get('v.newLead');
                
                if(newLead){
                    if(!helper.missingInputs(newLead))
                    	leadArr.push(newLead);
                    else{
                        cmpErrArr.push(leadFrmCmp);
                    }
                }
                
            }
        }
        
        if(cmpErrArr.length > 0){
            helper.displayErrorOnLeadForm(cmpErrArr, component);
        }
        else if(leadArr.length > 0){
            helper.saveLeads(component, leadArr);
        }
        
        
    },
})