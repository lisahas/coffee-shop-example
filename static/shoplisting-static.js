// Get the mainApp
var app = angular.module("mainApp", []);

// Create the controller
app.controller("shopController", function($scope, $http) {
  $scope.shops=[
    new Shop("1", "shop1", "address1", "tokyo"),
    new Shop("2", "shop2", "address2", "london")

  ]
});