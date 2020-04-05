# MOVIE APP
A React App which consumes data from The Movie DB API (https://api.themoviedb.org/3/movie/upcoming)

#### App Url   
http://appmovies.gabrielguerra.me

## TO DO
- Refactor using **hooks**;
- Implement cache in React level.

## A NEW LAYER

The PHP API works as a cache layer fetching all data from https://api.themoviedb.org/3/movie/upcoming API and storing it as static data in the server.

To achieve this goal we've used Lumen, a fast, low resources and slim Micro Framework, very familiar to one who knows Laravel.  was used.

### WHY?
- Reduce calls to the original API;
- Flexibility to compose data as we want;
- Avoid API limiting the number of calls;
- Low cost performance strategy which could be easily extended to a CDN or static server like AWS S3 Buckets.

#### PHP API Url  
http://apis.gabrielguerra.me/movie-app/v2/

### Endpoints
* /build - Build cache, writing json and files to the cache directory.
* /movies - Returns cached json for movies
* /movie/{id} - Returns cached json for movies
* /genres - Returns cached json for genres
* /genres/names/{id1,id2,id3 ...} - Returns cached json for genres names
