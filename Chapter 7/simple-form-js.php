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

<script type="text/javascript">

validator = {
  VALIDATIONS: {
<?php
    foreach ($VALIDATIONS as $field => $data) {
      $regexpstr = $data["regexp"];
      $errorstr = $data["error"];
      echo "\"$field\": { 'regexp': /$regexpstr/, 'error': '$errorstr' },\n";
    }
?>
  },
  
  init: function() {
    // check this browser has the chops to do the DOM scripting we need
    if (!document.getElementById) return;
    
    // Walk through the VALIDATIONS list and for each one find the field
    //  it applies to and attach an onBlur handler, so when the user leaves
    //  the field, it checks the contents of the field against the regexp.
    for (fieldname in validator.VALIDATIONS) {
      fld = document.getElementById(fieldname);
      if (!fld) continue; // ignore this field if it doesn't exist in the page
      validator.addEvent(fld, "blur", validator.checkField);
    }
  },
  
  checkField: function(e) {
    fld = window.event ? window.event.srcElement : e.target;
    fieldname = fld.id;
    if (validator.VALIDATIONS[fieldname]) {
      re = validator.VALIDATIONS[fieldname]["regexp"];
      if (fld.value.search(re) == -1) {
        // the regular expression didn't match
        // find the span.error element for this field and put the error message in it
        span = fld.parentNode.getElementsByTagName('span')[0];
        span.innerHTML = validator.VALIDATIONS[fieldname]["error"];
      } else {
        // the regular expression *did* match
        // remove the error message!
        span = fld.parentNode.getElementsByTagName('span')[0];
        span.innerHTML = "";
      }
    }
  },
  
  addEvent: function( obj, type, fn ) {
  	if (obj.addEventListener) {
  		obj.addEventListener( type, fn, false );
  	} else if (obj.attachEvent) {
  		obj["e"+type+fn] = fn;
  		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
  		obj.attachEvent( "on"+type, obj[type+fn] );
  	}
  }
}

validator.addEvent(window, "DOMContentLoaded", validator.init);
</script>

</head>
<body>
<h1>A simple PHP form using regular expressions for validation</h1>
<form>
 <p><label for="firstname">First name</label>
    <input type="text" id="firstname" name="firstname">
    <span class="error">
    <?php if (array_key_exists("firstname",$ERRORS)) echo $ERRORS["firstname"]; ?>
    </span>
 </p>
 <p><label for="lastname">Last name</label>
    <input type="text" id="lastname" name="lastname">
    <span class="error">
    <?php if (array_key_exists("lastname",$ERRORS)) echo $ERRORS["lastname"]; ?>
    </span>
 </p>
 <p><label for="heads">Number of heads</label>
    <input type="text" id="heads" name="heads">
    <span class="error">
    <?php if (array_key_exists("heads",$ERRORS)) echo $ERRORS["heads"]; ?>
    </span>
 </p>
 <p><label for="dob">Date of birth (DD/MM/YYYY)</label>
    <input type="text" id="dob" name="dob">
    <span class="error">
    <?php if (array_key_exists("dob",$ERRORS)) echo $ERRORS["dob"]; ?>
    </span>
 </p>
 <p><label for="email">Email address of someone you don't like for 
    spamming purposes</label>
    <input type="text" id="email" name="email">
    <span class="error">
    <?php if (array_key_exists("email",$ERRORS)) echo $ERRORS["email"]; ?>
    </span>
 </p>
 <p><input type="submit" name="submit" value="Send answers"></p>
</form>
</body>
</html>

