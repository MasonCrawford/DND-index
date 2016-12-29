classpage.filter('suboveride', function () {
  return function(main, sub){
    if (sub == "" | sub == undefined) {
      return main;
    }
    return sub;
  };
  });
  classpage.filter('castersen', function () {
    return function(input){
      console.log(input);
      if (input == ""| input == "No") {
        console.log("ented");
        return "is not a caster"
      }
      else if (input == "Ritual") {
        return "is a Ritual caster"
      }
      else if (input == "yes") {
        return "is a spell caster"
      }
      else if (input == "More") {
        return "is more of a spell caster than outhere sub classes"
      }
      return input;
    };
  });
