(function() {
    'use strict';

    angular
        .module('facebook')
        .controller('loginController', loginController);

    /** @ngInject */
    function loginController($scope, $state, $timeout, webDevTec, toastr, fbLoginApi) {
        var vm = this;

        vm.awesomeThings = [];
        vm.classAnimation = '';
        vm.creationDate = 1460530420340;
        vm.showToastr = showToastr;
        //$scope.profileData = "";
        $scope.coverPicture = "";

        activate();

        function activate() {
            getWebDevTec();
            $timeout(function() {
                vm.classAnimation = 'rubberBand';
            }, 4000);
            fbAsyncInit();
            fbLoginApi.fbPicture().then(function(response){
              console.log(response);
              $scope.profileData = response;
            });
           
        }

        function showToastr() {
            toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
            vm.classAnimation = '';
        }

        function getWebDevTec() {
            vm.awesomeThings = webDevTec.getTec();

            angular.forEach(vm.awesomeThings, function(awesomeThing) {
                awesomeThing.rank = Math.random();
            });
        }
        $scope.login = function() {
            //fbAsyncInit();
            /*FB.login(function(response) {
                if (response.status === 'connected') {
                    fbLoginApi.fbLogin().then(function(response) {
                        console.log(response);
                    });
                    document.getElementById('status').innerHTML = 'We are connected.';
                    document.getElementById('login').style.visibility = 'hidden';
                } else if (response.status === 'not_authorized') {
                    document.getElementById('status').innerHTML = 'We are not logged in.'
                } else {
                    document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
                }
            }, { scope: 'email' });*/
        }
        $scope.updateSkills = "Page Feed";

        $scope.settingsTab = "Setting";
        $scope.hamburgerRecomendationsTab = "Profile";
        $scope.privacyTab = "localeString.hamburgerPrivacyTab";
        $scope.termsTab = "localeString.hamburgerTermsTab";
        $scope.recommendationHeaderText = "F-BOOK";
        $scope.hamburgerLegalTab = "localeString.hamburgerLegalTab";

        $scope.open = false;
        $scope.closeSidebar = function() {
            $("#wrapper").toggleClass("menuDisplayed");
            $scope.open = false;
        };

        $scope.closeMenu = window.onclick = function() {
            if ($scope.open == true)
                $scope.closeSidebar();
        };

        $scope.toggleMenu = function(e) {
            $("#wrapper").toggleClass("menuDisplayed");
            $scope.open = true;
            e.stopPropagation();
            //e.preventDefault();

        };
        $scope.gotoHome = function() {
            $state.go("login.profile");
        }
        $scope.gotoPageFeed = function() {
            $state.go("login.pageFeed");
        }
    }
})();
