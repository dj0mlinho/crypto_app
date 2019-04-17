'use strict';

angular
  .module('cryptoApp')
  .controller('newInvestmentCtrl', function($rootScope, $scope, db) {
    // template for generating a new row in a newInvestment.html after coin choice
    let cryptoRowTemplate = document.querySelector(
      "script[type='cryptoRowTemplate']"
    ).innerHTML;
    // crypto rows data
    $scope.cryptoRowsData = [];

    // object for finding a particular user
    $scope.userIdentificationData = {
      firstName: '',
      lastName: ''
    };

    $scope.findUser = () => {
      db.getOneUser($scope.userIdentificationData).then(res => {
        $scope.userData = res.data;
        console.log($scope.userData);
      });
    };

    // dropdown menu show
    $scope.dropdownMenu = () => {
      document.getElementById('myDropdown').classList.toggle('show');
    };
    // dropdown menu filter
    $scope.dropdownFilter = () => {
    //   console.log($rootScope.cryptoData);
      var input, filter, a, i, div, txtValue;
      input = document.getElementById('myInput');
      filter = input.value.toUpperCase();
      div = document.getElementById('myDropdown');
      a = div.querySelectorAll('div.dropdown-field');
      for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = '';
        } else {
          a[i].style.display = 'none';
        }
      }
    };

    // reacting on each add/delete action
    $scope.updateCryptoData = (newCryptoName, newCryptoPrice) => {
      if (newCryptoName !== null) {
        // add action
        // check if that cryptoname exists
        let foundAt = null;
        for (let i = 0; i < $scope.cryptoRowsData.length; i++) {
          if ($scope.cryptoRowsData[i].name === newCryptoName) {
            foundAt = i;
          }
        }
        if (foundAt === null) {
          // new crypto
          $scope.cryptoRowsData.push({
            name: newCryptoName,
            price: newCryptoPrice,
            totalValue: 0
          });
        }
        renderCryptoRows();
      } else {
        // delete action
        let selectedCoinName =
          event.target.parentElement.parentElement.children[0].innerHTML;
        for (let i = 0; i < $scope.cryptoRowsData.length; i++) {
          if ($scope.cryptoRowsData[i].name === selectedCoinName) {
            $scope.cryptoRowsData.splice(i, 1);
          }
        }
        renderCryptoRows();
      }
    };
    // rendering crypto rows after each add/delete
    function renderCryptoRows() {
      let cryptoRowsContainer = document.querySelector(
        'div.cryptoRowsContainer'
      );
      let inside = '';
      // render existing rows
      for (let i = 0; i < $scope.cryptoRowsData.length; i++) {
        inside += cryptoRowTemplate
          .replace('$$cryptoRowIndex$$', i)
          .replace('$$cryptoName$$', $scope.cryptoRowsData[i].name)
          .replace('$$cryptoAmount$$', $scope.cryptoRowsData[i].amount || 0)
          .replace(
            '$$totalValue$$',
            $scope.cryptoRowsData[i].totalValue.toFixed(2) + '$'
          );
      }
      cryptoRowsContainer.innerHTML = inside;
      // add listeners to delete buttons
      let deleteBtns = document.querySelectorAll('button.delete-row-btn');
      for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function() {
          $scope.updateCryptoData(null, null);
        });
      }
      // add listeners to inputs
      let amountInputs = document.querySelectorAll('input.coin-amount-input');
      for (let i = 0; i < amountInputs.length; i++) {
        amountInputs[i].addEventListener('blur', updateCoinAmount);
      }
    }
    // update coin amount
    function updateCoinAmount() {
      let selectedCoinName = this.parentElement.previousElementSibling
        .innerHTML;
      let amount = this.value;
      // update $scope.cryptoRowsData
      for (let i = 0; i < $scope.cryptoRowsData.length; i++) {
        if ($scope.cryptoRowsData[i].name == selectedCoinName) {
          $scope.cryptoRowsData[i].amount = amount;
          $scope.cryptoRowsData[i].totalValue =
            Number($scope.cryptoRowsData[i].amount) *
            Number($scope.cryptoRowsData[i].price);
        }
      }
      renderCryptoRows();
      // calculate fullValue
      let coinValue = 0;
      $scope.cryptoRowsData.forEach(coin => {
        if (coin.amount > 0) {
          coinValue += Number(coin.price) * Number(coin.amount);
        }
      });

      document.querySelector('.fullValue').innerHTML =
        Number(coinValue).toFixed(2) + '$';

      // calculate valueRemain
      document.querySelector('.valueRemain').innerHTML =
        (Number(document.querySelector('.initialInvestment').innerHTML).toFixed(2) - Number(coinValue).toFixed(2))   + '$';
    }
    // adding another crypto row
    // $scope.anotherCryptoRow = (cryptoName, cryptoPrice) => {

    //     // crypto row display
    //     cryptoRowsContainer.innerHTML += cryptoRow;
    //     // push crypto data
    //     $scope.cryptoRowsData.push({
    //         name: cryptoName,
    //         price: cryptoPrice
    //     });
    //     // add event listener for amount input and delete button
    //     cryptoRowsContainer.children[$scope.cryptoRowsData.length - 1].children[1].children[0]
    //     .addEventListener("blur", anotherCryptoAmount);
    //     cryptoRowsContainer.children[$scope.cryptoRowsData.length - 1].children[3].children[0]
    //     .addEventListener("click", deleteCryptoRow);
    // };
    // // adding coin amount in a crypto row
    // function anotherCryptoAmount() {

    //     let cryptoValue = this.value;
    //     let parentElement = this.parentNode.parentNode;
    //     let index = parentElement.getAttribute("data-row-index");
    //     // add amount to $scope.cryptoRowsData
    //     let totalValue;
    //     for (let i = 0; i <   $scope.cryptoRowsData.length; i++) {
    //         if (i == index) {
    //             $scope.cryptoRowsData[i].amount = cryptoValue;
    //             totalValue = Number($scope.cryptoRowsData[i].amount) * Number($scope.cryptoRowsData[i].price);
    //         }
    //     }
    //     // display amount
    //     parentElement.children[2].innerHTML = totalValue + "$";
    // };
    // // deleting crypto row
    // function deleteCryptoRow() {

    //     let parentElement = this.parentNode.parentNode;
    //     let index = parentElement.getAttribute("data-row-index");
    //     // display change
    //     parentElement.parentNode.removeChild(parentElement);
    //     // remove from  $scope.cryptoRowsData
    //     for (let i = 0; i <   $scope.cryptoRowsData.length; i++) {
    //         if (i == index) {
    //             $scope.cryptoRowsData.splice(i, 1);
    //         }
    //     }
    //     console.log($scope.cryptoRowsData);
    // };

    // reset $rootScope.currentUserData.existing_user after successfull new investment
  });
