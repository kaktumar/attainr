app.service('userDataSvc', ['$firebaseObject', function($firebaseObject) {
    function newUserRef(user) {
        var ref = new Firebase("https://attain-9cfb8.firebaseio.com/user/" + user.uid);
        return $firebaseObject(ref);
    }

    function getUserData(user) {
        var ref = new Firebase("https://attain-9cfb8.firebaseio.com/user/" + user);
        return $firebaseObject(ref);
    }

    function getLoggedInUser() {
        var user = localStorage.getItem('firebase:session::statusapp');
        if(user) {
            return JSON.parse(user);
        }
    }

        this.newUserRef = newUserRef;
        this.getUserData =  getUserData;
        this.getLoggedInUser = getLoggedInUser;
}]);
