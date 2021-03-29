import { AddCircle } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import { getAllSheets } from '../../services/Api/Sheet'
import './Sheet.css'
import Pagination from '@material-ui/lab/Pagination';
import { tutos } from '../../constants/tuto'

function Sheet() {
    const history = useHistory()
    const search = new URLSearchParams(useLocation().search)
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const tuto = Object.keys(tutos).map(key => {
        return tutos[key]
    })

    useEffect(() => {
        getAllSheets().then(data => {
            setList(data?.data?.data)
            setTotal(data.data.pages)
        })
    }, [])

    return (
        <div className="sheets">
            <div className="sheet__header tuto">
                <h2>Tutorials</h2>
            </div>
            <div className="sheets__main">
                {tuto.map(tut => {
                    return <p key={tut.id+tut.title} onClick={_ => {
                        history.push(`/tuto/${tut.id}`)
                    }}>{tut.title}</p>
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
                    return <p key={sheet.id + sheet.author} onClick={_ => {
                        history.push(`/sheet/${sheet.id}`)
                    }}>{sheet.title}</p>
                })}
            </div>
            <Pagination
                page={JSON.parse(search.get('page')) || 1}
                className="search__pagination"
                count={total}
                color="primary"
                onChange={(e, page) => {
                    history.push(`/sheets?page=${page}`)
                }} />
        </div>
    )
}

export default Sheet
