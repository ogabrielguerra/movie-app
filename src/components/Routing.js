import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import History from './History';
import MoviesGrid from './MoviesGrid';
import MovieDetails from './MovieDetails';
import Base from './Base';

class Routing extends Base{

    constructor(props){
        super(props);
        this.path = super.getPath();
	    History.push('/');
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
                        component={() => <MovieDetails genres="a, b"/>}
                    />
            </Router>
        );
    }
}

export default Routing;