<?php

function validate($field, $value) {
  switch ($field) {
    case "dayofyear": 
      if (is_numeric($value) && intval($value) > 0 && intval($value) <= 365) {
        return "";
      } else {
        return "Day of year must be between 1 and 365";
      }
      break;
      
    case "date":
      if (strtotime($value) === false) {
        return "Invalid date (try 10 September 2000, +1 week, or next Thursday)";
      } else {
        return "";
      }
      break;
      
    default:
      return "";
  }
}
