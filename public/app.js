"use strict";

angular.module("cryptoApp", [
    "ngRoute"
], function ($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix("");
    $routeProvider
    .when("/", {
        templateUrl: "public/pages/startAction.html",
        controller: "startCtrl"
    })
    .when("/usersList", {
        templateUrl: "public/pages/usersList.html",
        controller: "usersListCtrl"
    })
    .when("/newInvestment", {
        templateUrl: "public/pages/newInvestment.html",
        controller: "newInvestmentCtrl"
    })
    .when("/newUser", {
        templateUrl: "public/pages/newUser.html",
        controller: "newUserCtrl"
    });
});
// $rootScope.cryptoData
// $rootScope.currentUserData - data for user with pending investment
// $rootScope.usersList all users data
// $rootScope.usersList and $rootScope.currentuserData come in wierd format





















