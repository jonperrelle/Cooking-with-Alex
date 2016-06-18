app.config(function ($stateProvider) {
    $stateProvider.state('userRecipes', {
        url: '/users/:userId/recipes',
        templateUrl: 'js/user-recipes/user-recipes.html',
        controller:"UserRecipesCtrl",
        resolve: {
            userRecipes: function (RecipesFactory, $stateParams) {
                return RecipesFactory.getUserRecipes($stateParams.userId);
            }
        }
    });
});

app.controller('UserRecipesCtrl', function ($scope, userRecipes) {
    $scope.user = userRecipes[0].user
    $scope.userRecipes = userRecipes;
});