<?php

require "boot.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $query = $_REQUEST["query"];
    // logic depending on $_POST request
    switch ($query) { 
        case "newUser":
            $json_data = file_get_contents("php://input");
            $user_data = json_decode($json_data);
            $result = $db->newUser($user_data);
            echo $json_data;
            break;
        case "getOneUser":
            $json_data = file_get_contents("php://input");
            $user_data = json_decode($json_data);
            $result = $db->getOneUser($user_data);
            echo $result;
            break;            
        default:
            break;
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    
    $query = $_GET["query"];
    // logic depending on $_GET request
    switch ($query) {

        case "getCryptoData": 
            $result = require "cryptoData.php";
            echo $result;
            break;
        case "getAllUsers":
            $result = $db->getAllUsers();
            echo $result;
            break;       
        default:
            break;
    }
}

?>