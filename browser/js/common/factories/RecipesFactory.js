
app.factory('RecipesFactory', function ($http) {

	return {
		getAllRecipes: function () {
	        return $http.get('/api/recipes')
	        .then(function(response) {
	            return response.data;
	        });
    	},

    	getUserRecipes: function (id) {
    		return $http.get('/api/users/' + id + '/recipes')
    		.then(function(response) {
    			return response.data;
    		});
    	},

    	addRecipe: function(id, recipe) {
    		return $http.post('api/users/' + id + '/recipes', recipe)
    		.then(function(response) {
    			return response.data;
    		})
    	},

        editRecipe: function(userId, recipe) {
            return $http.put('api/users/' + userId + '/recipes/' + recipe.id, recipe)
                .then(function(response) {
                    return response.data;
                })
        }
    };
})



