"use strict";

angular.module("cryptoApp")
    .factory("db", function($http) {

        return {

            newUser: (newUserData) => {

                return $http({
                    url: "queryLogic.php?query=newUser",
                    method: "post",
                    data: newUserData
                });
            },
            getAllUsers: () => {

                return $http({
                    url: "queryLogic.php?query=getAllUsers",
                    method: "get"
                });
            },
            getOneUser: (userData) => {

                return $http({
                    url: "queryLogic.php?query=getOneUser",
                    method: "post",
                    data: userData
                });
            },
            getCryptoData: () => {

                return $http({
                    url: "queryLogic.php?query=getCryptoData",
                    method: "get"
                });
            },
            getCryptoDataTest: () => {

                return $http({
                    url: "cryptoData.json",
                    method: "get"
                });
            },             
        };
    });