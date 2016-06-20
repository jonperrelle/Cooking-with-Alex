app.config(function ($stateProvider) {
    $stateProvider.state('editUserRecipe', {
        url: '/users/:userId/edit-recipe/:recipeId',
        templateUrl: 'js/user-recipes/edit-user-recipe.html',
        controller:"EditUserRecipeCtrl",
    });
});

app.controller('EditUserRecipeCtrl', function ($scope, RecipesFactory, RecipeFactory, Session, $state, $stateParams) {
    // $scope.recipe = {};
    // $scope.recipe.ingredients = [];
    // $scope.recipe.directions = [];


    RecipeFactory.getOneRecipe($stateParams.recipeId)
    .then(function (recipe) {
        $scope.recipe = recipe
    })

    $scope.editRecipe = function () {
        RecipesFactory.editRecipe($stateParams.userId, $scope.recipe)
        .then(function(data) {
            $state.go('oneUserRecipe', {userId: data.userId, recipeId: data.recipeId});
        });
   };

    $scope.cancel = function () {
        $state.go("userRecipes", {userId: Session.user.id});
    };
});