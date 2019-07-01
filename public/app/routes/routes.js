hexapot.config(function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            //abstract: true,
            templateUrl: '/partials/home.html',
            controller: 'logincontroller'
        })
        // .state('home.signup', {
        //     url: '/signup',
        //     templateUrl: '/partials/signup.html',
        // })

});
