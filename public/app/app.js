var hexapot = angular.module('hexapot', [
    'ui.router'
]);

hexapot.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
})