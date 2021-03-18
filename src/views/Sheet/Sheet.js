import { AddCircle } from '@material-ui/icons'
import React from 'react'
import { useHistory } from 'react-router'
import './Sheet.css'

function Sheet() {
    const history = useHistory()
    const list = [
        { title: "Autumn Leave", id: "123456" },
        { title: "A Train", id: "23456" },
        { title: "500 Miles High", id: "34567" },
        { title: "Raging Spur", id: "45678" },
        { title: "Amstramgram", id: "56678" },
        { title: "Let's go to the white park", id: "9438573" },
        { title: "A Train", id: "23456a" },
        { title: "500 Miles High", id: "34567a" },
        { title: "Raging Spur", id: "45678a" },
        { title: "Amstramgram", id: "56678a" },
        { title: "Let's go to the white park", id: "9438573a" },
        { title: "A Train", id: "23456b" },
        { title: "500 Miles High", id: "34567b" },
        { title: "Raging Spur", id: "45678b" },
        { title: "Amstramgram", id: "56678b" },
    ]
    const tuto = [
        { title: "Guitar Neck", id: "123456" },
        { title: "Scale & Intervals", id: "123456" },
        { title: "Pentatonic Scale", id: "123456" },
    ]
    return (
        <div className="sheets">
            <div className="sheet__header tuto">
                <h2>Tutorials</h2>
            </div>
            <div className="sheets__main">
                {tuto.map(sheet => {
                    return <p key={sheet.title} onClick={_ => {
                        history.push(`/sheet/${sheet.id}`)
                    }}>{sheet.title}</p>
                })}
            </div>
            <div className="sheets__header" onClick={_ => {
                history.push('/add')
            }}>
                <h2>Sheets</h2>
                <div className="sheets__add">
                    <AddCircle />
                Add
                </div>
            </div>
            <div className="sheets__main">
                {list.map(sheet => {
                    return <p key={sheet.id} onClick={_ => {
                        history.push(`/sheet/${sheet.id}`)
                    }}>{sheet.title}</p>
                })}
            </div>
            <div className="sheets__pagination">
                1
            </div>
        </div>
    )
}

export default Sheet
