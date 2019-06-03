import React from 'react';
import axios from "axios";
import Loader from './Loader';
import ImageLoader from 'react-load-image';

class Poster extends React.Component{
    constructor(props){
        super(props)
        this.basePath = "/movie-app-api/poster/?imgRef=";
        this.state = (
            {
                imageReady : false,
                imageError : ""
            }
        );
    }

    componentDidMount() {

        if(this.props.image!=="" && this.props.image!==null){

            let image = this.props.image.substring(1);
            this.imageUrl = this.basePath+image;

            axios.get(this.imageUrl)
                .then((response)=>{
                    this.setState(
                        {
                            imageReady : true,
                            image : response.data
                        }
                    )
                })
        }
    }

    render(){
        if(this.state.imageReady===true){
            return(
                <ImageLoader src={this.state.image}>
                    <img alt="Movie Poster"/>
                    <div>Error!</div>
                    <Loader/>
                </ImageLoader>

            )
        }else if(this.state.imageError===true){
            return(
                <div><img src="assets/not-found.jpg" alt="poster" /></div>
                )
        }else{
            return(
                <div><Loader/></div>
            )
        }
    }
}

export default Poster;