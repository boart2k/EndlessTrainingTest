angular.module('endlessTraining').config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/power', {
      templateUrl: 'views/power.htm', controller: 'maingamecontroller'
   }).
   when('/speed', {
      templateUrl: 'views/speed.htm', controller: 'maingamecontroller'
   }).
   when('/crit', {
      templateUrl: 'views/crit.htm', controller: 'maingamecontroller'
   }).
   when('/mastery', {
      templateUrl: 'views/mastery.htm', controller: 'maingamecontroller'
   }).
   when('/rebirth', {
      templateUrl: 'views/rebirth.htm', controller: 'maingamecontroller'
   }).
   when('/option', {
      templateUrl: 'views/option.htm', controller: 'maingamecontroller'
   }).
   otherwise({
      redirectTo: '/power'
   });
	
}]);