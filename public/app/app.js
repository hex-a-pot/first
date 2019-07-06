var hexapot = angular.module('hexapot', [
    'ui.router', 'angular-storage'
]);

hexapot.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
})
hexapot.run(['$transitions', '$state', function($transitions, $state) {
    $transitions.onError({}, function(error) {
        console.log("Line 14:", error._error.detail);
        if (error._error.detail.session == true && error._error.detail.role == 'admin') {
            $state.go('dashboard');
        } else if (!error._error.detail.session && error._error.detail.role == null) {
            $state.go('home');
        } else {
            $state.go('home');
        }
        // if (error._error.detail.setUpStatus) {
        //     $state.go('cmsUserLogin');
        // } else if (error._error.detail.tokenExpired == true) {
        //     $state.go('tokenExpired');
        // } else if (!error._error.detail.session && error._error.detail.role == null) {
        //     $state.go('cmsUserLogin');
        // } else if (error._error.detail.session && error._error.detail.role == 'admin') {
        //     $state.go('cmsUserDashboard.main');
        // } else if (error._error.detail.session && error._error.detail.role == 'bdm') {
        //     $state.go('bdmDashboard.main');
        // } else if (error._error.detail.session && error._error.detail.role == 'editor') {
        //     $state.go('editorDashboard.main');
        // } else if (error._error.detail.session && error._error.detail.role == 'HR') {
        //     $state.go('hrDashboard.main');
        // } else {
        //     $state.go('cmsUserLogin');
        // }
    });
}]);