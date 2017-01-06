(function() {
    'use strict';

    angular
        .module('app.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($auth, $state, $scope, $mdToast, $document , $rootScope , $log) {
        var vm = this;

        vm.signin = function() {
            $auth.login({
                // username of the user entered in the login form
                email: this.form.email,
                // username of the user entered in the login form
                password: this.form.password
            }).then(function(response) {
                $log.info('login success response --->', response.data.email);
                $rootScope.activeUser = response.data.email;
                $scope.$parent.userdetails = {
                    email: response.data.email,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    dob: response.data.dob,
                    age: response.data.age,
                    gender: response.data.gender,
                    mobile: response.data.mobile,
                    city: response.data.city,
                    country: response.data.country,
                    profilepic: response.data.profilepic
                }
                $state.go('app.home');
            }).catch(function(response) {
                var message = '<strong>' + response.data.error + '</strong>';
                $log.error('Login Failed ---->', response);
            });
        }
    }
})();
