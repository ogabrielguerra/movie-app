import React from 'react';
import Loader from './Loader';
import Base from './Base';
import ImageLoader from 'react-load-image';

class PosterC extends Base{

    state = {
        hasLoaded : ""
    }

    constructor(props){
        super(props)
        this.basePath = super.getPath();
        this.imageUrl="";
    }

    componentWillMount() {
        if(this.props.image!=="" && this.props.image!==null){
            let image = this.props.image;
            this.imageUrl = this.basePath+'assets/posters'+image;
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
        this.setState(
            {
                hasLoaded : "imageHasLoaded"
            }
        )
    };

    render(){
            let notFound = this.basePath+'assets/not-found.jpg';
            return(
                <ImageLoader src={this.imageUrl}>
                    <img alt="Movie Poster" onLoad={this.onLoad} className={this.state.hasLoaded}/>
                    <div><img src={notFound} className="imageHasLoaded" alt="poster" /></div>
                    <Loader/>
                </ImageLoader>
            )
    }
}

export default PosterC;