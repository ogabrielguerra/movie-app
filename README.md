# MOVIE APP
A React App which consumes data from The Movie DB API

**App Url**   
https://gabrielguerra.me/movie-app/

**PHP API Url**  
https://gabrielguerra.me/movie-app-api/

## The Problem / Bottleneck
Typically for this kind of App images are the bottleneck followed by number of requests.

To follow the requirements would be necessary to show more than the 20 initial images, so we had to gain more control over the data, in order to avoid to many API requests.

Therefore, a new PHP API (Movie App API) was created between the APP and the first data source (Movie DB API). 

## The PHP API

The PHP API is a simple set of classes related to App's components

In this API a cache builder was coded to:

1. Create a local copy for each movie poster
2. Create custom calls for each App feature (for instance, get genres names from a list of ids)
3. Create a json file containing all movies objects
4. Create a json file containing all genres objects

### Endpoints
* **/build**
Build cache, writing json and files to the cache directory.

* **/movies**
Returns a cached json for movies

* **/movie/?id={id}**
Returns a cached json for movies

* **/genres**
Returns a cached json for genres

* **/movies-genres/?ids={id1,id2,id3}**
Returns a json with genres names

* **/poster/?imgRef={imgReference}**
Returns a json with the path of a cached image (poster)

#### Running the cache builder
Just go to this url: https://www.gabrielguerra.me/movie-app-api/build/

In the future we could control cache expiration or manipulate data easily favoring implementation of new feature.



## App Strategy / Architecture

The App functioning is based on loading all json data (about 100Kb) once and then filtering it. 

**Images:** are fetched from The Movie DB server with **PHP API Cache Builder** and copied to the assets directory and then loaded as local files, **avoiding a request per image**.

**Routing:** a router (react-router-dom) decides which component to load. The movie in details page is matched by url ID.

**Initial state:** the App loads all movie data from the PHP API json, so we don't need to make a request for each page.
Since data is loaded, we fetch (fetchData()) filtered objects and render.

**Pagination:** clicking in pagination buttons triggers an event that will alter the current page's state value through a handler method. The setState is hooked to fetchData(), so movies are filtered and re-rendered.

**Search:** a onChange method listens to search box changes. If a change is detected, objects are filtered and the component's state is updated.



* * *
