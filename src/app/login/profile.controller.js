(function() {
    'use strict';

    angular
        .module('facebook')
        .controller('profileController',profileController);

    /** @ngInject */
    function profileController($scope, $state, $timeout, webDevTec, toastr, fbLoginApi) {
        var vm = this;

        $scope.profileData = "";
        $scope.coverPicture = "";
        $scope.getPostOnWall = "";
        $scope.post ={
          status: ""
        };
        activate();

        function activate() {
            $timeout(function() {
            	//fbAsyncInit();
                vm.classAnimation = 'rubberBand';
            }, 4000);
			fbAsyncInit();
            fbLoginApi.fbCoverPicture().then(function(response){
              console.log(response);
              $scope.coverPicture = response;
            })
            /*fbLoginApi.fbGetToken().then(function(response){
              console.log(response);
              //$scope.coverPicture = response.cover;
            })*/
            //fbAsyncInit();
            fbLoginApi.fbGetPosts().then(function(response){
              console.log(response);
              $scope.getPostOnWall = response;
            })
            
        }
        $scope.postFbStatus = function(data){
        	console.log(data);
        	fbLoginApi.fbPostStatus(data).then(function(response){
        		console.log(response);
            if(response.id){
              document.getElementById("status-box").value = "";
            }else{
              alert("Status Update Fail. Please Try Again");
            }
        	})
        }

    }
})();
