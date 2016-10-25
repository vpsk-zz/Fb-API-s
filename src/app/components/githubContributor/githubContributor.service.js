(function() {
    'use strict';

    angular
        .module('facebook')
        .factory('fbLoginApi', fbLoginApi);

    /** @ngInject */
    function fbLoginApi($log, $http,$q) {

        var apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';
        var service = {
            fbLogin: fbLogin,
            fbPicture: fbPicture,
            getContributors: getContributors,
            fbCoverPicture:fbCoverPicture,
            fbPostStatus:fbPostStatus,
            fbGetPosts:fbGetPosts,
            fbGetToken:fbGetToken,
            fbGetfeeds:fbGetfeeds
        };

        return service;

        function fbLogin() {
            var deferred = $q.defer();
            FB.login(function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
              }, {scope: 'publish_actions'});
            return deferred.promise;
        }
        function fbPicture() {
            var deferred = $q.defer();
            FB.getLoginStatus(function(response) {
                if(response.authResponse){
                    FB.api('/me?fields=first_name,last_name,name,id,picture'
                    , function(response) {
                        if (!response || response.error) {
                            return deferred.reject('Error occured');
                        } else {
                            return deferred.resolve(response);
                        }
                    });
                }
                else{
                    return deferred.reject('Error occured');
                }
            })
            return deferred.promise;
        }
        function fbGetPosts() {
            var deferred = $q.defer();
            FB.getLoginStatus(function(response) {
                if(response.authResponse){
                    FB.api('me?fields=posts{message,created_time,story,likes,comments,picture}',function(response) {
                        if (!response || response.error) {
                            deferred.reject('Error occured');
                        } else {
                            var apiTrans = apiTransUserPosts(response)
                            deferred.resolve(apiTrans);
                        }
                    });
                }else{
                    return deferred.reject('Error occured');
                }
            })
            return deferred.promise;
        }
        function apiTransUserPosts(response){
            angular.forEach(response.posts.data,function(value,key){
                var dt = value.created_time.split(/[-T]/);
                var date = new Date(dt.slice(0,3).join('/')+' '+dt[3]);
                response.posts.data[key].changed_time = date;
            })
            return response;
        }
        function apiTranf(response){
            angular.forEach(response.data,function(value,key){
                console.log(value);
                var dt = value.created_time.split(/[-T]/);
                var date = new Date(dt.slice(0,3).join('/')+' '+dt[3]);
                response.data[key].created_time = date.toDateString();
                if(value.comments !== undefined){
                    response.data[key].comments.visible =  false;
                    angular.forEach(value.comments.data,function(comment, key1){
                         var dt = comment.created_time.split(/[-T]/);
                        var date = new Date(dt.slice(0,3).join('/')+' '+dt[3]);
                        response.data[key].comments.data[key1].created_time = date.toDateString();
                    })
                }
              })
            return response;
        }
        function fbGetfeeds() {
             var deferred = $q.defer();
                    FB.getLoginStatus(function(response) {
                        if(response.authResponse){
                            FB.api("/1710867455818503/feed",{
                                fields: 'message,story,link,likes,comments,picture,created_time,attachments{type,target}'
                            },function(response) {
                        if (!response || response.error) {
                            return deferred.reject('Error occured');
                        } else {
                            var result = apiTranf(response);
                            return deferred.resolve(result);
                        }
                    });
                }
                else{
                    return deferred.reject('Error occured');
                }
            })
            return deferred.promise;
        }
        function fbGetToken() {
            var deferred = $q.defer();
            FB.api(
            "/debug_token?input_token={input-token}",
             function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function fbCoverPicture() {
            var deferred = $q.defer();
            FB.getLoginStatus(function(response) {
                if(response.authResponse){
                    FB.api('/me?fields=cover,email,birthday,gender,education,name'
                    , function(response) {
                        if (!response || response.error) {
                            deferred.reject('Error occured');
                        } else {
                            deferred.resolve(response);
                        }
                    });
                }
                else{
                    return deferred.reject('Error occured');
                }
            })
            return deferred.promise;
        }
         function fbPostStatus(post) {
            var deferred = $q.defer();
            FB.api('/me/feed', 
                'post',{
                    message: post
             },function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
        function getContributors(limit) {
          if (!limit) {
            limit = 30;
          }


          return $http.get(apiHost + '/contributors?per_page=' + limit)
            .then(getContributorsComplete)
            .catch(getContributorsFailed);

          function getContributorsComplete(response) {
            return response.data;
          }

          function getContributorsFailed(error) {
            $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          } 
      }
    }
})();
