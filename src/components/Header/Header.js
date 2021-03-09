import React from 'react'
import "./Header.css"
import { NavigateBefore, NavigateNext } from "@material-ui/icons/"
import { Avatar } from '@material-ui/core'

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <NavigateBefore onClick={() => { console.log("before") }} />
                <NavigateNext onClick={() => { console.log("next") }} />
                Logo
            </div>
            <div className="searchbar">
                <input type="search" placeholder="Search..." id="header--searchbar" />
            </div>
            <div className="profile">
                <Avatar />
            </div>
        </div>
    )
}

export default Header
