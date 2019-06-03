import React from 'react';
import Routing from "./components/Routing";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faCalendarAlt, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faKey, faCalendarAlt, faAngleLeft, faAngleRight);

class App extends React.Component{

    render()
    {
        return (
            <div>
                <div className="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12"><h1>Movie App</h1></div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12"><Routing/></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
