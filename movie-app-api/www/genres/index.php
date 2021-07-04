<?php

require '../bootstrap.php';

$genre = new Genre();

$json = $genre->getGenres();
echo $json;