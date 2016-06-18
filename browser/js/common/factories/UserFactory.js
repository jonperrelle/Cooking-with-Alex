app.factory('UserFactory', function ($http) {
    
	return {
		getUser: function (id) {
            return $http.get('/api/users/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    };
});