"use strict";

angular.module("cryptoApp")
    .controller("startCtrl", function ($rootScope, $scope, db) {
        
        // user data for pending new investment
        $rootScope.currentUserData = {
            firstName: "",
            lastName: "",
            initialInvestment: "",
            existingUser: true
        };

        // test
        db.getCryptoDataTest()
        .then((res) => {

            $rootScope.cryptoData = res.data.data;
        });


        // on app intialization fill $rootScope.cryptoData with cryptocurrency data
        // db.getCryptoData()
        // .then((res) => {
        //     $rootScope.cryptoData = res.data.data;
        // });

    });