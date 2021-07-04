<?php
require '../bootstrap.php';

$movie = new Movie();
echo $movie->getMoviesDataFromCache(false);