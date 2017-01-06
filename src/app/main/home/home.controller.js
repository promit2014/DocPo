(function ()
{
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController()
    {
        var vm = this;

        // Data
        vm.helloText = "Hello this is home";

        // Methods

        //////////
    }
})();
