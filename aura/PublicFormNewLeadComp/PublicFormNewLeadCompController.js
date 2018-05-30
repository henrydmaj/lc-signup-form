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
        
        
	},
    
    fireRemoveFormEvent : function(component, event, helper){
    	var currCnt = component.get('v.count');
        var removeEvt = component.getEvent('removeFormEvent');
        
        console.log('current count before event fire: ' + currCnt);
        
        
        removeEvt.setParams(
            {
                'currentCnt' : (currCnt-2),
                'previousCnt' : --currCnt
            }
        );
        
        removeEvt.fire();
        
    },
})