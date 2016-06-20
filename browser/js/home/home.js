app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller:"HomeCtrl",
        resolve: {
        	allRecipes: function (RecipesFactory) {
        		return RecipesFactory.getAllRecipes();
        	}
        }
    });

    $stateProvider.state('login', {
        url: '/login',
        template: '<login-form></login-form>' 
    });

    $stateProvider.state('signup', {
        url: '/signup',
        template: '<signup-form></signup-form>' 
    });   
});

app.controller('HomeCtrl', function ($scope, allRecipes, Session) {
	$scope.recipes = allRecipes;
    $scope.user = Session.user;
})