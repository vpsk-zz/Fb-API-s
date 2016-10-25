(function() {
  'use strict';

  angular
    .module('facebook')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
        url: '',
        abstract: true,
        templateUrl: 'app/login/login.html',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .state('login.profile', {
        url: '/login',
        templateUrl: 'app/login/profile.html',
        controller: 'profileController',
        controllerAs: 'profile'
      })
      .state('login.pageFeed', {
        url: '/page-feed',
        templateUrl: 'app/login/pageFeed.html',
        controller: 'pageFeedController',
        controllerAs: 'pageFeed'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
