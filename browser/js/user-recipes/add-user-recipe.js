app.config(function ($stateProvider) {
    $stateProvider.state('addUserRecipe', {
        url: '/users/:userId/add-recipe',
        templateUrl: 'js/user-recipes/add-user-recipe.html',
        controller:"AddUserRecipeCtrl",
    });
});

app.controller('AddUserRecipeCtrl', function ($scope, RecipesFactory, Session, $state) {
    $scope.recipe = {};
    $scope.recipe.ingredients = [];
    $scope.recipe.directions = [];


    $scope.addRecipe = function () {
        let user = Session.user;
        RecipesFactory.addRecipe(user.id, $scope.recipe)
        .then(function(data) {
            $state.go('oneUserRecipe', {userId: data.userId, recipeId: data.id});
        });
   };

    $scope.cancel = function () {
        $state.go("userHome", {userId: Session.user.id});
    };
});