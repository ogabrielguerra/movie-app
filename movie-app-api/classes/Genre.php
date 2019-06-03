<?php

class Genre {

    function writeCache(){

        $url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=1f54bd990f1cdfb230adb312546d765d';
        $json = json_decode(file_get_contents($url));

        try{
            $writeCache = fopen('../cache/genres.json', 'w');
            fwrite($writeCache, json_encode($json));
            fclose($writeCache);
            return true;
        }catch(Exception $e){
            return false;
        }
    }

    function getGenres(){
        $file = '../cache/genres.json';

        if(!file_exists($file)){
            $this->writeCache();
        }

        return file_get_contents($file);
    }

    function getGenresNamesByIds(Array $ids){
        $genres = json_decode($this->getGenres())->genres;

        $movieGenres = [];
        foreach ($genres as $genre){
            if(in_array($genre->id, $ids)){
                array_push($movieGenres, $genre->name);
            }
        }

        return json_encode($movieGenres);

    }

}