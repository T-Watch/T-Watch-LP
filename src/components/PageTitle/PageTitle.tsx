import React from 'react';
import './PageTitle.css';

export default class PageTitle extends React.Component { 

    render() {
    
        return(
            <div className="titleElement">
                <h1 className="tit">T-Watch</h1>
                <h2 className="tit"> <i> El entrenador que siempre te acompaña</i></h2>
            </div>
        
        );
    }

}
