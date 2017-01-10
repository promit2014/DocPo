(function() {
    'use strict';

    angular
        .module('app.core')
        .provider('routeAuth', routeAuthProvider);

    /** @ngInject **/
    function routeAuthProvider() {
        /* ----------------- */
        /* Provider          */
        /* ----------------- */
        var provider = this;

        // Inject the $log service
        var $log = angular.injector(['ng']).get('$log');

        this.$get = function($auth, $location, $log, $q, $resource, $rootScope) {
            // Data

            var skipIfLoggedIn = ['$q', '$auth', '$location', '$rootScope', function($q, $auth, $location, $rootScope) {
                var deferred = $q.defer();
                if ($auth.isAuthenticated()) {
                    $rootScope.activeUser = $auth.getPayload().user;
                    console.log("$rootScope.activeUser ---->", $rootScope.activeUser);
                    $location.path('/home');
                } else {
                    deferred.resolve();
                }
                return deferred.promise;
            }];

            var loginRequired = ['$q', '$location', '$auth', '$rootScope', function($q, $location, $auth, $rootScope) {
                var deferred = $q.defer();
                if ($auth.isAuthenticated()) {
                    $rootScope.activeUser = $auth.getPayload().user;
                    deferred.resolve();
                } else {
                    $location.path('/signin');
                }
                return deferred.promise;
            }];


            // Methods
            var service = {
                skipIfLoggedIn: skipIfLoggedIn,
                loginRequired: loginRequired
            };

            return service;


        };
    }
})();
