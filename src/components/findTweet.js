import React from "react"

import "./layout.css"

const FindTweet = ({ label, placeholder = "e.g. https://twitter.com/realDonaldTrump/status/98454970654916608" }) => {
    return (
        <label style={{marginTop: "1em", width: "100%"}}>
            {label}
            <div style={{display: "flex", width: "100%", justifyContent: "space-between", marginTop: ".5em"}}>
                <input type="input" style={{width: "75%"}} placeholder={placeholder} />
                <button><b>Find Tweet</b></button>
            </div>
        </label>
    )
}

export default FindTweet;
