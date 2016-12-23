var app = angular.module('app', []);

app.controller('controller', function ($scope, $http) {
  $http.get("assets/js/4-Json/Spells.js").then(function (response) {
    $scope.allspells = response.data;
    $scope.damageinput = [{ damagetext: "damage", damagemodel: "search.damage.damage" }, { damagetext: "save damage", damagemodel: "search.save.damage" }, { damagetext: "attack damage", damagemodel: "search.attack.damage" }]

  });
  $scope.spellorderby = "name";
  $scope.logSearch = function (search) {
    console.log(search)
  }
  $scope.hoverIn = function (thisSpell) {

    this.hoverEdit = true;
    if (thisSpell.save != null) {
      this.saveHoverEdit = true;
    }
    if (thisSpell.attack != null) {
      this.attackHoverEdit = true;
    }
    if (thisSpell.damage != null) {
      this.damageHoverEdit = true;
    }
    if (thisSpell.heal != null) {
      this.healHoverEdit = true;
    }
  };

$scope.reverse = true;

$scope.sortBy = function() {
  $scope.reverse = ($scope.spellorderby) ? !$scope.reverse : false;
};
$scope.orderFunc = function(input){
  if ($scope.spellorderby == 'challenge') {
    return parseInt(input.challenge);
  }
  if ($scope.spellorderby == 'HP') {
    var i = input.HP.indexOf(" ")
    var res = [input.HP.slice(0,i),input.HP.slice(i+1)]
    //console.log(res[0])
    return parseInt(res[0]);
  }
  if ($scope.spellorderby == 'AC') {
    var i = input.ACAC.indexOf(" ")
    var res = [input.AC.slice(0,i),input.AC.slice(i+1)]
    //console.log(res[0])
    return parseInt(res[0]);
  }
    return
};

  $scope.hoverOut = function () {
    this.hoverEdit = false;
    this.saveHoverEdit = false;
    this.attackHoverEdit = false;
    this.damageHoverEdit = false;
    this.healHoverEdit = false;

  };
  $scope.delete = function (searchDel, search) {
    if (search != null) {
      var item_to_delete = searchDel;
      delete search[searchDel];
      console.log(search)
      console.log("removed")
    }
    return search
  };
});

app.filter("removenull", function () {
  return function (object, query) {
    if (query != null) {
      if (query.castingTime == null) {
        delete (query.castingTime)
      }
      if (query.duration == null) {
        delete (query.duration)
      }
      if (query.save != null) {
        if (query.save.damageType == null) {
          delete (query.save.damageType)
        }
      }
      if (query.heal != null) {
        if (query.heal.castingStat == false) {
          delete (query.heal.castingStat)
        }
      }
    }
    return object;
  }
});


angular.module('app')
  .filter('interpolateFilter', function ($interpolate) {
    return function (input, scope) {
      var exp = $interpolate(input); // interpolate your attriubte
      var interpolated = exp(scope); // evaluate it with the scope variable
      return interpolated;
    };
  });

angular.module('app').filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {

          var resolveSearch = function (object, keyString) {
            if (typeof object == 'undefined') {
              return object;
            }
            var values = keyString.split(".");
            var firstValue = values[0];
            keyString = keyString.replace(firstValue + ".", "");
            if (values.length > 1) {
              return resolveSearch(object[firstValue], keyString);
            } else {
              return object[firstValue];
            }
          }

          return resolveSearch(item, filterOn);
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          if (typeof item != 'undefined') {
            newItems.push(item);
          }
        }

      });
      items = newItems;
    }
    return items;
  };
});
