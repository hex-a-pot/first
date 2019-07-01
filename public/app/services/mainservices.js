(function() {
    'use strict';

    hexapot.factory('mainService', Service);

    function Service($http, $q) {
        var service = {};
        service.login = login;

        return service;

        function savelogin(data) {
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