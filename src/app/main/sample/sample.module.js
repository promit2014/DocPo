(function() {
    'use strict';

    angular
        .module('app.sample', [])
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
            .state('app.sample', {
                url: '/sample',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/sample/sample.html',
                        controller: 'SampleController as vm'
                    }
                },
                resolve: {
                    loginRequired: loginRequired
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/sample');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // Navigation
        /* msNavigationServiceProvider.saveItem('fuse', {
             title : 'SAMPLE',
             group : true,
             weight: 1
         });*/

        msNavigationServiceProvider.saveItem('sample', {
            title: 'Sample',
            icon: 'icon-tile-four',
            state: 'app.sample',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'SAMPLE.SAMPLE_NAV',
            weight: 2
        });
    }
})();
