/**
 * Created by Napoleon on 12/12/2016.
 */
app.controller('registerCtrl', ['$scope', '$firebaseAuth', '$state', 'userDataSvc','$rootScope', function($scope, $firebaseAuth, $state, userDataSvc, $rootScope) {

    $scope.authObj = $firebaseAuth();
    $rootScope.userInfo = {
        uid: null,
        authenticated: false
    };

    $scope.signUp = function() {
        if (!$scope.regForm.$invalid) {
            var email = $scope.user.email;
            var password = $scope.user.password;

            if (email && password) {
                $scope.authObj.$signOut();

                $scope.authObj.$createUserWithEmailAndPassword(email, password)
                    .then(function(firebaseUser) {
                        console.log("User " + firebaseUser.uid + " created successfully!");
                        $rootScope.userInfo.uid = firebaseUser.uid;
                        $rootScope.userInfo.authenticated = true;
                        $state.go('goalList');

                    }).catch(function(error) {
                    console.error("Error: ", error);
                });
            }
        }
    }


    //$scope.saveUser = function(userData) {
    //
    //    var user = userDataSvc.newUserRef(userData);
    //    //user.username = $scope.username;
    //    user.email = $scope.email;
    //
    //    user.$save().then(function(success) {
    //        //$scope.username = null;
    //        $scope.email = null;
    //        $scope.password = null;
    //        $state.go('goalList');
    //    }, function(error) {
    //        console.log("there was an error! " + error);
    //    });
    //}
    //


}]);