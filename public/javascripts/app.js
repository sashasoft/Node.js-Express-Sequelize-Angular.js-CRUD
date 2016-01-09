'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.config([
  '$routeProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'templates/list-todos.html',
      controller: 'todoIndexCtrl'
    })
    .when('/todos/new', {
      templateUrl: 'templates/new-todo.html',
      controller: 'todoNewCtrl'
    })
    .when('/todos/:id/edit', {
      templateUrl: 'templates/edit-todo.html',
      controller: 'todoEditCtrl'
    })
    .when('/todos/:id', {
      templateUrl: 'templates/show-todo.html',
      controller: 'todoShowCtrl'
    });
    $routeProvider.otherwise({
      redirectTo: '/todos',
      templateUrl: 'templates/list-todos.html',
      controller: 'todoIndexCtrl'
    });
  }
]);
