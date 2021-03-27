import { CircularProgress, TextField } from '@material-ui/core'
import { Backup, Folder } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { uploadFile } from '../../services/Api/Sheet'
import './AddSheet.css'

function AddSheet() {
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    const [title, setTitle] = useState('')
    const [composer, setComposer] = useState('')
    const [year, setYear] = useState('')
    const author = useSelector(state => state.auth.user_public)

    const handleChange = (e) => {
        if (e.target.files[0])
            setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (progress === 0) {
            uploadFile(file, title, composer, year, author, setIsLoading, setProgress)
        }
    }
    
    if (progress === 100 && !isLoading)
        return <Redirect to={`/sheets/`} />
    return (
        <div className="add">
            <div className="add__upload">
                <label htmlFor="upload-file">
                    <input
                        type="file"
                        id="upload-file"
                        name="upload-file"
                        accept="application/pdf"
                        onChange={handleChange}
                        style={{ display: "none" }}
                    />
                    <div className="upload__button">
                        <p>Browse...&nbsp;</p>
                        <Folder />
                    </div>
                </label>
                <span style={{ color: "#b4b4b4", fontSize: "10pt" }}>{file ? "Loaded: " + file.name : "No file selected"}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="add__informations">
                    <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                    <TextField label="Composer" value={composer} onChange={e => setComposer(e.target.value)} required />
                    <TextField label="Year" value={year} onChange={e => setYear(e.target.value)} required />
                    <div className="upload__submit">
                        {(progress === 100 && !isLoading) ? `"${file.name}" upload successfully!` : ""}
                        <button className="button">
                            <div className="upload__button">
                                <p>Upload &nbsp;</p> {isLoading ? <CircularProgress id="add__loading" variant="determinate" value={progress} /> : <Backup />}
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddSheet
