import React from 'react'
import './Menu.css'
import { Settings, MusicNote, School, Assignment, Home, Chat } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Avatar } from '@material-ui/core'

function Menu() {
    const history = useHistory()
    const avatar = useSelector(state => state.auth.avatar)

    useEffect(() => {
        console.log(avatar)
    }, [])

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
                <div className="body__micon" onClick={e => history.push('/chat')}>
                    <Chat />
                    Chat
                </div>
            </div>
            <div className="body__sub">
                <div className="body__micon" onClick={e => history.push('/settings')}>
                    <Settings />
                    Settings
                </div>
                <div className="body__micon" onClick={e => history.push('/profil')}>
                    <Avatar src={avatar} />
                    Profil
                </div>
            </div>
        </div>
    )
}

export default Menu
