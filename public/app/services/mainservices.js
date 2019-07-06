(function() {
    'use strict';

    hexapot.factory('mainService', Service);

    function Service($http, $q) {
        var service = {};

        service.signup = signup;
        service.savePassword = savePassword;
        service.login = login;

        return service;

        function signup(data) {
            return $http.post('/signup', data).then(handleSuccess, handleError);
        }

        function savePassword(data) {
            return $http.post('/savePassword', data).then(handleSuccess, handleError);
        }

        function login(data) {
            return $http.post('/login', data).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();