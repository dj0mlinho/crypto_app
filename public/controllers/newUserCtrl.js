angular.module("cryptoApp")
    .controller("newUserCtrl", function ($rootScope, $scope, db) {

        // object for registering new user
        $scope.newUserData = {
            firstName: "",
            lastName: "",
            initialInvestment: ""
        };
        
        // new user entry
        $scope.newUser = () => {

            db.newUser($scope.newUserData)
            .then((res) => {
                console.log(res.data)
                if (typeof res.data !== "string") {
                    // fill $rootScope.userData with new registered user data
                    $rootScope.currentUserData = res.data;
                    // prepare for newInvestment.html display
                    $rootScope.currentUserData.existing_user = false;
                    console.log($rootScope.currentUserData);
                    location.assign("#/newInvestment");
                } else {
                    // error handling
                    console.log(res.data)
                }
            });
        };
    });