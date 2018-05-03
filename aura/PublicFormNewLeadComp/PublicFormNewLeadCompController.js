({
	fireAddFormEvent : function(component, event, helper) {
		var currCnt = component.get('v.count');
        var cmpEvent = component.getEvent("addFormEvent");
        component.set('v.showAddLeadBtn', false);
        
        cmpEvent.setParams(
            {
            "newCount" : ++currCnt 
        	}
        );
        cmpEvent.fire();
        
        
	}
})