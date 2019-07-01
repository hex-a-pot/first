hexapot.controller('logincontroller', ['$scope', 'mainService', function($scope, mainService) {

    $scope.login = function(logindata) {
        console.log(logindata);
        mainService.savelogin(logindata)
            .then(function(response) {

            })
            .catch(function(error) {

            })
    }
}])