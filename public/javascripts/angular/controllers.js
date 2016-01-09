'use strict';

var app = angular.module('myApp');

app.controller('todoIndexCtrl',['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.todoData = {};
        
    // Get all todos
    $http.get('/api/todos')
      .success(function(data) {
        $scope.todoData = data;
        console.log(data);
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });

    $scope.goToEdit = function(id) {
      $location.path('/todos/' + id + '/edit');
    }
           
    // Delete a todo
    $scope.deleteTodo = function(id) {
      $http.delete('/api/todos/' + id)
        .success(function() {
        
          // Get all todos
          $http.get('/api/todos')
            .success(function(data) {
              $scope.todoData = data;
              console.log(data);
            });
        })
        .error(function(error) {
          console.log('Error: ' + error);
        });
    };
}]);

app.controller('todoShowCtrl', function($scope, $http, $routeParams, $location) {
  
  $scope.todoData = {};
    
  $http.get('/api/todos/' +  $routeParams.id)
    .success(function(data) {
      $scope.todoData = data;
      console.log(data);
    })
    .error(function(error) {
      console.log('Error: ' + error);
    });
    
  $scope.completeTodo = function() {
    $scope.todoData.complete = true;
    $http.put('/api/todos/' + $routeParams.id, $scope.todoData)
      .success(function(data) {
        console.log(data);
        $location.path('/');                
      })
      .error(function(error) {
          console.log('Error: ' + error);
      });    
  };
});

app.controller('todoNewCtrl', function($scope, $http, $location) {
  
  $scope.cancelCreateTodo = function(){
    $location.path('/');
  }
  
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        //$scope.todoData = data;
        console.log(data);
        $location.path('/');                
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
    };
});

app.controller('todoEditCtrl', function($scope, $http, $location, $routeParams) {
    
  $scope.cancelUpdateTodo = function(){
    $location.path('/');
  }
  
  $http.get('/api/todos/' +  $routeParams.id)
      .success(function(data) {
        $scope.formData = data;
        console.log(data);
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
  
  $scope.updateTodo = function() {
    $http.put('/api/todos/' + $routeParams.id, $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        //$scope.todoData = data;
        console.log(data);
        $location.path('/');                
      })
      .error(function(error) {
          console.log('Error: ' + error);
      });
  };
});

