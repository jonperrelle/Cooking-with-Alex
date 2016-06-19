app.factory('HomeFactory', function ($http) {
    
	return {
		submitQuery: function (recipe) {
            return $http.get('api/search?recipe=' + recipe)
            .then(function(response) {
            	console.log(response.data);
            	return response.data
            });
        },

        getRecipeDetails: function (recipeId) {
        	return $http.get('api/search/' + recipeId)
        	.then(function(response) {
        		return response.data;
        	});
        }
    };
});