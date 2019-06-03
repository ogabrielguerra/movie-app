import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MoviesGrid from './MoviesGrid';
import MovieDetails from './MovieDetails';
import Base from './Base';

class Routing extends Base{

    constructor(props){
        super(props);
        this.path = super.getPath();
    }

    render(){
        return (
            <Router>
                    <Route
                        exact path={this.path}
                        component={()=> <MoviesGrid />}
                    />

                    <Route
                        path={this.path+"movie/:id"}
                        component={() => <MovieDetails />}
                    />
            </Router>
        );
    }
}

export default Routing;