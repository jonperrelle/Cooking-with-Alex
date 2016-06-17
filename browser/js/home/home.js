app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller:"HomeCtrl",
        resolve: {
        	allRecipes: function (RecipeFactory) {
        		return RecipeFactory.getAllRecipes();
        	}
        }
    });
});

app.controller('HomeCtrl', function ($scope, allRecipes) {
	$scope.recipes = allRecipes;
})