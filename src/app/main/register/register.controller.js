(function() {
    'use strict';

    angular
        .module('app.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($auth, $state, $scope, $mdToast, $document) {
        var vm = this;

        vm.signin = function(formObject) {
            $auth.signup({
                    email: formObject.email,
                    firstname: formObject.firstname,
                    lastname: formObject.lastname,
                    dob: formObject.dob,
                    age: formObject.age,
                    gender: formObject.gender,
                    mobile: formObject.mobile,
                    city: formObject.city,
                    country: formObject.country,
                    password: formObject.password
                }).then(function(response) {
                    var message = "Registration Successfull. Please visit "+formObject.email+" to activate your Account";
                    /*var message = '<strong>Registration Successfull</strong>';
                    var id = Flash.create('success', message);*/
                    $mdToast.show(
                        $mdToast.simple({
                            hideDelay: 7000,
                            position: 'top right',
                            content: message,
                            toastClass: 'success'
                        })
                    );
                    $state.go('app.auth_login');
                    $scope.registerForm.$setPristine(true);
                    $scope.registerForm.$setUntouched(true);
                    $scope.successful = true;
                    $scope.errorOut = false;
                })
                .catch(function(response) {
                    $mdToast.show(
                        $mdToast.simple({
                            hideDelay: 7000,
                            position: 'top right',
                            content: "There was some error in Registration .Please Try Again!",
                            toastClass: 'success'
                        })
                    );
                    $scope.errorOut = true;
                    $scope.successful = false;
                });
        }
    }
})();
