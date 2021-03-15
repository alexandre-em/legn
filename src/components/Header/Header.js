import React from 'react'
import "./Header.css"
import { NavigateBefore, NavigateNext, ExitToApp } from "@material-ui/icons/"

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <NavigateBefore onClick={() => { console.log("before") }} />
                <NavigateNext onClick={() => { console.log("next") }} />
            </div>
            <div className="searchbar">
                <input type="search" placeholder="Search..." id="header--searchbar" />
            </div>
            <div className="profile">
                {/* <b>Leg(n)</b> */}
                <ExitToApp />
            </div>
        </div>
    )
}

export default Header
