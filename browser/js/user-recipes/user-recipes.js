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

app.controller('UserRecipesCtrl', function ($scope, userRecipes, UserFactory, $stateParams) {
    if (userRecipes.length) {
        $scope.noRecipes = false;
        $scope.user = userRecipes[0].user
        $scope.userRecipes = userRecipes;
    }
    else {
        $scope.noRecipes = true;
        UserFactory.getUser($stateParams.userId)
        .then(function(data) {
            $scope.user = data;
        })
    }
    
});