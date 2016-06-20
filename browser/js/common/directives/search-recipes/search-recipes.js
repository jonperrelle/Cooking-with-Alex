
app.directive('searchRecipes', function ($state, SearchFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/search-recipes/search-recipes.html',
        scope: { },
        link: function(scope, element) {

            scope.submitQuery = function (recipe) {
		        SearchFactory.submitQuery(recipe)
		        .then(function (data) {
		            $state.go('searchRecipes', {recipeQuery: recipe, results: data.results})
		        });
		    };

            element.on('keyup', function (e) {
                if (e.which === 13) {
                    scope.submitQuery(scope.recipe)
                }
            })
        }
    };
});













