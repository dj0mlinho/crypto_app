<?php

$url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
$parameters = [
    'start' => '1',
    'limit' => '5000',
    'convert'=> 'USD',
];
$headers = [
    'Accepts: application/json',
    'X-CMC_PRO_API_KEY: d7000a76-730d-487e-9566-a6bb4cde3ad8'
];
$qs = http_build_query($parameters);
$request = "{$url}?{$qs}"; // create the request URL

$curl = curl_init(); // Get cURL resource
// Set cURL options
curl_setopt_array($curl, array(
    CURLOPT_URL => $request,            // set the request URL
    CURLOPT_HTTPHEADER => $headers,     // set the headers 
    CURLOPT_RETURNTRANSFER => 1         // ask for raw response instead of bool
));
    

$json_response = curl_exec($curl); // response data in JSON
    
curl_close($curl); // Close request  

$fp = fopen('cryptoData.json', 'w');
fwrite($fp, $json_response);
fclose($fp);

return $json_response;
?>