import React from 'react'
import "./Header.css"
import { NavigateBefore, NavigateNext, ExitToApp } from "@material-ui/icons/"
import { useHistory } from 'react-router'
import { useState } from 'react'

function Header() {
    const history = useHistory()
    const [search, setSearch] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        history.push('/search?keyword='+search)
        setSearch('')
    }


    return (
        <div className="header">
            <div className="logo">
                <NavigateBefore onClick={() => { history.goBack() }} />
                <NavigateNext onClick={() => { history.goForward() }} />
            </div>
            <div className="searchbar">
                <form onSubmit={handleSubmit}>
                    <input
                        type="search"
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        id="header--searchbar" />
                </form>
            </div>
            <div className="profile">
                {/* <b>Leg(n)</b> */}
                <ExitToApp />
            </div>
        </div>
    )
}

export default Header
