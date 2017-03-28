<?php

require 'connection.php';
$conn    = Connect();

if(!isset($_POST['_fid_11']) && !isset($_POST['_fid_16'])){
    return false;
}
//Setup the Post Vars
$fname    = $conn->real_escape_string($_POST['_fid_11']);
$lname    = $conn->real_escape_string($_POST['_fid_12']);
$email    = $conn->real_escape_string($_POST['_fid_14']);
$phone    = $conn->real_escape_string($_POST['_fid_13']);
$city     = $conn->real_escape_string($_POST['_fid_15']);
    if(!isset($_POST['_fid_29'])){
       $realtor = "No";
    }else{
        $realtor  = $conn->real_escape_string($_POST['_fid_29']);
    }

    if(!isset($_POST['_fid_30'])){
        $realtorName = '';
    }else{
        $realtorName  = $conn->real_escape_string($_POST['_fid_30']);
    }
$consent  = $conn->real_escape_string($_POST['_fid_16']);

//Insert
$query   = "INSERT into submits 
            (first_name,last_name, phone, email, city, realtor, realtor_name, consent)
            VALUES('" . $fname . "','" . $lname . "','" . $email . "','" . $phone . "','" . $city . "','" . $realtor . "','" . $realtorName . "','" . $consent . "' )";


$success = $conn->query($query);
 
if (!$success) {
    die("Couldn't enter data: ".$conn->error);
    return false;
}else{
    echo "Thanks";
   
}
 

  $conn->close();

 
?>