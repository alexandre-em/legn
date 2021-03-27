import React, { useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import './Message.css'
import moment from 'moment'

function Message({ info, public_id }) {
    const isSender = info.public_id === public_id
    const sender = isSender ? "--sender" : ""
    const date = Date(info.create_at)

    return (
        <div className={`message${sender}`}>
            {isSender?"":<Avatar src={info.avatar} />}
            <div className={`message__bulle${sender}`}>
                <div className="message__title">
                    <b>{info.author}</b>
                    <p>{moment(date).format('MMMM Do YYYY h:mma')}</p>
                </div>
                <div className={`message__content${sender}`}>
                    {info.text}
                </div>
            </div>
            {isSender?<Avatar src={info.avatar} />:""}
        </div>
    )
}

export default Message
