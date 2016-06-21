'use strict';

angular.module('confusionApp').controller('MenuController', ['$scope', 'menuService',
function($scope, menuService) {

	$scope.tab = 1;
	$scope.filtText = "";
	$scope.showDetails = false;
    $scope.showMenu=false;
    $scope.message="Loading ...";

    menuService.getDishes().query(
        function(response){
            $scope.dishes=response;
            $scope.showMenu=true;
        },
    function(response){
        $scope.message="Error: "+response.status+" "+response.statusText;
    });

	$scope.select = function(setTab) {
		$scope.tab = setTab;
		if (setTab === 1) {
			$scope.filtText = '';
		}
		if (setTab === 2) {
			$scope.filtText = 'appetizer';
		} else if (setTab === 3) {
			$scope.filtText = 'mains';
		} else if (setTab === 4) {
			$scope.filtText = 'dessert';
		}
	};

	$scope.isSelected = function(checkTab) {
		return ($scope.tab === checkTab);
	};

	$scope.toggleDetails = function() {
		$scope.showDetails = !$scope.showDetails;
	};

}]).controller('ContactController', ['$scope',
function($scope) {

	$scope.feedback = {
		mychannel : "",
		firstName : "",
		lastName : "",
		agree : false,
		email : "",
        id:""
	};
	var channels = [{
		value : "tel",
		label : "Tel."
	}, {
		value : "Email",
		label : "Email"
	}];
	$scope.channels = channels;
	$scope.invalidChannelSelection = false;
}]).controller('FeedbackController', ['$scope','contactService',
                                      function($scope,contactService) {
	$scope.sendFeedback = function() {
		console.log($scope.feedback);
		if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) {
			$scope.invalidChannelSelection = true;
			console.log('incorrect');
		} else {
			$scope.invalidChannelSelection = false;
            
       
            contactService.getFeedback().save($scope.feedback);
                                      
			$scope.feedback = {
				mychannel : "",
				firstName : "",
				lastName : "",
				agree : false,
				email : ""
			};
			$scope.feedback.mychannel = "";

			$scope.feedbackForm.$setPristine();
			console.log($scope.feedback);
		}
	};
}]).controller('DishDetailController', ['$scope', '$stateParams', 'menuService',
function($scope, $stateParams, menuService) {
    $scope.message="Loading ...";
    $scope.showDish=false;
    
   menuService.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
        function(response){ 
            $scope.dish=response;
            $scope.showDish=true;
        },
    function(response){
        $scope.message="Error: "+response.status+" "+response.statusText;
    });
    
	$scope.order = "";

}]).controller('DishCommentController', ['$scope','menuService',
function($scope,menuService) {

	$scope.comments = {
		name : "",
		rating : 5,
		comment : "",
		date : ""
	};

	$scope.submitComment = function() {

		//Step 2: This is how you record the dat "The date property of your JavaScript object holding the comment" = new Date().toISOString();
		$scope.comments.date = new Date();

		// Step 3: Push your comment into the dish's comment array
		$scope.dish.comments.push($scope.comments);
        menuService.getDishes().update({id:$scope.dish.id},$scope.dish);

		$scope.commentForm.$setPristine();

		//Step 5: reset your JavaScript object that holds your comment
		$scope.comments = {
			name : "",
			rating : 5,
			comment : "",
			date : ""
		};
	}
}])
.controller('IndexController',['$scope','menuService','corporateFactory',
function  ($scope,menuService,corporateFactory) {
    $scope.dishMessage="Loading ...";
    $scope.promotionMessage="Loading ...";
    $scope.showDish=false;
    $scope.showPromotion=false;
    $scope.leaderMessage="Loading ...";
    $scope.showLeader=false;
    
    
  menuService.getPromotions().get({id:0}).$promise.then(
        function(response){
            $scope.promotion=response;
            $scope.showPromotion=true;
        },
        function(response){
            $scope.promotionMessage="Error: "+response.status+" "+response.statusText;                       
        }
  );
    

 menuService.getDishes().get({id:0}).$promise.then(
        function(response){ 
            $scope.dish=response;
            $scope.showDish=true;
        },
    function(response){
        $scope.dishMessage="Error: "+response.status+" "+response.statusText;
    });
    
corporateFactory.getLeaders().get({id:0}).$promise.then(
        function(response){
            $scope.leader=response;
            $scope.showLeader=true;
        },
      function(response){
          $scope.leaderMessage="Error: "+response.status+" "+response.statusText;
      }
  )  

}])
.controller('AboutController',['$scope','corporateFactory',
function  ($scope,corporateFactory) {
   
    $scope.message = "Loading ...";
    $scope.showLeaders =false;
    
    corporateFactory.getLeaders().query(
        function(response){
            $scope.leaders=response;
            $scope.showLeaders=true;
        },
        function(response){
            $scope.message="Error: "+response.status+" "+response.statusText;
        }
    );
}])
// implement the IndexController and About Controller here
;
