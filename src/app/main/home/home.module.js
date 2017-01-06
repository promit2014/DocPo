(function ()
{
    'use strict';

    angular
        .module('app.home', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.home', {
                url    : '/home',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/home/home.html',
                        controller : 'HomeController as vm'
                    }
                }
            });


        msNavigationServiceProvider.saveItem('home', {
            title    : 'Home',
            icon     : 'icon-home',
            state    : 'app.home',
            /*stateParams: {
                'param1': 'page'
             },*/
            weight   : 1
        });
    }
})();