"use strict";

angular.module("cryptoApp")
    .controller("usersListCtrl", function($rootScope, $scope, db) {

        // check if users data is already pulled into $rootScope.usersData. if not, do it
        if ($rootScope.usersData === undefined) {
            db.getAllUsers()
            .then((res) => {
                $rootScope.usersData = res.data;
                console.log($rootScope.usersData);
            });
        }
        console.log($rootScope.usersData);
    });