describe("Controller:ContractController",function(){
    beforeEach(module('confusionApp'));
    
    var ContactController,scope;
    
    beforeEach(inject(function($controller,$rootScope){
        scope=$rootScope.$new();
        ContactController=$controller("ContactController",{$scope:scope});
    }));
    
    it("invalidChannelSelection is false",function(){
        expect(scope.invalidChannelSelection).toBeFalsy();
    });
    
    it("channels has 2 items",function(){
        expect(scope.channels.length).toBe(2);
    });
    
    it("channels has correct data",function(){
        expect(scope.channels[0].value).toBe("tel");
        expect(scope.channels[1].label).toBe("Email");
    });
    
    it("feedback is not initialized",function(){
       expect(scope.feedback.agree).toBeFalsy();
       expect(scope.feedback.firstName).toBe("");
    });
});
    