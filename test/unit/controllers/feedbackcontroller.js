describe("Controller: FeedbackController",function(){
    beforeEach(module("confusionApp"));
    
    //The problem is that $httpBackend.flush() triggers a broadcast which then triggers the otherwise case of the stateProvider.
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    
    var FeedbackController,scope,$httpBackend;
    
    beforeEach(inject(function($controller,_$httpBackend_,$rootScope,contactService){
        $httpBackend=_$httpBackend_;

        scope=$rootScope.$new();   
        
        scope.feedbackForm = {
            $valid: true,
            $setPristine: jasmine.createSpy('$setPristine')
        };
       
        FeedbackController=$controller("FeedbackController",{$scope:scope,contactService:contactService});  
        
    }));
    
    describe("valid feedback",function(){
        
        beforeEach(function(){
            scope.feedback={
                agree:true,
                mychannel:"test"
            };
            

            $httpBackend.expectPOST("http://localhost:3000/feedback",scope.feedback).respond(201,'');

            scope.sendFeedback();       

            $httpBackend.flush();
        })
        
    it("invalidChannelSelection is false",function(){
        expect(scope.invalidChannelSelection).toBeFalsy();
    });
    
    it("feedback is not initialized",function(){
        expect(scope.feedback.agree).toBeFalsy();
        expect(scope.feedback.firstName).toBe("");
    });
    
    it("feedback form is pristine",function(){
        expect(scope.feedbackForm.$setPristine).toHaveBeenCalledWith();
    });

    });
    
    describe("invalid feedback",function(){
        beforeEach(function(){
            scope.feedback={
                agree:true,
                mychannel:""
            };
            scope.sendFeedback();
        });
                   
        it("invalidChannelSelection is true",function(){
            expect(scope.invalidChannelSelection).toBeTruthy();
        });
    });
    
});