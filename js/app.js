// jQuery code
/**
@author norosa@programmer.net /github/n0r0s4
@name app.js
@description , main application to manage all web features
@date march 23
@version 1.3
*/
$(document).ready(function () {

});

(function(){
  var hotelbApp = angular.module('hotelbApp', ['ng-currency', 'ui.bootstrap', 'ngCookies', 'angularUtils.directives.dirPagination']);
/********************************************************************************/
/**
@author norosa@programmer.net /github/n0r0s4
@name StudentDataOp
@description , factory to manage users models, simulating database acces
@date march 23
@version 1.3
*/
  hotelbApp.factory('StudentDataOp', ['$http', function ($http) {

    /*var StudentDataOp = [{"dni":"46988849X","firstname":"Lola","email":"loli@gmail.com"},
            {"dni":"75889065J","firstname":"Pepe","email":"pepe@gmail.com"},
            {"dni":"82548852N","firstname":"Snoopy","email":"snoopy@gmail.com"},
            {"dni":"75568087T","firstname":"TheRock","email":"marcos@gmail.com"},
            {"dni":"76011120F","firstname":"Xmen","email":"rocki@gmail.com"}];*/

            var StudentDataOp = [new User("75889065J","Pepe","pepe@gmail.com"),
                                 new User("46988849X","Lola","loli@gmail.com"),
                                 new User("82548852N","Snoopy","snoopy@gmail.com"),
                                 new User("75568087T","TheRock","marcos@gmail.com"),
                                 new User("76011120F","Xmen","rocki@gmail.com")];

    StudentDataOp.getStudents = function () {
        //return $http.get(urlBase+'/getUsers.php');
        return StudentDataOp;
    };

    StudentDataOp.addStudent = function (stud) {//
        StudentDataOp.push(stud);
    };

    StudentDataOp.removeStudent = function(stud){
      for (var i=0; i<StudentDataOp.length;i++){
        if (StudentDataOp[i].dni == stud.dni) {
          StudentDataOp.splice(i,1);
          break;
        }
      }
    };

    StudentDataOp.isInList = function (stud){
      for (var i=0; i<StudentDataOp.length;i++){
        if (StudentDataOp[i].dni == stud.dni) {
          return true;
        }
      }
      return false;
    };

    StudentDataOp.updateStudent = function(stud){
      for (var i=0; i<StudentDataOp.length;i++){
        if (StudentDataOp[i].dni == stud.dni) {
          StudentDataOp[i].firstname = stud.firstname;
          StudentDataOp[i].email = stud.email;
          break;
        }
      }
    };

    return StudentDataOp;

}]);
/*********************************************************************************/
/**
@author norosa@programmer.net /github/n0r0s4
@name GameDataOp
@description , factory to manage game models, simulating database acces
@date march 23
@version 1.3
*/
hotelbApp.factory('GameDataOp', ['$http', function ($http) {

  /*var GameDataOp = [{"title":"Age Of Empires","type":"Real Time Strategy","device":"PC", "with":"46988849X"},
          {"title":"Duke Nukem","type":"Action","device":"PC", "with":"75889065J"},
          {"title":"THE SIMS 2","type":"Simulation","device":"PC", "with":"82548852N"},
          {"title":"Final Fantasy VII","type":"RPG","device":"PlayStation", "with":"75568087T"},
          {"title":"Zelda: Ocarina of time","type":"Adventures","device":"Nintendo 64", "with":"76011120F"}];*/
          var GameDataOp = [new Game("Age Of Empires","Real Time Strategy","PC","46988849X"),
                               new Game("Duke Nukem","Action","PC","75889065J"),
                               new Game("THE SIMS 2","Simulation","PC","82548852N"),
                               new Game("Final Fantasy VII","RPG","PlayStation","75568087T"),
                               new Game("Zelda: Ocarina of time","Adventures","Nintendo 64","76011120F")];

  GameDataOp.getGames = function () {
      //return $http.get(urlBase+'/getUsers.php');
      return GameDataOp;
  };

  GameDataOp.addGame = function (game) {//
      GameDataOp.push(game);
  };

  GameDataOp.removeGame = function(game){
    for (var i=0; i<GameDataOp.length;i++){
      if (GameDataOp[i].title == game.title) {
        GameDataOp.splice(i,1);
        break;
      }
    }
  };

  GameDataOp.isInList = function (stud){
    for (var i=0; i<GameDataOp.length;i++){
      if (GameDataOp[i].owner == stud.dni) {
        return true;
      }
    }
    return false;
  };

  GameDataOp.isInListGame = function (game){
    for (var i=0; i<GameDataOp.length;i++){
      if (GameDataOp[i].title == game.title) {
        return true;
      }
    }
    return false;
  };

  GameDataOp.updateWith = function(game){
    for (var i=0; i<GameDataOp.length;i++){
      if (GameDataOp[i].title == game.title) {
        GameDataOp[i].owner = game.owner;
        break;
      }
    }
  };

  return GameDataOp;

}]);
/**
@author norosa@programmer.net /github/n0r0s4
@name mainController
@description , main controller, manages pseudologin (simulating login with cookie manage)
@date march 23
@version 1.3
*/
/*Lately I use cookieStore, compatible with this angular version :) to handle cookies, what do you think? really is deprecated?*/
  hotelbApp.controller('mainController', ['$scope', '$window', '$cookieStore', function($scope, $window, $cookieStore) {
    //Properties
    var user= "root";
    var password = "toor";
    $scope.generalName = "session";
    $scope.nameLogin;
    $scope.passwordLogin;
    $scope.path = "/";
    $scope.showActionMaster;
    $scope.error=false;
    $scope.diagram=0;
    $scope.start = function(){
      $scope.cookiesFound = $cookieStore.get($scope.generalName);//$cookies.get
      if(!$scope.cookiesFound) {
        $scope.showActionMaster=0;
      }
      else {
        $scope.showActionMaster = 77;
      }
    }
    $scope.validate = function(){
      if($scope.nameLogin==user && $scope.passwordLogin==password)
      {
        $cookieStore.put($scope.generalName,1);//$cookies.put
        $scope.showActionMaster=77;
      }
      else $scope.error=true;
    }

    $scope.logout = function(){
      $cookieStore.remove($scope.generalName);//$cookies.remove
      location.reload();
    }
    //Scope variables

  }]);
})();
