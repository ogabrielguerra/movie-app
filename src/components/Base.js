import React from 'react';

class Base extends React.Component{
    constructor(props){
        super(props);
        // this.path = '/';
        this.path = '/movie-app/';
    }

    dateFormat(date){
        let newDate = date.split("-").join("/");
        return newDate;
    }

    getPath(){
        return this.path;
    }
}

export default Base;