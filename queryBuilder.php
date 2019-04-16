<?php

class QueryBuilder {

    private $pdo;
    function __construct($pdo) {

        $this->pdo = $pdo;
    }

    public function newUser($user_data) {
        
        $first_name = $user_data->firstName;
        $last_name = $user_data->lastName;
        $initial_investment = $user_data->initialInvestment;
        $total_investment = $user_data->initialInvestment;
        
        
        $sql = $this->pdo->prepare("INSERT INTO users VALUES 
                                  (NULL, '$first_name', '$last_name', '$initial_investment', '$total_investment', NULL)");
        $result = $sql->execute();
        if ($result) {
            // new user entry successful, return user info
            $user = $this->getOneUser($user_data);
            return $user;
        } else {
            // error in new user entry
            return "error";
        }
    }

    public function newInvestmentEntry($investment_data) {


    } 
 
    public function getAllUsers() {

        $sql = $this->pdo->prepare("SELECT * FROM users");
        $sql->execute();
        $result = $sql->fetchAll();
        if ($result) {
            // successful data pull 
            return json_encode($result);
        } else {
            // error in data pulling 
            return "error";
        } 
    }

    public function getOneUser($user_data) {
        
        $first_name = $user_data->firstName;
        $last_name = $user_data->lastName;
        
        $sql = $this->pdo->prepare("SELECT * FROM users WHERE firstName='$first_name' AND lastName='$last_name'");
        $sql->execute();
        $result = $sql->fetch();
        if ($result) {
            return json_encode($result);
        } else {
            return "error";
        }
    }
}

return new QueryBuilder(Connection::make());

?>