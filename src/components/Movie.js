import React from 'react';
import Poster from './Poster';
import Base from './Base';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import Loader from "./Loader";
import axios from "axios";
import Genre from "./Genre";

class Movie extends Base{

    state=(
        {
            data : this.props.data,
            posterState : "show",
            detailsState : "hide details",
            toHome : false,
            genresNames : [],
        }
    )

    constructor(props){
        super(props)
        this.path = super.getPath();
        this._isMounted = false;

        // Binds
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.sendDetails = this.sendDetails.bind(this);

    }

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

    componentWillMount() {
        let urlGenres = `/movie-app-api/movie-genres/?ids=${this.state.data.genre_ids}`;
        axios.get(urlGenres)
            .then((response)=>{
	            if (this._isMounted) {
		            this.setState(
			            {
				            ready: true,
				            genresNames: this.state.genresNames.concat(response.data)
			            }
		            )
	            }
            }).catch((e)=>{
            	console.log('ERROR IN [componentWillMount] ', e)
        })
    }

    shouldComponentUpdate(nextState) {
        if(this.state.genresNames !== nextState.genresNames){
            return true
        }else{
            return false
        }
    }

    onMouseOver(){
        if(this.state.ready===true) {
	        if (this._isMounted) {
		        this.setState({
			        posterState: "hide",
			        detailsState: "show details"
		        })
	        }
        }
    }

    onMouseOut(){
	    if (this._isMounted) {
		    this.setState({
			    posterState: "show",
			    detailsState: "hide details"
		    })
	    }
    }

    sendDetails(e){
        e.preventDefault();
	    if (this._isMounted) {
		    this.setState({
			    toHome: true,
			    data: this.props.data
		    })
	    }
    }

    render(){
        let imagePath = this.props.data.poster_path;
		// console.log(imagePath)
        if(!this.state.toHome){

            if(!this.state.genresNames){
                return(<div><Loader/></div>)
            }else{
                return (
                    <div className="col-md-3">
                        <div className="movie" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                            <div className="imageBox">
                                <div ref="posterBox">
                                    <Poster image={imagePath} />
                                </div>

                                <div className={this.state.detailsState}>
                                    <div className="details" >
                                        <button className="btn btn-primary btn-lg" onClick={this.sendDetails} >See details</button>
                                    </div>
                                </div>
                            </div>

                            <h4>{this.props.data.title}</h4>
                            <hr/>
                            <div className="releaseDate">
                                <FontAwesomeIcon icon="calendar-alt"/> Release Date: {this.dateFormat(this.props.data.release_date)}
                            </div>
                            { this.state.genresNames.map((genre, key)=> <Genre name={genre} key={key}/> ) }

                            <hr/>

                        </div>
                    </div>
                );
            }

        }else{
            let url = `${this.path}movie/${this.state.data.id}`;

            return(
                <Redirect from="/" to={{pathname:url, state:{} }} />
            )
        }
    }
}

export default Movie;