var classpage = angular.module('classpagemodule', []);

classpage.controller('classlistcon', function ($scope, $http) {
  $http.get("assets/js/4-Json/class.json").then(function (response) {
    $scope.dndclasses = response.data;
    console.log($scope.dndclasses);
    $scope.logit = function(input) {

      console.log(input);

    };
  });
});

classpage.controller('classpageform', function($scope){
  $scope.classorderby = "class"
  // $scope
  // $scope
  // $scope
$scope.formctrlenter = function() {

  console.log('this is a test');

};
});
