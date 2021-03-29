import { CircularProgress, Fab, Snackbar, TextField } from '@material-ui/core'
import { Help, Image } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserById, updateAvatar, updateUserInfo } from '../../services/Api/User'
import './Settings.css'

function Settings() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [open, setOpen] = useState(false)

    const uid = useSelector(state => state.auth.user_public)

    useEffect(() => {
        setIsLoading(true)
        getUserById(uid).then(data => {
            setUsername(data.data.username)
            setEmail(data.data.email)
            setFullName(data.data.firstname)

            setIsLoading(false)
        })
    }, [uid])

    const handleChange = e => {
        if (e.target.files[0])
            setFile(e.target.files[0]);
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (password === confirmation) {
            const data = {
                ...(email && { email: email }),
                ...(username && { username: username }),
                ...(fullName && { firstname: fullName }),
                ...(password && { password: password }),
            }
            if (file)
                updateAvatar(file, uid, data, setIsLoading, setOpen, setProgress)
            else
                updateUserInfo(uid, data).then(_ => setOpen(true))
        }
    }

    return (
        <div className='settings'>
            <Snackbar open={open} autoHideDuration={6000} onClose={_ => setOpen(false)}>
                <Alert onClose={_ => setOpen(false)} severity="success">
                    Updated successfully !
                </Alert>
            </Snackbar>
            <h1>Settings</h1>
            <i>@demo</i>
            <form onSubmit={handleSubmit}>
                <div className="settings__select">
                    <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                </div>
                <div className="settings__select">
                    <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth />
                </div>
                <div className="settings__select">
                    <TextField label="Full name" value={fullName} onChange={e => setFullName(e.target.value)} fullWidth />
                </div>
                <div className="settings__select">
                    <TextField label="Password" type='password' value={password} onChange={e => setPassword(e.target.value)} fullWidth />
                </div>
                <div className="settings__select">
                    <TextField error={password !== confirmation} helperText={password !== confirmation && "passwords do not match"} label="Confirm password" type='password' value={confirmation} onChange={e => setConfirmation(e.target.value)} fullWidth />
                </div>
                <div className="register__upload" id="settings_avatar">
                    <label htmlFor="upload-file">
                        <input
                            type="file"
                            id="upload-file"
                            name="upload-file"
                            accept="image/*"
                            onChange={handleChange}
                            style={{ display: "none" }}
                        />
                        <div className="upload__button">
                            <p>Browse...&nbsp;</p>
                            <Image />
                        </div>
                    </label>
                    <span style={{ color: "#b4b4b4", fontSize: "10pt" }}>{file ? "Loaded: " + file.name : "No file selected"}</span>
                </div>
                <button className='button' id="register__submit" type="submit">{isLoading ? <CircularProgress id="add__loading" variant="determinate" value={progress} /> : "Save changes"}</button>
            </form>


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
        </div>
    )
}

export default Settings
