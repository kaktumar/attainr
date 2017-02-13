'use strict';
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'firebase', 'angularMoment']);

app.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $state.go("home");
        }
    });
}]);


app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    //$locationProvider.html5Mode(true);
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state({
            name: 'goalList',
            url: '/goalList',
            templateUrl: 'views/goalList.html'
        })
        .state('addMainGoal', {
            url: '/addMainGoal',
            parent: 'goalList',
            views: {
                'goalList@': {
                    templateUrl: 'views/mainGoalForm.html'
                }
            }
        })
        .state('addSubGoal', {
            url: '/addSubGoal',
            parent: 'goalList',
            views: {
                'goalList@': {
                    templateUrl: 'views/subGoalForm.html'
                }
            }
        })
        .state({
            name: 'mainGoalForm',
            parent: 'goalList',
            url: '/addMainGoal',
            templateUrl: 'views/mainGoalForm.html'
        })
        .state({
            name: 'login',
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        .state({
            name: 'register',
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'registerCtrl'
        });
    //$urlRouterProvider.otherwise('/login');
}]);

