<?php

$VALIDATIONS = Array(
  "firstname" => Array("regexp" => '.+', "error" => "Enter a name"),
  "lastname" => Array("regexp" => '.+', "error" => "Enter a name"),
  "heads" => Array("regexp" => '^\d+$', "error" => "Number of heads should be a whole number"),
    "dob" => Array("regexp" => '^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$', "error" => "Enter dates in  format DD/MM/YYYY"),
  "email" => Array("regexp" => '^.+@.+\..+$', "error" => "This address is not valid")
);
$ERRORS = Array();

if (isset($_GET["submit"])) {
  # form was submitted
  foreach ($VALIDATIONS as $field => $data) {
    if (!isset($_GET[$field])) continue; # skip any that aren't sent
    $regexpstr = $data["regexp"];
    if (preg_match("/$regexpstr/", $_GET[$field]) == 0) {
      $ERRORS[$field] = $data["error"];
    } 
  }
  if (count($ERRORS) == 0) echo "Data OK; now redirect!";
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>A simple PHP form using regular expressions for validation</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>A simple PHP form using regular expressions for validation</h1>
<form>
<?php
function field($name, $text) {
  global $ERRORS;
  echo "<p><label for=\"$name\"";
  if (array_key_exists($name,$ERRORS)) {
    echo " class=\"error\"";
  }
  echo ">$text</label>\n";
  echo "<input type=\"text\" id=\"$name\" name=\"$name\">\n";
  if (array_key_exists($name,$ERRORS)) {
    $err = $ERRORS[$name];
    echo "<span class=\"error\">$err</span>";
  }
  echo "</p>\n";
}

field("firstname", "First name");
field("lastname", "Last name");
field("heads", "Number of heads");
field("dob", "Date of birth (DD/MM/YYYY)");
field("email", "Email address of someone you don't like for spamming purposes");
?>
 <p><input type="submit" name="submit" value="Send answers"></p>
</form>
</body>
</html>

