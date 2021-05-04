import React from "react";

const KeyComponent=({det})=>{

    return(
        <div className="key-box">
            <p>{det.key.toUpperCase()}</p>
            <div className="sound-bar">
                <p>{det.sound}</p>
            </div>
        </div>
    )
}

export default KeyComponent;