hexapot.controller('signupcontroller', ['$scope', 'mainService', function($scope, mainService) {

    $scope.signup = function(signupdata) {
        console.log(signupdata);
        mainService.signup(signupdata)
            .then(function(response) {

            })
            .catch(function(error) {

            })
    }
}])
hexapot.controller('createAdminPasswordController', ['$scope', '$state', '$stateParams', 'mainService', function($scope, $state, $stateParams, mainService) {


    $scope.savePassword = function(data) {
        console.log(data);
        if (data.confirmPassword == data.password) {
            data.token = $stateParams.token;
            mainService.savePassword(data)
                .then(function(response) {
                    $state.go('home');
                })
                .catch(function(error) {});
        } else {

        }

    }
}])
hexapot.controller('loginController', ['$scope', '$state', 'mainService', 'userAuth', function($scope, $state, mainService, userAuth) {


    $scope.login = function(data) {
        mainService.login(data)
            .then(function(response) {
                console.log(response);
                var user = {};
                user.access_token = response.token;
                userAuth.setCurrentUser(user);
                $state.go('dashboard');
            })
            .catch(function(error) {

            });
    }
}]);

hexapot.controller('dashboardController', ['$scope', '$state', 'userAuth', function($scope, $state, userAuth) {

    $scope.logOut = function() {
        userAuth.setCurrentUser(null);
        $state.go('home');
    }
}]);