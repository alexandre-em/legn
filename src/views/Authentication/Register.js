import { CircularProgress, TextField } from '@material-ui/core'
import { Image } from '@material-ui/icons'
import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { uploadAvatar, registerUser } from '../../services/Api/Auth'

function Register() {
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [progress, setProgress] = useState(0)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0])
            setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (file) {
            if (progress === 0)
                uploadAvatar(file, email, username, fullname, password, setIsLoading, setProgress, setRedirect)
        } else 
            registerUser(email, username, password, fullname, '').then(_ => setRedirect(true))
    }

    if (redirect)
        return <Redirect to='/' />;
    return (
        <div className='auth'>
            <div className="auth__box">
                <h1>Register</h1>
                <form noValidate autoComplete="off" className="auth__form" onSubmit={handleSubmit}>
                    <div className="auth__inputs">
                        <TextField value={email} onChange={e => setEmail(e.target.value)} label="Email" />
                        <TextField value={username} onChange={e => setUsername(e.target.value)} label="Username" />
                        <TextField value={fullname} onChange={e => setFullname(e.target.value)} label="Fullname" />
                        <TextField
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            value={confirmation}
                            onChange={e => setConfirmation(e.target.value)}
                            label="Confirm password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <div className="register__upload">
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
                    </div>
                    <div className="add__informations">
                        <div className="upload__submit">
                            {(progress === 100 && !isLoading) ? `Registration completed` : ""}
                        </div>
                    </div>
                    <div className='auth__buttons'>
                        <button className='button' id="register__submit" type="submit">{isLoading ? <CircularProgress id="add__loading" variant="determinate" value={progress} /> : "Register"}</button>
                        <button className='button' type="reset" >Reset</button>
                    </div>
                </form>
            </div>
            <div className="auth__credit">
                <h6>Photo: Alexander Bennington</h6>
            </div>
        </div>
    )
}

export default Register
