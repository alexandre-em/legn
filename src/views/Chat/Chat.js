import { CircularProgress } from '@material-ui/core';
import { SendRounded } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Message from '../../components/Body/Chat/Message'
import { getMessages, sendMessage } from '../../services/Api/Chat';
import './Chat.css'

function Chat() {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const user = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)

    const MAX_MSG_SIZE = 280

    const handleSubmit = e => {
        e.preventDefault()
        sendMessage({
            author: user.username,
            avatar: user.avatar,
            text: text,
            public_id: user.user_public
        })
        setText('')
    }

    useEffect(() => {
        setLoading(true)
        getMessages().onSnapshot(data => {
            setMessages(data.docs.map(doc => {
                return doc.data()
            }))
            setLoading(false)
        })
    }, [])

    if (loading)
        return <div className="chat__loading">
            <CircularProgress />
            <h4>Loading</h4>
        </div>
    return (
        <div className="chat">
            <div className="chat__messages">
                {messages.map(data =>
                    <Message key={data.public_id + data.create_at} info={data} public_id={user.user_public} />
                )}
            </div>
            <div className="chat__send">
                <form onSubmit={handleSubmit}>
                    <div className="chat__form">
                        <div className="chat__input">
                            <input type="text" value={text} onChange={e => {
                                if (e.target.value.length<MAX_MSG_SIZE)
                                    setText(e.target.value)}
                                } placeholder="Type your message here..." />
                        </div>
                        <div className="chat__button" onClick={handleSubmit}>
                            <SendRounded />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat
