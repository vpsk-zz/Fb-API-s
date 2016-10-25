(function() {
  'use strict';

  angular
    .module('facebook')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope,$state,$timeout, webDevTec, toastr,fbLoginApi) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1460530420340;
//    vm.showToastr = showToastr;

    activate();

    function activate() {
      //getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    $scope.login = function () {
      fbAsyncInit();
      fbLoginApi.fbLogin().then(function(response){
        if (response.status === 'connected') {
            //document.getElementById('status').innerHTML = 'We are connected.';
            document.getElementById('login').style.visibility = 'hidden';
            $state.go("login.profile");
          } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'We are not logged in.'
          } else {
            document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
          }
      })
    }
  }
})();
