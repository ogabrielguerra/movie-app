# MOVIE APP
A React App which consumes data from The Movie DB API (https://api.themoviedb.org/3/movie/upcoming)

#### App Url   
http://appmovies.gabrielguerra.me

## The PHP API

The PHP API works as a cache layer fetching all data from https://api.themoviedb.org/3/movie/upcoming API and storing it as static data in the server.

To achieve this goal we've used Lumen, a fast, low resources and slim Micro Framework, very familiar to one who knows Laravel.  was used.

#### PHP API Url  
http://apis.gabrielguerra.me/movie-app/v2/

### Endpoints
* /build - Build cache, writing json and files to the cache directory.
* /movies - Returns cached json for movies
* /movie/{id} - Returns cached json for movies
* /genres - Returns cached json for genres
* /genres/names/{id1,id2,id3 ...} - Returns cached json for genres names
