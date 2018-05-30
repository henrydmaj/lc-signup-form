({
    saveLeads : function(cmp, leadArr) {
        var action = cmp.get("c.createLeads");
        action.setParams({ newLeads : leadArr });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                
                if(res === 'SUCCESS'){
                    //alert('Contacts record successfully created!');
                    
                    cmp.set('v.message', 'Contacts record successfully created!');
                    cmp.set('v.showMessage', true);
                    cmp.set('v.showForm', false);
                    var uiMsgCmp = cmp.find('uiMsg');
                    
                    if(uiMsgCmp){
                        uiMsgCmp.set('v.severity', 'confirm');
                    }
                    
                }
                else{
                    //alert('Error during contact creation: ' + res);
                    //
                    
                    
                    cmp.set('v.message', res);
                    cmp.set('v.showMessage', true);
                    cmp.set('v.showForm', true);
                    var uiMsgCmp = cmp.find('uiMsg');
                    
                    if(uiMsgCmp){
                        uiMsgCmp.set('v.severity', 'error');
                    }
                }
                
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            
            cmp.set('v.showSpinner', false);
        });
        
        $A.enqueueAction(action);
    },
    
    missingInputs : function(lead){
        
        if(lead.FirstName && lead.LastName && lead.Company && lead.Email && lead.Phone)
            return false; 
        else
            return true;
    },
    
    displayErrorOnLeadForm : function(cmpErrArr, mainCmp){
        
        for(var i = 0; i < cmpErrArr.length; i++){
            if(cmpErrArr[i]){
                
                cmpErrArr[i].set('v.errMsg', 'Please fill out all fields');
                cmpErrArr[i].set('v.showMsg', true);
                
            }
        }
        
        mainCmp.set('v.showSpinner', false);
    },
    
    
})