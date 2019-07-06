hexapot.config(function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/partials/home.html',
            controller: 'loginController',
            resolve: {
                userBeforeLogin: userBeforeLogin
            }

        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/partials/dashboard.html',
            controller: 'dashboardController',
            resolve: {
                userAfterLogin: userAfterLogin
            }
        })
        .state('signup', {
            url: '/signup',
            templateUrl: '/partials/signup.html',
            controller: 'signupcontroller'
        })
        .state('createAdminPassword', {
            url: '/create-user-password/:token',
            templateUrl: '/partials/create_password.html',
            controller: 'createAdminPasswordController',
            resolve: {
                checkCreateUserPassword: checkCreateUserPassword
            }
        })

});

function checkCreateUserPassword($q, $http, $stateParams) {
    var deferred = $q.defer($http, $q, $stateParams);
    $http({
        method: 'get',
        url: '/create-user-password/?token=' + $stateParams.token
    }).then(function successCallback(response) {
        if (response.data.result) {
            deferred.resolve(response.data);
        } else {
            deferred.reject({ tokenExpired: true });
        }
    }, function errorCallback(error) {
        deferred.reject({ tokenExpired: true });
    });
    return deferred.promise;
}

function userBeforeLogin($q, userAuth) {
    var deferred = $q.defer($q, userAuth);
    var currentUser = userAuth.getCurrentUser();
    access_token = currentUser ? currentUser.access_token : null;
    console.log("Line 75:", access_token);
    if (access_token) {
        deferred.reject({ session: true, role: 'admin' });
    } else {
        deferred.resolve();
    }
    return deferred.promise;
}

function userAfterLogin($q, userAuth) {
    var deferred = $q.defer();
    var currentUser = userAuth.getCurrentUser();
    access_token = currentUser ? currentUser.access_token : null;
    console.log("Line 75:", access_token);
    if (access_token) {
        deferred.resolve();
        // deferred.reject({ session: true, role: 'admin' });
    } else {
        deferred.reject({ session: false, role: 'admin' });
    }
    return deferred.promise;
}