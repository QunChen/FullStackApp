describe("Controller: DishDetailController",function(){
    beforeEach(module("confusionApp"));
    
    //The problem is that $httpBackend.flush() triggers a broadcast which then triggers the otherwise case of the stateProvider.
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    
    var scope,$httpBackend,DishDetailController,stateParams
    
    beforeEach(inject(function($rootScope,_$httpBackend_,menuService,$controller){
        $httpBackend=_$httpBackend_;
        
        stateParams={id:0};
        
        $httpBackend.expectGET("http://localhost:3000/dishes/"+stateParams.id).respond(
            {
                "id": 0,
                "name": "Uthapizza",
                "image": "images/uthapizza.png",
                "category": "mains",
                "label": "Hot",
                "price": "4.99",
                "description": "A",
                "comments":[{}]
            });
        
        scope=$rootScope.$new();
        
        DishDetailController=$controller("DishDetailController",{
            $scope:scope,menuService:menuService,$stateParams:stateParams});
        
        $httpBackend.flush();
    }));
    
    
    it('should have the correct data in the dishes', function() {
        expect(scope.showDish).toBeTruthy();
        expect(scope.dish).toBeDefined();
        expect(scope.dish.name).toBe('Uthapizza');
        expect(scope.order).toBeFalsy();
    });
})