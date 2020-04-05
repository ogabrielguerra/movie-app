import React from 'react';
import { withRouter } from 'react-router-dom';
import Poster from "./Poster";
import Base from './Base';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Genre from "./Genre";
import Loader from "./Loader";

class MovieDetails extends Base{

	state = {
		data : "",
		genresNames : ""
	};

    constructor(props){
        super(props);
        this.path = super.getPath();
	    this.id = this.props.match.params.id;
    }

    componentWillMount() {
	    this._isMounted = false;
        let urlMovie =  `${this.getApiPath()}/movie/${this.id}`;
	    let urlGenres = `${this.getApiPath()}genres/names/`;

        //Get genres' names and Movie Data from props (passed by Movie comp) *
        if(this.props.location.genres !== undefined || this.props.location.data) {

	        this.setState(
		        {
			        data : this.props.location.data,
			        genresNames : this.props.location.genres
		        }
	        )

        }else{

        	//Let's fetch some data
	        fetch(urlMovie)
		        .then((response)=>response.json())
		        .then((data)=>{
					this.setState(
						{
							data : data
						}
					)
		        })
		        .then(()=>{
				        fetch(urlGenres+this.state.data.genre_ids)
				            .then((response)=>response.json())
				            .then((data)=>{
					            this.setState({
						            genresNames : data
					            })
				            })
			        }
		        ).catch((e)=>{
		        	console.log(e)
			});
        }
    }

    componentDidMount() {
	    this._isMounted = true;
    }

	render(){

        if(this.state.genresNames !== ''){

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
									        <Poster image={this.state.data.poster_path} />
								        </div>
							        </div>
						        </div>
						        <div className="col-md-8">
							        <h1>{this.state.data.title}</h1>
							        {this.state.genresNames.map((genre, key)=> <Genre name={genre} key={key}/> )}
							        {/*{ this.state.genresNames.map((genre, key)=> <Genre name={genre} key={key}/> ) }*/}

							        <div className="releaseDate mt-2">
								        <FontAwesomeIcon icon="calendar-alt"/> Release Date: {this.dateFormat(this.state.data.release_date)}
							        </div>
							        <p className="mt-5">{this.state.data.overview}</p>

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
        	return (
        		<div className="mt-5"><Loader/></div>
	        )
		}

    }
}

export default withRouter(MovieDetails);