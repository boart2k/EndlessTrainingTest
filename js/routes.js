angular.module('tycoonology').config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/addStudent', {
      templateUrl: 'addStudent.htm', controller: 'AddStudentController'
   }).
   
   when('/viewStudents', {
      templateUrl: 'viewStudents.htm', controller: 'ViewStudentsController'
   }).
   
   otherwise({
      redirectTo: '/addStudent'
   });
	
}]);