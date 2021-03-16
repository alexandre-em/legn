import React from 'react'
import "./Header.css"
import { NavigateBefore, NavigateNext, ExitToApp } from "@material-ui/icons/"
import { useHistory } from 'react-router'

function Header() {
    const history = useHistory()
    return (
        <div className="header">
            <div className="logo">
                <NavigateBefore onClick={() => { history.goBack() }} />
                <NavigateNext onClick={() => { history.goForward() }} />
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
