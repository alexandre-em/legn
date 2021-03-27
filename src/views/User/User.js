import { Avatar, CircularProgress } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import { getUserById } from '../../services/Api/User'
import './User.css'

function User() {
    const { uid } = useParams()
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (uid) {
            setIsLoading(true)
            getUserById(uid).then(data => {
                setUser(data.data)
                setIsLoading(false)
            })
        }
    }, [uid])

    if (isLoading)
        return <div className="chat__loading">
            <CircularProgress />
            <h4>Loading</h4>
        </div>
    return (
        <div className="userpage">
            <div className="user__title">
                <h2>{user.username}'s details :</h2>
            </div>
            <div className="user__contents">
                <div className="user__avatar">
                    <Avatar src={user.avatar} />
                </div>
                <div className="user__infos">
                    <p id="user__uid">
                        id: {uid}
                    </p>
                    <b>
                        {user.firstname}
                    </b>
                    <p>
                        username: {user.username}
                    </p>
                    <p>
                        contact: {user.email}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default User
