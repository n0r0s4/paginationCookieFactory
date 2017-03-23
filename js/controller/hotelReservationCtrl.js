/*@author norosa@programmer.net /github/n0r0s4
  @name hotelReservation
  @description , controller to manage games
  @date march 23
  @version 1.3
 * Learning in this lesson:
 *
 * script dirPagination, "angularUtils.directives.dirPagination" module as dependency
 * dir-paginate, current-page in html tag als ng-repeat
 * dir-pagination-controls tag with all properties
 * $filter <== linked in cotroller
 * $watch
 * association $scope.filteredData and $scope.reviewsArray, all linked due to $filter
 */


// Code goes here
(function () {
    angular.module("hotelbApp").controller("hotelReservation", ['$scope', '$window', '$filter', 'StudentDataOp', 'GameDataOp', function ($scope, $window, $filter, StudentDataOp, GameDataOp) {
            $scope.reviewsArray = [];
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.filteredData;
            $scope.miniaction = 0;
            $scope.withToInsert;
            $scope.nameToInsert;
            $scope.deviceToInsert;
						$scope.typeToInsert;
            $scope.withToUpdate;
            $scope.toChange;
						$scope.devices= ["PC", "PlayStation", "Nintendo 64", "Game Boy", "Mega Drive"];
						$scope.types = ["Real Time Strategy", "Simulation", "Action", "Adventures", "RPG", "Sports", "Shooter"];
						$scope.students;
						$scope.dni;
						//  {"title":"Duke Nukem","type":"Action","device":"PC", "with":"75889065J"},
						$scope.init = function(){
              console.log("init games");
              getGames();
							$scope.deviceToInsert = $scope.devices[0];
							$scope.typeToInsert = $scope.types[0];
              $scope.reloadDNI();
						}

            //initial array of games
            function getGames() {
                $scope.reviewsArray = GameDataOp.getGames();
                $scope.filteredData = $scope.reviewsArray;
            }

            //to update games button with dni reload from studentservice
            $scope.updateGame = function(game){
              $scope.reloadDNI();
              $scope.miniaction = 2;
              $scope.toChange = game;
              $scope.withToUpdate=$scope.dni[0];
            }

            //updating dni
            $scope.updateGameFinally = function(){//  {"title":"Duke Nukem","type":"Action","device":"PC", "with":"75889065J"},
              $scope.toChange.owner = $scope.withToUpdate;
              GameDataOp.updateWith($scope.toChange);
              getGames();
              $scope.withToUpdate="";
              console.log("succes");
              $scope.miniaction=0;
            }

            //getting dnis from users to manage with games (PK)
            $scope.reloadDNI = function(){
              $scope.dni=[];
              console.log("dnis reloaded");
							$scope.students=StudentDataOp.getStudents();
							for (var i=0; i<$scope.students.length; i++){
								$scope.dni.push($scope.students[i].dni);
                console.log($scope.students[i].dni);
							}
              $scope.withToInsert = $scope.dni[0];
            }

            //to insert a new game in factory/list
            $scope.addGame = function(){
              //$scope.reloadDNI();
              console.log($scope.withToInsert);
              console.log($scope.nameToInsert);
              console.log($scope.deviceToInsert);
							console.log($scope.typeToInsert);
              var game= new Game($scope.nameToInsert,$scope.typeToInsert,$scope.deviceToInsert,$scope.withToInsert);
              if(GameDataOp.isInListGame(game)) alert("We have a game with same title in database. Check it please.");
              else{
                GameDataOp.addGame(game);
                getGames();
                $scope.nameToInsert="";
                $scope.dniToInsert="";
                $scope.emailToInsert="";
                $scope.miniaction=0;
              }
            }

            //to remove game from factory
            $scope.removeGame = function(game){
              var succes=confirm("Are you sure you want to remove "+game.title+" from list?");
              if(succes){
                GameDataOp.removeGame(game);
                getGames();
              }
            }


            /*this.initForm = function (){
                //Accés to the server to get all reviews
                for (var i = 0; i < 100; i++){
                    var review = new reviewObj();
                    review.construct(i, Math.floor((Math.random() * 11)), "opinion " + i, "email" + i + "@test.com");
                    $scope.reviewsArray.push(review);
                }
                $scope.filteredData = $scope.reviewsArray;
            };*/

            // $watch(watchExpression, listener, [objectEquality]);
            /*
             https://docs.angularjs.org/api/ng/type/$rootScope.Scope

             Registers a listener callback to be executed whenever the watchExpression changes.

             The watchExpression is called on every call to $digest() and should return the value that will be watched. (watchExpression should not change its value when executed multiple times with the same input because it may be executed multiple times by $digest(). That is, watchExpression should be idempotent.)
             The listener is called only when the value from the current watchExpression and the previous call to watchExpression are not equal (with the exception of the initial run, see below). Inequality is determined according to reference inequality, strict comparison via the !== Javascript operator, unless objectEquality == true (see next point)
             When objectEquality == true, inequality of the watchExpression is determined according to the angular.equals function. To save the value of the object for later comparison, the angular.copy function is used. This therefore means that watching complex objects will have adverse memory and performance implications.
             This should not be used to watch for changes in objects that are or contain File objects due to limitations with angular.copy.
             The watch listener may change the model, which may trigger other listeners to fire. This is achieved by rerunning the watchers until no changes are detected. The rerun iteration limit is 10 to prevent an infinite loop deadlock.

             */

            $scope.$watch("mailSearch+opinionSearch+deviceSearch", function (){
                $scope.filteredData = $filter('filter')
                        ($scope.reviewsArray,
                                {title: $scope.opinionSearch,
																	device: $scope.deviceSearch,
                                    owner: $scope.mailSearch}
                        );
            });

        }]); // END controller

	angular.module('hotelbApp').directive("hotelReservationForm", function (){
    return {
      restrict: 'E',
      templateUrl:"view/templates/hotel-reservation-form.html",
      controller:function(){

      },
      controllerAs: 'hotelReservationForm'
    };
  });
})();
