<?php

require '../bootstrap.php';

$movie = new Movie();
$poster = new Poster($movie);

if(isset($_GET["imgRef"]) && !empty($_GET["imgRef"])){
    $ref = $_GET["imgRef"];
    //$ref = '1dpXhMg4BEdT3TWTjhLAku0YgRs.jpg';
    $poster->getPoster($ref);
}else{
    echo "Error: parameter missing";
}

