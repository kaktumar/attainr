var app = angular.module('app');

app.controller('goalListCtrl',['$scope','$rootScope','$uibModal', '$state', '$firebaseArray', '$timeout',function ($scope, $rootScope, $uibModal, $state, $firebaseArray, $timeout) {

    var goalsRef = firebase.database().ref($rootScope.userInfo.uid);


    $scope.oneAtATime = true;

    $scope.userGoals = $firebaseArray(goalsRef);

    $scope.today = {
        date: new Date()
    };


    $scope.userGoals.$loaded().then(function() {
        console.log($scope.userGoals);

        function deadlineCheck(list) {
            for (var i = 0; i < list.length; i++) {
                list[i].deadline = new Date(list[i].deadline);
                if (moment($scope.today.date).isAfter(list[i].deadline, 'day')) {
                    list[i].completed = true;
                }
            }
        }

        deadlineCheck($scope.userGoals);

        for (var j = 0; j < $scope.userGoals.length; j++) {
            deadlineCheck($scope.userGoals[j].subGoalList);
        }

        $scope.userGoals.$save();



    }).catch(function(error) {
        console.log("Error:", error);
    });


    $scope.status = {
        editMode: false,
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false,
        isItemOpen: [],
        isAccordionOpen: false,
        openGoalIndex: -1,
        approachingSubgoal: null,
        deadlineToday: false
    };

    $scope.distanceFromToday = function(index) {
        var difference;
        var now = moment();
        var goalDate = $scope.userGoals[$scope.status.openGoalIndex].subGoalList[index].deadline;
        goalDate = new Date(goalDate);
        goalDate = moment(goalDate);

        difference = goalDate.diff(now, 'hours');
        return difference;
    };


    $scope.$watchCollection ('status.isItemOpen', function() {
        if ($scope.status.isItemOpen.includes(true)) {
            $scope.status.isAccordionOpen = true;
            $scope.status.openGoalIndex = $scope.status.isItemOpen.indexOf(true);

            for (var k = 0; k < $scope.userGoals[$scope.status.openGoalIndex].subGoalList.length; k++) {
                if (moment($scope.userGoals[$scope.status.openGoalIndex].subGoalList[k].deadline).isSame($scope.today.date, 'day')) {
                    $scope.status.deadlineToday = true;
                }
                else if (!$scope.userGoals[$scope.status.openGoalIndex].subGoalList[k].completed
                    && ($scope.distanceFromToday(k) < 48)) {
                    $scope.status.approachingSubgoal = $scope.userGoals[$scope.status.openGoalIndex].subGoalList[k];
                    $scope.status.deadlineApproaching = true;
                    break;
                }
            }
        console.log($scope.status.approachingSubgoal);

        } else {
            $scope.status.isAccordionOpen = false;
            $scope.status.openGoalIndex = -1;
            $scope.status.approachingSubgoal = null;
            $scope.status.deadlineApproaching = false;
        }
    });

    $scope.scrollToCurrentDate = function() {
        $scope.$$postDigest(function() {
            console.log($('#currentDate').offset());
            $('body').scrollTop($('#currentDate').offset().top - 68);
        })
    };

    $scope.deleteGoal = function(index) {
        var goal = $scope.userGoals[index];
        $scope.userGoals.$remove(goal)
    };


    $scope.getDateObj = function(string) {
        var date = new Date(string);
        return date;
    };


    //Form Modal Open function
    $scope.open = function () {
        console.log('opening pop up');
        console.log($scope.title);
        var modalInstance = $uibModal.open({
            templateUrl: 'formModal.html',
            controller: 'formModalCtrl'
        }).closed.then(function() {
            $state.go('goalList')
        });
    }
}]);

app.controller('formModalCtrl', ['$scope','$uibModalInstance', '$state',function ($scope, $uibModalInstance, $state) {
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
        $state.go('^');
    };
}]);