var classpage = angular.module('classpagemodule', []);

classpage.controller('classlistcon', function ($scope, $http) {
  $http.get("assets/js/4-Json/class.json").then(function (response) {
    $scope.dndclasses = response.data;
    console.log($scope.dndclasses);
  });
});

classpage.filter('suboveride', function () {
  return function(main, sub){
    if (sub == "" | sub == undefined) {
      return main;
    }
    return sub;
  };
  });
  // classpage.filter('castersen', function () {
  //   return function(input){
  //     console.log(input);
  //     if (input == ""| input == "No") {
  //       console.log("ented");
  //       return "is not a caster"
  //     }
  //     else if (input == "Ritual") {
  //       return "is a Ritual caster"
  //     }
  //     else if (input == "yes") {
  //       return "is a spell caster"
  //     }
  //     else if (input == "More") {
  //       return "is more of a spell caster than outhere sub classes"
  //     }
  //     return input;
  //   };
  //   });
classpage.filter('makesen', function(){
  return function(input, propaty){
    // console.log(input);
    // console.log("propaty",propaty);
        if (input == ""| input == "No") {
          return "is not a " & propaty
        }
        else if (input == "yes") {
          return "is a "& propaty
        }
        return "";

  };
});
