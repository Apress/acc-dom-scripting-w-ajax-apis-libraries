<?php

require_once "validation.php";
require_once 'JSON.php';

$field = $_GET["field"];
$value = $_GET["value"];

if (!isset($field) || !isset($value)) {
  return_json("");
  die();
}

$check = validate($field, $value);
return_json($check);
die();

function return_json($data) {
  $json = new SERVICES_JSON();
  echo $json->encode($data);
}

?>
