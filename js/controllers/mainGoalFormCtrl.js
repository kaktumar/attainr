/**
 * Created by Napoleon on 12/12/2016.
 */
app.controller('mainGoalFormCtrl', ['$scope', '$rootScope', '$firebaseArray','moment', function($scope, $rootScope, $firebaseArray, moment) {
    var goalsRef = firebase.database().ref($rootScope.userInfo.uid);
    $scope.userGoals = $firebaseArray(goalsRef);

    $scope.form = {};

    $scope.mainGoalData = {
        targets: [],
        subGoalList: [],
        completed: false
    };

    $scope.subGoalData = {
        targets:[],
        completed: false
    };

    $scope.addTarget = function(type) {
        type.targets.push({value: null, units:null});
    };

    $scope.addSubGoal = function() {
        $scope.subGoalData.deadline = moment($scope.subGoalData.deadline).format('l');
        $scope.mainGoalData.subGoalList.push($scope.subGoalData);
        $scope.subGoalData = {
            targets:[],
            completed: false
        };
        $scope.form.subGoalForm.$setPristine;
    };

    $scope.submitData = function() {
        $scope.mainGoalData.deadline = moment($scope.mainGoalData.deadline).format('l');
        $scope.mainGoalData.beginDate = moment().format('l');
        $scope.userGoals.$add($scope.mainGoalData);
    };

}]);