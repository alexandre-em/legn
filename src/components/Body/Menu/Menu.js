import React from 'react'
import './Menu.css'
import { Settings, MusicNote, School, Assignment, Home, AccountCircle } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

function Menu() {
    const history = useHistory()

    return (
        <div className="body__menu">
            <div className="body__main">
                <div className="body__micon" onClick={e => history.push('/')}>
                    <Home />
                    Home
                </div>
                <div className="body__micon" onClick={e => history.push('/changes')}>
                    <Assignment />
                    Changes
                </div>
                <div className="body__micon" onClick={e => history.push('/scales')}>
                    <School />
                    Scales
                </div>
                <div className="body__micon" onClick={e => history.push('/sheets')}>
                    <MusicNote />
                    Sheets
                </div>
            </div>
            <div className="body__sub">
                <div className="body__micon" onClick={e => history.push('/settings')}>
                    <Settings />
                    Settings
                </div>
                <div className="body__micon" onClick={e => history.push('/profil')}>
                    <AccountCircle />
                    Profil
                </div>
            </div>
        </div>
    )
}

export default Menu
