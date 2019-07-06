hexapot.directive("validSubmit", ["$parse", function($parse) {
    return {
        require: 'form',
        link: function(scope, element, iAttrs, form) {
            form.$submitted = false;
            var fn = $parse(iAttrs.validSubmit);
            element.on("submit", function(event) {
                scope.$apply(function() {
                    form.$submitted = true;
                    if (form.$valid) {
                        fn(scope, { $event: event });
                        form.$submitted = false;
                    }
                });
            });
        }
    };
}]);


hexapot.directive('loading', ['$http', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.isLoading = function() {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function(value) {
                if (value) {
                    element.removeClass('ng-hide');
                } else {
                    element.addClass('ng-hide');
                }
            });
        }
    };
}])