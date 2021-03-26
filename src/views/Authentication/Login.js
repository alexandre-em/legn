import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { checkInfo, login } from '../../services/Api/Auth'
import { login as loginAction } from '../../store/actions'
import './Auth.css'

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) {
            checkInfo(token).then(data => {
                dispatch(loginAction({ ...data.data.data, token: token }))
            })
        }
        // eslint-disable-next-line
    }, [token])
    
    return (
        <div className="auth">
            <div className="auth__box">
                <h1>Login</h1>
                <form noValidate autoComplete="off" className="auth__form" onSubmit={(e) => {
                    e.preventDefault()
                    login(email, password).then(data => setToken(data.data.Authorization))
                }}>
                    <div className="auth__inputs">
                        <div className="auth__input">
                            <TextField id="standard-basic" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                        </div>
                        <div className="auth__input">
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className='auth__buttons'>
                        <div className="auth__input">
                            <button className='button' type="submit">Connect</button>
                        </div>
                        or
                        <div className="auth__input">
                            <button className='button' onClick={() => history.push('/register')} >Register</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="auth__credit">
                <h6>Photo: Alexander Bennington</h6>
            </div>
        </div>
    )
}

export default Login
