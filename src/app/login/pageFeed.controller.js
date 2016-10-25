(function() {
    'use strict';

    angular
        .module('facebook')
        .controller('pageFeedController',pageFeedController);

    /** @ngInject */
    function pageFeedController($scope, $state, $timeout, webDevTec, toastr, fbLoginApi) {
        var vm = this;

        $scope.pageFeedData = "";
        $scope.showCommentsBox = false;
        activate();

        function activate() {
			      fbAsyncInit();
           
            fbLoginApi.fbGetfeeds().then(function(response){
              console.log(response);
              // angular.forEach(response.data,function(value,key){
              //   //debugger;
              //   console.log(value);
              //   var dt = value.created_time.split(/[-T]/);
              //   response.data[key].created_time = new Date(dt.slice(0,3).join('/')+' '+dt[3]);
              // })
              $scope.pageFeedData = response.data;
              console.log($scope.pageFeedData);
            })            
        }

        $scope.openShareUrl = function(url){
          if(url !== undefined){
              window.open(url);
          }
        }
        $scope.showComments = function(data){
          if(data.visible == true){
              data.visible = false;            
          }else{
              data.visible = true;
          }
        }
    }
})();
