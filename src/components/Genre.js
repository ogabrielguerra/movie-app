import React from 'react';

class Genre extends React.Component{
    render(){
        return(
            <span className="genreLabel badge badge-pill badge-secondary">{this.props.name}</span>
        )
    }
}

export default Genre;