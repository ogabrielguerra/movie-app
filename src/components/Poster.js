import React from 'react';
import Loader from './Loader';
import Base from './Base';
import ImageLoader from 'react-load-image';

class Poster extends Base{

    state = {
        hasLoaded : ""
    }

    constructor(props){
        super(props)
        this.basePath = super.getPath();
        this.imageUrl="";
	    this.notFound = this.basePath+'assets/not-found.jpg';
    }

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

    componentWillMount() {
        if(this.props.image!=="" && this.props.image!==null){
            let image = this.props.image;
            this.imageUrl = 'https://image.tmdb.org/t/p/w342/'+image;
            // this.imageUrl = this.basePath+'assets/posters'+image;
        }else{
	        this.imageUrl = this.notFound;
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.hasLoaded !== nextState.hasLoaded){
            return true;
        }else{
            return false;
        }
    }

    onLoad = () => {
	    if (this._isMounted) {
		    this.setState(
			    {
				    hasLoaded: "imageHasLoaded"
			    }
		    )
	    }
    };

    onError = ()=>{
        console.log('error loading image')
    }

    render(){
            return(
                <ImageLoader src={this.imageUrl}>
                    <img alt="Movie Poster" onError={this.onError} onLoad={this.onLoad} className={this.state.hasLoaded}/>
                    <div><img src={this.notFound} className="imageHasLoaded" alt="poster" /></div>
                    <Loader/>
                </ImageLoader>
            )
    }
}

export default Poster;