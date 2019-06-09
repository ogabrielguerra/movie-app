import React from 'react';
import Loader from './Loader';
import Base from './Base';
import ImageLoader from 'react-load-image';

class PosterC extends Base{

    constructor(props){
        super(props)
        this.basePath = super.getPath();
        this.imageUrl="";
    }

    // componentDidMount() {
    componentWillMount() {
        if(this.props.image!=="" && this.props.image!==null){
            let image = this.props.image;
            this.imageUrl = './assets/posters'+image;
        }
    }

    render(){

            // console.log("poster")
            return(
                <ImageLoader src={this.imageUrl}>
                    <img alt="Movie Poster"/>
                    <div><img src="./assets/not-found.jpg" alt="poster" /></div>
                    <Loader/>
                </ImageLoader>

            )
    }
}

export default PosterC;