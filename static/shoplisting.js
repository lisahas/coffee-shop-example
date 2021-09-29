// Get the mainApp
var app = angular.module("mainApp", ["ngRoute"]);

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var selectedTown = decodeURIComponent(urlParams.get('town')).replace('string:', '');

// Create the controller
app.controller("shopController", function($scope, $http) {
  $http.get('/shops/' + selectedTown).then(function(response) {
    $scope.shops = response.data;
  });
  $http.get('/town-options').then(function(response) {
    $scope.selectedTown = selectedTown;
    $scope.towns = response.data;
  });
});

