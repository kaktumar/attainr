app.controller('loginCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$state', function($scope, $rootScope, $firebaseAuth, $state) {

    $scope.authObj = $firebaseAuth();
    $rootScope.userInfo = {
        uid: null,
        authenticated: false
    };

    $scope.logIn = function() {

        var username = $scope.user.email;
        var password = $scope.user.password;

        $scope.authObj.$signInWithEmailAndPassword(username, password).then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            $rootScope.userInfo.uid = firebaseUser.uid;
            $rootScope.userInfo.authenticated = true;
            $state.go('goalList')
        }).catch(function(error) {
            console.error("Authentication failed:", error);
        });
    }



}]);