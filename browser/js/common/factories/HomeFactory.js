app.factory('HomeFactory', function ($http) {
    
	return {
		submitQuery: function (recipe) {
            return $http.get('api/search?recipe=' + recipe)
            .then(function(response) {
            	console.log(response.data);
            	return response.data
            })


        }
    };
});