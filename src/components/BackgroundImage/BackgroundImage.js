import React from 'react'

export default class BackgroundImage extends React.Component { //cuadro azul

    constructor() {
        super()
    }
    render() {
        const sectionStyle = {
            width: "100%",
            height: "50%"
        };
        return (
            <div>
                <img style={sectionStyle} src="/public/background_edited.jpeg"/>
            </div>
        )
    }

}
//https://www.youtube.com/watch?v=tIajENrOJ0o
