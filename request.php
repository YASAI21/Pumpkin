<?php
$response = file_get_contents("http://" . $_GET['server'] . "/api/" . $_GET['api']);
$data = simplexml_load_string($response);
$json = json_encode($data);
echo($json);
?>