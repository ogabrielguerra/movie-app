import React from 'react'
import axios from "axios";
import Movie from "./Movie";
import Loader from "./Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class MoviesGrid extends React.Component {

    state = {
        moviesDataFromApi: "",
        filtered: "",
        filteredFirstTime : "",
        movies: [],
        dataReady: "",
        curPage: 1,
        start: 0,
        end: 20

    }

    constructor(props) {
        super(props);
        this.iniUrl = "/movie-app-api/movies/";
        this.numMoviesPerPage = 20;
        this.onChange = this.onChange.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.priorPage = this.priorPage.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.filtered !== nextState.filtered){
            return true
        }else{
            return false
        }
    }

    loadData(){
        axios.get(this.iniUrl)
            .then((movies) => {
                movies = movies.data
                this.fetchData(movies, true);
            })
            .then(()=>{
                return true
            });
    }

    fetchData(movies, init=false){
            let filtered;
            let defaultMovies;

            if(init){
                defaultMovies = movies
            }else{
                defaultMovies = this.state.moviesDataFromApi
            }

            new Promise((resolve)=> {
                resolve(movies)

            }).then(()=>{
                let j=0;
                filtered = movies.filter((movie)=>{
                    if(j>=this.state.start && j<this.state.end){
                        j++
                        return movie
                    }else{
                        j++
                        return ""
                    }
                })

            }).then(()=>{
                this.setState({
                    filtered : filtered,
                    filteredFirstTime : filtered,
                    dataReady : true,
                    moviesDataFromApi : defaultMovies
                })
            }).catch((e)=>{
                console.log(e, " An embarrassing error *_*")
            });
    }

    handlePages(){
        let start;
        let end;

        if(this.state.curPage === 1){
            start = this.state.curPage - 1;
        }else{
            start = (this.state.curPage * this.numMoviesPerPage)-this.numMoviesPerPage;
        }

        end = start + this.numMoviesPerPage;

        this.setState({
            start : start,
            end : end
        }, ()=>{
            this.fetchData(this.state.moviesDataFromApi)
        })
    }

    nextPage(){
        if(this.state.curPage < 10) {
            this.setState({
                curPage: this.state.curPage + 1
            },()=>{
                this.handlePages()
            })
        }
    }

    priorPage(){
        if(this.state.curPage > 1){
            this.setState({
                curPage: this.state.curPage - 1
            },()=>{
                this.handlePages()
            })
        }
    }

    onChange(e){
        e.preventDefault();

        let needle = this.refs.search.value.toLowerCase();
        let filtered = [];
        let defaultState = this.state.filteredFirstTime;

        //Delay the event a bit
        setTimeout(()=>{

            if(needle !== undefined && needle.length>1){

                filtered = this.state.moviesDataFromApi.filter((movie)=>{
                    if(movie.title.toLowerCase().indexOf(needle)!==-1){
                        return movie
                    }else{
                        return ""
                    }
                })

                if(this.state.filtered != filtered){
                    this.setState({
                        filtered : filtered
                    })
                }

            }else{
                this.setState({
                    filtered : defaultState
                })
            }

        }, 500);
    }

    render(){

        const RenderMe = ()=>{
            if(this.state.filtered.length > 0){
                return ( this.state.filtered.map((obj)=> <Movie key={obj.id} data={obj} />) )
            }else{
                return (
                    <div className="col-12 text-center mt-5 mb-5"><h2>No movie found :(</h2></div>
                )
            }
        }

        const Nav = ()=>{
            return (
                <div className="row mt-5">
                    <div className="col-3 text-right">
                        <button className="btn btn-secondary rounded mr-3" onClick={this.priorPage}><FontAwesomeIcon icon="angle-left"/></button>
                    </div>
                    <div className="col-6 text-center">Page {this.state.curPage} of 10</div>
                    <div className="col-3 text-left">
                        <button className="btn btn-secondary rounded" onClick={this.nextPage}><FontAwesomeIcon icon="angle-right"/></button>
                    </div>
                </div>
            )
        }

        if(this.state.dataReady===true) {
            return (
                <div className="container">
                    <Nav/>
                    <div className="searchBox mt-5">
                        <div className="row">
                            <input type="text" placeholder="Search a movie" className="form-control" ref="search" onChange={this.onChange}/>
                            <small className="mt-2">(!) minimum of 2 characters</small>
                        </div>
                    </div>
                    <div className="row">{ <RenderMe/> }</div>
                    <Nav/>
                    <hr />
                </div>
            )
        }else{
            return(
            <div>
                <div className="row mt-5">
                    <div className="col-12 text-center mt-5">
                        <Loader/>
                    </div>
                </div>
            </div>
            )
        }
    }
}

export default MoviesGrid;