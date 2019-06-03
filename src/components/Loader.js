import React from 'react'

class Loader extends React.Component{
    render() {
        return (
            <div className="text-center">
                <div className="text-center"><h3>Loading...</h3></div>
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>

        )
    }
}

export default Loader;