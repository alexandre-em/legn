import React from 'react'
import { Avatar } from '@material-ui/core'
import './Message.css'
import { useHistory } from 'react-router'
import moment from 'moment'

function Message({ info, public_id }) {
    const isSender = info.public_id === public_id
    const sender = isSender ? "--sender" : ""
    // const date = moment(new Date(info.create_at.toDate()).toUTCString()).format('MMM Do YYYY h:mma')
    const history = useHistory()

    return (
        <div className={`message${sender}`}>
            {isSender?"":<Avatar src={info.avatar} id="message__touser" onClick={_ => history.push(`/user/${info.public_id}`)} />}
            <div className={`message__bulle${sender}`}>
                <div className={`message__title${sender}`}>
                    <b id="message__touser" onClick={_ => history.push(`/user/${info.public_id}`)}>{info.author}</b>
                </div>
                <div className={`message__content${sender}`}>
                    {info.text}
                    <p>{moment(new Date(info.create_at?.toDate()).toUTCString()).format('MMM Do YYYY h:mma')}</p>
                </div>
            </div>
            {isSender ? <Avatar src={info.avatar} id="message__touser" onClick={_ => history.push(`/user/${info.public_id}`)} />:""}
        </div>
    )
}

export default Message
