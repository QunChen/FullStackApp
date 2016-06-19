'use strict';

angular.module('confusionApp').controller('MenuController', ['$scope', 'menuFactory',
function($scope, menuFactory) {

	$scope.tab = 1;
	$scope.filtText = "";
	$scope.showDetails = false;

	$scope.dishes = menuFactory.getDishes();

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
		email : ""
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
}]).controller('FeedbackController', ['$scope',
function($scope) {
	$scope.sendFeedback = function() {
		console.log($scope.feedback);
		if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) {
			$scope.invalidChannelSelection = true;
			console.log('incorrect');
		} else {
			$scope.invalidChannelSelection = false;
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

	var dish = menuService.getDish(parseInt($stateParams.id, 10));
	$scope.dish = dish;
	$scope.order = "";

}]).controller('DishCommentController', ['$scope',
function($scope) {

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

		$scope.commentForm.$setPristine();

		//Step 5: reset your JavaScript object that holds your comment
		$scope.comments = {
			name : "",
			rating : 5,
			comment : "",
			date : ""
		};
	}
}]);
