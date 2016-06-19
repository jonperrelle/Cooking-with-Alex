app.directive('userRecipeHeader', function ($state, RecipeFactory, UserFactory, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/user-recipe-header/user-recipe-header.html',
        scope: { 
            viewRecipes: '@',
            button: '@',
            edit: '@'
         },
        link: function(scope) {

            scope.userId = $stateParams.userId;
            scope.recipeId = $stateParams.recipeId || null

            scope.addOrViewRecipes = function () {
                $state.go(scope.viewRecipes, {userId: $stateParams.userId});
            };
        }
    };
});