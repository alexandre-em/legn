import { CircularProgress, TextField } from '@material-ui/core'
import { Image } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadAvatar, registerUser, checkInfo } from '../../services/Api/Auth'
import { checkEmail } from '../../services/Api/User'
import { login as loginAction } from '../../store/actions'

function Register() {
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        setIsValid(checkEmail(email))
    }, [email])

    const handleChange = (e) => {
        if (e.target.files[0])
            setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if ((password === confirmation) && isValid) {
            if (file) {
                if (progress === 0)
                    uploadAvatar(file, email, username, fullname, password, setIsLoading, setProgress, dispatch, loginAction)
            } else
                registerUser(email, username, password, fullname, '')
                    .then(async data => {
                        await checkInfo(data.data?.Authorization).then(dt => {
                            dispatch(loginAction({ ...dt.data.data, token: data.data.Authorization }))
                        })
                    })
                    .catch(err => {
                        console.log(err.response.data.message, err.response.status)
                    })
        }
    }

    return (
        <div className='auth'>
            <div className="auth__box">
                <h1>Register</h1>
                <form noValidate autoComplete="off" className="auth__form" onSubmit={handleSubmit}>
                    <div className="auth__inputs">
                        <TextField error={!isValid} helperText={!isValid && "email format incorrect"} value={email} onChange={e => setEmail(e.target.value)} label="Email" required />
                        <TextField value={username} onChange={e => setUsername(e.target.value)} label="Username" required />
                        <TextField value={fullname} onChange={e => setFullname(e.target.value)} label="Fullname" required />
                        <TextField
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            required
                        />
                        <TextField
                            error={password !== confirmation}
                            helperText={password !== confirmation && "passwords do not match"}
                            value={confirmation}
                            onChange={e => setConfirmation(e.target.value)}
                            label="Confirm password"
                            type="password"
                            autoComplete="current-password"
                            required
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
