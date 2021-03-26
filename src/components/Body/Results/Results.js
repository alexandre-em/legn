import React from 'react'
import moment from 'moment'
import './Results.css'
import { useHistory } from 'react-router'

function Results({ result }) {
    const history = useHistory()

    return (
        <div className="result__details" onClick={_ => history.push('/sheet/'+result.id)}>
            <h2>{result?.title}</h2>
            <h4>by {result?.composer}</h4>
            <p>published on: {moment(Date(result?.published_on)).format('MMMM Do YYYY')}</p>
        </div>
    )
}

export default Results
