import React from "react";
import './Facerecognition.css';

const Facerecognition = ({ imageurl, box }) => {
    return (
        <div className="center">
            <div className=" absolute mt2">
                <img src={imageurl} id='inputImage' width="500px"
                    height="auto" alt="" />
                <div className='bounding-box' style={
                    { top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }
                }></div>
            </div>



        </div>


    )
}

export default Facerecognition;