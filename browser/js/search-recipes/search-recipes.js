app.config(function ($stateProvider) {
    $stateProvider.state('searchRecipes', {
        url: '/searchRecipes?recipeQuery',
        templateUrl: 'js/search-recipes/search-recipes.html',
        controller:"SearchRecipesCtrl",
        params: {
            results: null
        }
    });

    $stateProvider.state('searchRecipes.details', {
        url: '/:recipeId',
        views: {
            '@': {
                template: "<div ui-view='details'></div>"
            },
            'details@searchRecipes.details': {
                templateUrl: 'js/search-recipes/search-recipes-details.html',
                controller:"SearchRecipesDetailsCtrl"
            }
        }
    });
});

app.controller('SearchRecipesCtrl', function ($scope, $stateParams) {
    console.log($stateParams.results)
    $scope.results = $stateParams.results;   
});

app.controller('SearchRecipesDetailsCtrl', function ($scope, $stateParams, SearchFactory, RecipesFactory, Session, $state) {
    $scope.recipe = {};
    var re = /\<\/?li\>/g;
    SearchFactory.getRecipeDetails($stateParams.recipeId)
    .then(function(data) {
        console.log(data);
        $scope.recipe.sourceUrl = data.sourceUrl;
        $scope.recipe.imageUrl = "https://spoonacular.com/recipeImages/" + data.image;
        $scope.recipe.title = data.title;
        $scope.recipe.ingredients = data.extendedIngredients.map( i => i.originalString);
        console.log(data.instructions);
        $scope.recipe.directions = data.instructions.split(/\n/).filter( a => a.match(/(\<li\>)/g)).map( b => b.replace(re, ""));
    });

    $scope.addRecipe = function () {
        let user = Session.user;
        RecipesFactory.addRecipe(user.id, $scope.recipe)
        .then(function(data) {
            $state.go('oneUserRecipe', {userId: data.userId, recipeId: data.id});
        });
   };

    $scope.cancel = function () {
        $state.go('^');
    }
});