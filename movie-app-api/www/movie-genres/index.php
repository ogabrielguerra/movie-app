<?php

    require '../bootstrap.php';

    $genre = new Genre();

    if(isset($_GET["ids"]) && !empty($_GET["ids"])){
        $ids = $_GET["ids"];
        $ar = explode(",", $ids);
        echo $genre->getGenresNamesByIds($ar);
    }

