import React from 'react'
import Base from './Base';
import Movie from "./Movie";
import Loader from "./Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class MoviesGrid extends Base {

    state = {
        moviesDataFromApi: "",
        moviesFiltered: "",
        filteredFirstTime : "",
        movies: [],
        dataReady: "",
        curPage: 1,
        start: 0,
        end: 20

    }

    constructor(props) {

        super(props);
        this.iniUrl = `${this.getApiPath()}movies`;
        this.numMoviesPerPage = 20;
        this.onChange = this.onChange.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.priorPage = this.priorPage.bind(this);

        //Push this path to History obj
	    this.path = super.getPath();
        this.setHistory(this.path)
    }

	componentWillMount() {
		this.loadData().then((data)=>{
			this.sortMovies(data, true)
		}).catch((e)=>{
			console.log('ERROR in [componentWillMount] ', e)
		})
    }

    componentDidMount() {
	    this._isMounted = true;
    }

	componentWillUnmount() {
		this._isMounted = false;
    }

	shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.moviesFiltered !== nextState.moviesFiltered){
            return true
        }else{
            return false
        }
    }

    async loadData(){
    	return Promise.resolve(
		    fetch(this.iniUrl)
			    .then(response => response.json())
			    .then((data)=>{
				    // Sort Movies for the first time
				    // this.sortMovies(data, true)
				    return data;
			    }).catch((e)=>{
			        console.log('ERROR IN [loadData] ', e)
		    })
	    )
    }

    sortMovies(movies, init=false){
    	// console.log("Sorting Movies... ");

            let filtered;
            let defaultMovies;

            //If Default Movies are defined, just use them. If not set the state
            if(init){
                defaultMovies = movies
            }else{
                defaultMovies = this.state.moviesDataFromApi
            }

            new Promise((resolve, reject)=> {
	            let j=0;

	            resolve(
		            filtered = movies.filter((movie)=>{
			            if(j>=this.state.start && j<this.state.end){
				            j++
				            return movie
			            }else{
				            j++
				            return ""
			            }
		            })
                )

            }).then(()=>{
	            if (this._isMounted) {
		            this.setState({
			            moviesFiltered: filtered,
			            filteredFirstTime: filtered,
			            dataReady: true,
			            moviesDataFromApi: defaultMovies
		            })
	            }
            }).catch((e)=>{
                console.log("ERROR IN [sortMovies] ", e)
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

	    if (this._isMounted) {
		    this.setState({
			    start: start,
			    end: end
		    }, () => {
			    this.sortMovies(this.state.moviesDataFromApi)
		    })
	    }
    }

    nextPage(){
        if(this.state.curPage < 10) {
	        if (this._isMounted) {
		        this.setState({
			        curPage: this.state.curPage + 1
		        }, () => {
			        this.handlePages()
		        })
	        }
        }
    }

    priorPage(){
        if(this.state.curPage > 1){
	        if (this._isMounted) {
		        this.setState({
			        curPage: this.state.curPage - 1
		        }, () => {
			        this.handlePages()
		        })
	        }
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

                if(this.state.moviesFiltered !== filtered){
                    this.setState({
	                    moviesFiltered : filtered
                    })
                }

            }else{
                this.setState({
	                moviesFiltered : defaultState
                })
            }

        }, 500);
    }

    render(){

        const RenderMe = ()=>{
            if(this.state.moviesFiltered.length > 0){
                return ( this.state.moviesFiltered.map((obj)=> <Movie key={obj.id} data={obj} />) )
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