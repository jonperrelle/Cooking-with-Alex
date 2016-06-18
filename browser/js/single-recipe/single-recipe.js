app.config(function ($stateProvider) {
    $stateProvider.state('oneUserRecipe', {
        url: '/users/:userId/recipes/:recipeId',
        templateUrl: 'js/single-recipe/single-recipe.html',
        controller:"OneUserRecipeCtrl",
        resolve: {
        	oneRecipe: function (RecipeFactory, $stateParams) {
        		return RecipeFactory.getOneRecipe($stateParams.recipeId);
        	}
        }
    });
});

app.controller('OneUserRecipeCtrl', function ($scope, oneRecipe, RecipeFactory) {
	$scope.recipe = oneRecipe;
	$scope.user = oneRecipe.user;

	$scope.listIngredient = function () {
		RecipeFactory.listIngredient();
	};

	$scope.listDirection = function () {
		RecipeFactory.listDirection();
	};

	$scope.recordInstruction = function () {
		let inst = RecipeFactory.recordInstruction();
	}; 

	$scope.stopInstruction = function () {
		RecipeFactory.stopInstruction();
	};

	$scope.getCurrentInstruction = function () {
		$scope.instruction = RecipeFactory.getCurrentInstruction();
	};
});