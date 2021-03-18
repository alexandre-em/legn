import { Fab, FormControl, FormHelperText, InputLabel, NativeSelect, TextField } from '@material-ui/core'
import { Help } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import './Settings.css'

function Settings() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    return (
        <div className='settings'>
            <h1>Settings</h1>
            <i>@demo</i>
            <div className="settings__select">
                <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth />
            </div>
            <div className="settings__select">
                <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
            </div>

            <FormControl className="settings__form">
                <div className="settings__select">
                    <InputLabel shrink>
                        Instrument
                    </InputLabel>
                    <NativeSelect
                        value={""}
                        onChange={() => console.log("object")}
                        name="instrument"
                        fullWidth
                        inputProps={{ 'aria-label': 'age' }}
                    >
                        <option value="">None</option>
                        <option value={0}>Default</option>
                        <option value={1}>Dark</option>
                    </NativeSelect>
                </div>
            </FormControl>
            <FormControl className="settings__form">
                <div className="settings__select">
                    <InputLabel shrink>
                        Theme
                    </InputLabel>
                    <NativeSelect
                        value={""}
                        onChange={() => console.log("object")}
                        name="theme"
                        fullWidth
                        inputProps={{ 'aria-label': 'age' }}
                    >
                        <option value="">None</option>
                        <option value={0}>Default</option>
                        <option value={1}>Dark</option>
                    </NativeSelect>
                </div>
            </FormControl>
            <a href={`mailto:${process.env.REACT_APP_CONTACT}`}>
                <Fab color="primary" aria-label="edit" id="settings__help">
                    <Help />
                </Fab>
            </a>

            <h2>About</h2>
            <div className="settings__select">
                <TextField label="GitHub" disabled value={"@alexandre-em"} fullWidth />
            </div>
            <div className="settings__select">
                <TextField label="Version" disabled value={"1.0"} fullWidth />
            </div>
            <div className="settings__submit">
                <button className="button">Save</button>
            </div>
        </div>
    )
}

export default Settings
