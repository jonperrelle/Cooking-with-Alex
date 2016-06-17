app.config(function ($stateProvider) {
    $stateProvider.state('oneRecipe', {
        url: '/recipes/:recipeId',
        templateUrl: 'js/single-recipe/single-recipe.html',
        controller:"OneRecipeCtrl",
        resolve: {
        	oneRecipe: function (RecipeFactory, $stateParams) {
        		return RecipeFactory.getOneRecipe($stateParams.recipeId);
        	}
        }
    });
});

app.controller('OneRecipeCtrl', function ($scope, oneRecipe, RecipeFactory) {
	$scope.recipe = oneRecipe;

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