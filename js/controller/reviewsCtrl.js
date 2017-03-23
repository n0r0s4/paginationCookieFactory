/*
  @author norosa@programmer.net /github/n0r0s4
  @name hotelReviewsMng
  @description , controller to manage users/students
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
    angular.module("hotelbApp").controller("hotelReviewsMng", ['$scope', '$window', '$filter', 'StudentDataOp', 'GameDataOp', function ($scope, $window, $filter, StudentDataOp, GameDataOp) {
            $scope.reviewsArray = [];
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.filteredData;
            $scope.miniaction = 0;
            $scope.dniToInsert;
            $scope.nameToInsert;
            $scope.emailToInsert;
            $scope.nameToUpdate;
            $scope.emailToUpdate;
            $scope.toChange;

            $scope.init = function(){
              getStudents();
              console.log("init students");
            }

            //get all students
            function getStudents() {
                $scope.reviewsArray = StudentDataOp.getStudents();
                $scope.filteredData = $scope.reviewsArray;
            }

            //to update student on click
            $scope.updateStudent = function(stud){
              $scope.miniaction = 2;
              $scope.toChange = stud;
            }

            //to update student from factory
            $scope.updateStudentFinally = function(){
              $scope.toChange.firstname = $scope.nameToUpdate;
              $scope.toChange.email = $scope.emailToUpdate;
              StudentDataOp.updateStudent($scope.toChange);
              getStudents();
              $scope.nameToUpdate="";
              $scope.emailToUpdate="";
              console.log("succes");
              $scope.miniaction=0;

            }

            //adding student to factory
            $scope.addStudent = function(){
              //"dni":"46988849X","firstname":"Lola","email":"loli@gmail.com"
              console.log("works student");
              console.log($scope.dniToInsert);
              console.log($scope.nameToInsert);
              console.log($scope.emailToInsert);
              var stud=new User($scope.dniToInsert,$scope.nameToInsert,$scope.emailToInsert);
              if(StudentDataOp.isInList(stud)) alert("We have a student with same DNI in database. Check it please.");
              else{
                StudentDataOp.addStudent(stud);
                getStudents();
                $scope.nameToInsert="";
                $scope.dniToInsert="";
                $scope.emailToInsert="";
                console.log("succes stdent");
                $scope.miniaction=0;
              }
            }

            //removing student from factory
            $scope.removeStudent = function(stud){
              var succes=confirm("Are you sure you want to remove "+stud.firstname+" from list?");
              if(succes){
                if(GameDataOp.isInList(stud)) alert("You can't remove "+stud.firstname+" because has some of your games yet! Check games list where current owner has "+stud.dni+"!");
                else{
                  StudentDataOp.removeStudent(stud);
                  getStudents();
                }
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

            $scope.$watch("mailSearch+opinionSearch", function (){
                $scope.filteredData = $filter('filter')
                        ($scope.reviewsArray,
                                {firstname: $scope.opinionSearch,
                                    dni: $scope.mailSearch}
                        );
            });

        }]); // END controller

    angular.module('hotelbApp').directive("hotelReviewsForm", function (){
        return {
            restrict: 'E',
            templateUrl: "view/templates/hotel-reviews-form.html",
            controller: function () {

            },
            controllerAs: 'hotelReviewsForm'
        };
    });
})();
