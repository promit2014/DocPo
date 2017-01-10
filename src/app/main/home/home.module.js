(function() {
    'use strict';

    angular
        .module('app.home', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider,$qProvider) {

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
        $stateProvider
            .state('app.home', {
                url: '/home',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/home/home.html',
                        controller: 'HomeController as vm'
                    }
                },
                resolve: {
                    loginRequired: loginRequired
                }
            });


        msNavigationServiceProvider.saveItem('home', {
            title: 'Home',
            icon: 'icon-home',
            state: 'app.home',
            /*stateParams: {
                'param1': 'page'
             },*/
            weight: 1
        });
    }
})();
