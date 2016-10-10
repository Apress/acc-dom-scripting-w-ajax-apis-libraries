<?php

require_once "validation.php";

$ERRORS = Array();

if (isset($_GET["submit"])) {
  # form was submitted
  foreach ($_GET as $field => $data) {
    $check = validate($field, $data);
    if ($check != "") {
      $ERRORS[$field] = $check;
    } 
  }
  if (count($ERRORS) == 0) echo "Data OK; now redirect!";
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>A simple PHP form using separate code for validation</title>
<link rel="stylesheet" href="styles.css">
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.pack.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  $('input[@type=text]').blur(function(){
    thisfield = this;
    $.getJSON("ajax-validate.php",{
      "field": this.name, 
      "value": this.value
    }, function(data) {
      if (data == "") {
        $(thisfield).siblings("span.error").empty();
      } else {
        $(thisfield).siblings("span.error").append(data);
      }
    });
  });
});
</script>
</head>
<body>
<h1>A simple PHP form using separate code for validation</h1>
<form>
 <p><label for="dayofyear">Favourite day of the year (1-365)</label>
    <input type="text" id="dayofyear" name="dayofyear">
    <span class="error">
    <?php if (array_key_exists("dayofyear",$ERRORS)) echo $ERRORS["dayofyear"]; ?>
    </span>
 </p>
 <p><label for="date">Favourite date of all time</label>
    <input type="text" id="date" name="date">
    <span class="error">
    <?php if (array_key_exists("date",$ERRORS)) echo $ERRORS["date"]; ?>
    </span>
 </p>
 <p><label for="word">Favourite word</label>
    <input type="text" id="word" name="word">
    <span class="error">
    <?php if (array_key_exists("word",$ERRORS)) echo $ERRORS["word"]; ?>
    </span>
 </p>
 <p><input type="submit" name="submit" value="Send answers"></p>
</form>
</body>
</html>

