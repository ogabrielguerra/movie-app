<?php

class Poster{

    private $movie;

    function __construct(Movie $movie){
        $this->movie = $movie;
    }

    function writeCache(){
        $json = json_decode($this->movie->getMoviesDataFromCache(false));
        $baseUrl = 'https://image.tmdb.org/t/p/w342/';

        foreach ($json as $movie){
            $poster = substr($movie->poster_path, 1);
            $input = $baseUrl.$poster;
            $output = './../cache/posters/'.$poster;

            if(!file_exists($output)){
                if(!file_put_contents($output, file_get_contents($input))){
                    echo 'ERRO '.$poster.'<br>';
                }
            }
        }
    }

    function writeASinglePosterCache(){

    }

    function getPoster(String $imageRef){
        $poster = 'https://gabrielguerra.me/movie-app-api/cache/posters/'.$imageRef;
        echo $poster;
    }


}