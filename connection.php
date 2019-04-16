<?php

class Connection {

    public static function make() {

        try {
            return new PDO("mysql:host=localhost;dbname=crypto_db", "root", "");
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}


?>