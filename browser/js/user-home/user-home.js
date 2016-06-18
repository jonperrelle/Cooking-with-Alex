app.config(function ($stateProvider) {
    $stateProvider.state('userHome', {
        url: '/users/:userId',
        templateUrl: 'js/user-home/user-home.html',
        controller:"UserHomeCtrl",
        resolve: {
            userRecipes: function (RecipesFactory, $stateParams) {
                return RecipesFactory.getUserRecipes($stateParams.userId);
            }
        }
    });
});

app.controller('UserHomeCtrl', function ($scope, userRecipes) {
    $scope.user = userRecipes[0].user
    $scope.userRecipes = userRecipes;
});