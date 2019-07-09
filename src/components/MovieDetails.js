import React from 'react';
import { withRouter } from 'react-router-dom';
import Poster from "./Poster";
import Base from './Base';
import axios from "axios";
import Loader from "./Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Genre from "./Genre";

class MovieDetails extends Base{

    constructor(props){
        super(props);
        this.path = super.getPath();

        this.state = {
            title : "",
            releaseDate : "",
            overview : "",
            imagePath : "",
        };
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        let urlMovie =  `/movie-app-api/movie/?id=${id}`;

        //Get genres' names from props (passed by Movie comp) *
        this.genresNames = this.props.location.state.genres;

        axios.get(urlMovie)
            .then((response)=>{
                this.setState(
                    {
                        title : response.data.title,
                        releaseDate : response.data.release_date,
                        overview : response.data.overview,
                        imagePath : response.data.poster_path
                    }
                )
        }).catch((e)=>{
        	console.log("ERROR");
        })
    }

    componentDidMount() {
    	console.log(this.props.location.state.genres)
    }

	render(){

        if(this.state.imagePath !== ""){

            return(
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-12 text-right">
                            <a href={this.path} className="btn btn-primary btn-lg"><FontAwesomeIcon icon="angle-left"/> Back to movies</a>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <h4 className="s">Movie Details</h4>
                            <hr/>

                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <div className="imageBox">
                                        <div ref="posterBox">
                                            <Poster image={this.state.imagePath} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <h1>{this.state.title}</h1>
	                                {this.genresNames.map((genre, key)=> <Genre name={genre} key={key}/> )}
                                    {/*{ this.state.genresNames.map((genre, key)=> <Genre name={genre} key={key}/> ) }*/}

                                    <div className="releaseDate mt-2">
                                        <FontAwesomeIcon icon="calendar-alt"/> Release Date: {this.dateFormat(this.state.releaseDate)}
                                    </div>
                                    <p className="mt-5">{this.state.overview}</p>

                                    <div className="row mt-5">
                                        <div className="col-12 text-left">
                                            <a href={this.path} className="btn btn-primary"><FontAwesomeIcon icon="angle-left"/> Back to movies</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="container">
                    <div className="row mt-5 ">
                        <div className="cool-12 text-center">
                            <Loader/>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default withRouter(MovieDetails);