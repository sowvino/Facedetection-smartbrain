
import React from "react";
import Tilt from 'react-parallax-tilt';
import "./Logo.css";
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="ma5 mt0  flex justify-start" >
            <Tilt perspective={1000}>
                <div className="tilt shadow-2 br4 pointer" >
                    <img src={brain} className="logo" alt="brain" ></img>
                </div>
            </Tilt>
        </div>
    )
}
export default Logo;