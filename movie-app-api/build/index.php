<?php

require '../bootstrap.php';

class CacheBuilder{
    function __construct($movie, $poster, $genre)
    {
        $movie->writeCache();
        $poster->writeCache();
        $genre->writeCache();
        echo "Cache built succesfully!";
    }
}

$movie = new Movie();
$poster = new Poster($movie);
$genre = new Genre();
$cache = new CacheBuilder($movie, $poster, $genre);