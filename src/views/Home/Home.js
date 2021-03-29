import { Button, Fab } from '@material-ui/core'
import { Help } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import Tuner from '../../components/Body/Home/Tuner/Tuner'
import { closestValue, frequenciesBST } from '../../constants/tunerFrequencies'
import { closeChanges, setup } from '../../services/pitchDetection'
import './Home.css'

function Home() {
    const [frequency, setFrequency] = useState()
    const [beginTuner, setBeginTuner] = useState(false)
    const [progress, setProgress] = useState(0)
    const [note, setNote] = useState('')

    useEffect(() => {
        if (beginTuner) {
            console.log("stop recording")
            return closeChanges()
        }
        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        // const frequency = 311
        const cv = closestValue(frequenciesBST, Math.abs(Math.floor(frequency)))
        setProgress(Math.floor((Math.abs(Math.floor(frequency)) - cv.val.frequency) * 5.9))
        setNote(cv.val.note)
    }, [frequency])

    const handleClick = () => {
        setBeginTuner(!beginTuner)
        console.log(beginTuner)
        if(!beginTuner)
            setup(setFrequency)
        else
            closeChanges()
    }

    return (
        <div className="home">
            <div className="home__title">
                <h1>Welcome to Leg(n) App, {'username'}</h1>
            </div>
            <div className="home__contents">
                <div className="home__log">
                    <h3>Leg(n) logs</h3>
                </div>
                <Tuner note={note} progress={progress} handleClick={handleClick} beginTuner={beginTuner} />
            </div>
            <a href={`mailto:${process.env.REACT_APP_CONTACT}`}>
                <Fab color="primary" aria-label="edit" id="settings__help">
                    <Help />
                </Fab>
            </a>
        </div>
    )
}

export default Home
