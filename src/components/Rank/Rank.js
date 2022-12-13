import React from "react";

const Rank = ({ name, entry }) => {
    return (
        <div>
            <div className="white f2" >
                {`${name} your current entry count.....`}
            </div>
            <div className="white f1" >
                {entry}
            </div>
        </div>

    )
}

export default Rank;