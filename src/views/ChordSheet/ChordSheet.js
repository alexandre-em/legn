import { GetApp } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getSheetById } from '../../services/Api/Sheet'
import './ChordSheet.css'
import moment from 'moment'
import { getUserById } from '../../services/Api/User'
import { Avatar } from '@material-ui/core'

// const url = "https://firebasestorage.googleapis.com/v0/b/legn-49d5d.appspot.com/o/sheet%2F1615928778059-alexandre_em_2021_cv.pdf?alt=media&token=afc4cb1b-e3cf-4668-a0ca-a58120a05f14"

function ChordSheet() {
    const { id } = useParams()
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [composer, setComposer] = useState('')
    const [author, setAuthor] = useState('')
    const [avatar, setAvatar] = useState('')
    const [year, setYear] = useState('')

    const [date, setDate] = useState('')


    useEffect(() => {
        getSheetById(id).then(async data => {
            if (data.status === 200) {
                setTitle(data.data.title)
                setUrl(data.data.url)
                setComposer(data.data.composer)
                getUserById(data.data.author).then(dt => {
                    setAuthor(dt.data.username)
                    setAvatar(dt.data.avatar)
                })
                let timestamp = Date(data.data.published_on)
                setDate(moment(timestamp).format('MMMM Do YYYY'))
                setYear(data.data.year)
            }
        })
    }, [])

    return (
        <div className="sheet__pdf">
            <iframe title={id} src={url} width="80%" height="70%" />
            <h1>{title} - {composer} ({year})</h1>
            <div className="sheet__author_info">
                <Avatar url={avatar} />
                <h3>{author}</h3>
            </div>
            <p>Published on : {date}</p>
            <div className="sheet__download">
                <a href={url} download>
                    <button className="button">
                        <div className="sheet__button">
                            <GetApp />
                            <p>&nbsp; Download "{title}"</p>
                        </div>
                    </button>
                </a>
            </div>
        </div>
    )
}

export default ChordSheet
