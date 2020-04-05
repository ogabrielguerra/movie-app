import React from 'react';
import History from './History';

class Base extends React.Component{
    constructor(props){

        super(props);
        this.env = process.env.NODE_ENV;
        this.path = '/';

        if(this.env === 'development'){
            this.apiPath = 'http://localhost/public/';
        }else if (this.env === 'production'){
            this.apiPath = 'http://apis.gabrielguerra.me/movie-app/v2/';
        }
    }

    dateFormat(date){
        let newDate = date.split("-").join("/");
        return newDate;
    }

    getPath(){
        return this.path;
    }

    getApiPath(){
        return this.apiPath;
    }

    setHistory(path){
	    History.push(path);
    }
}

export default Base;