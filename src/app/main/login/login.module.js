(function() {
    'use strict';

    angular
        .module('app.auth.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider, $qProvider) {
        /**
         * Helper auth functions
         */
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
                $location.path('/auth/login');
            }
            return deferred.promise;
        }];


        // State
        $stateProvider.state('app.auth_login', {
            url: '/auth/login',
            views: {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.auth_login': {
                    templateUrl: 'app/main/login/login.html',
                    controller: 'LoginController as vm'
                }
            },
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            },
            bodyClass: 'login-v2'
        });
    }

})();
