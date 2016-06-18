app.directive('userRecipeHeader', function ($state, AuthService, UserFactory, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/user-recipe-header/user-recipe-header.html',
        scope: { 
            viewRecipes: '@',
            button: '@'
         },
        link: function(scope) {
        	UserFactory.getUser($stateParams.userId)
            .then(function (user) {
                scope.user = user;
            });

            scope.addOrViewRecipes = function () {
                $state.go(scope.viewRecipes, {userId: scope.user.id})
            }
        }
    };
});