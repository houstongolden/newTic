'use strict';

angular.module('newTicApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'TicTacToeCntl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
