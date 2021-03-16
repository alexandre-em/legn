import { GetApp } from '@material-ui/icons'
import React from 'react'
import { useParams } from 'react-router'
import './ChordSheet.css'

const url = "https://firebasestorage.googleapis.com/v0/b/legn-49d5d.appspot.com/o/sheet%2F1615928778059-alexandre_em_2021_cv.pdf?alt=media&token=afc4cb1b-e3cf-4668-a0ca-a58120a05f14"

function ChordSheet() {
    const { id } = useParams()

    return (
        <div className="sheet__pdf">
            <iframe title={id} src={url} width="80%" height="70%" />
            <h1>{"Title"}</h1>
            <h3>Uploader: {"Author"}</h3>
            <p>{"Date"}</p>
            <div className="sheet__download">
                <a href={url} download>
                    <button className="button">
                        <div className="sheet__button">
                            <GetApp />
                            <p>&nbsp; Download "{id}"</p>
                        </div>
                    </button>
                </a>
            </div>
        </div>
    )
}

export default ChordSheet
