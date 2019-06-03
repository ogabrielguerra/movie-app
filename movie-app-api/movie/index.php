<?php
    require '../bootstrap.php';
    $movie = new Movie();

    if(isset($_GET["id"]) && !empty($_GET["id"])){
        $id = $_GET["id"];
        echo json_encode($movie->getMovie($id));
    }else{
        echo "Error: parameter missing";
    }
