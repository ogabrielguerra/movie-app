import React from 'react';
import Loader from './Loader';
import Base from './Base';
import ImageLoader from 'react-load-image';

class PosterC extends Base{
    constructor(props){
        super(props)
        this.basePath = super.getPath();
        this.state = (
            {
                imageReady : false,
                imageError : ""
            }
        );
    }

    componentDidMount() {

        if(this.props.image!=="" && this.props.image!==null){

            let image = this.props.image;
            this.imageUrl = './assets/posters'+image;

            this.setState(
                {
                    imageReady : true,
                    image : this.imageUrl
                }
            )
        }
    }

    render(){
        if(this.state.imageReady===true){
            return(
                <ImageLoader src={this.state.image}>
                    <img alt="Movie Poster"/>
                    <div><img src="./assets/not-found.jpg" alt="poster" /></div>
                    <Loader/>
                </ImageLoader>

            )
        }else{
            return(
                <div>...</div>
            )
        }
    }
}

export default PosterC;