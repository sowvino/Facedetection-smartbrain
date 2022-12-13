import React from "react";
import './Imagelinkform.css';

const Imagelinkform = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3">
                {`This Magic brain will detect face in your in picture.Give it a Try!!`}
            </p>
            <div className="center">
                <div className="shadow-2 pa4 br3 form">
                    <input type="text" className="f4 pa2 w-70 ba b--silver bg-washed-red " placeholder="Enter the Url for Image"
                        onChange={onInputChange} />
                    <button type="submit" onClick={onButtonSubmit}
                        className='f4 pv2 w-30  bg-animate bg-black-70 hover-bg-black white pointer br--right-ns'>Detect
                    </button>
                </div>

            </div>

        </div>

    )
}

export default Imagelinkform;