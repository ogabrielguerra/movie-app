<?php

class Movie{

    private $data = [];
    private $numPages = 11;

    function writeCache(){

        $limit = $this->numPages + 1;

        for($i=1; $i<$limit; $i++){
            $url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=1f54bd990f1cdfb230adb312546d765d&page='.$i;
            $json = json_decode(file_get_contents($url));

            foreach ($json->results as $movie){
                array_push($this->data, $movie);
            }
        }

        try{
            $writeCache = fopen('../cache/movies.json', 'w');
            fwrite($writeCache, json_encode($this->data));
            fclose($writeCache);
            return true;
        }catch(Exception $e){
            return false;
        }
    }

    function getMoviesDataFromCache($rebuildCache=false){

        $file = '../cache/movies.json';

        if($rebuildCache || !file_exists($file)){
            $this->writeCache();
        }

        return file_get_contents($file);
    }

    function getMovie(int $id=null){
        if($id!=null){
            $data = json_decode($this->getMoviesDataFromCache());

            foreach ($data as $movie){
                if($id === $movie->id){
                    return $movie;
                }
            }
            return false;
        }
    }
}