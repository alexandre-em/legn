import { Fab } from '@material-ui/core'
import { Help } from '@material-ui/icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Tuner from '../../components/Body/Home/Tuner/Tuner'
import { logs } from '../../constants/Logs'
import { closestValue, frequenciesBST } from '../../constants/tunerFrequencies'
import { closeChanges, setup } from '../../services/pitchDetection'
import './Home.css'

import { ReactComponent as ReactLogo } from '../../assets/images/undraw_happy_music_g6wc.svg'

function Home() {
    const [frequency, setFrequency] = useState()
    const [beginTuner, setBeginTuner] = useState(false)
    const [progress, setProgress] = useState(0)
    const [note, setNote] = useState('')
    const [cv, setCv] = useState()
    const user = useSelector(state => state.auth)

    useEffect(() => {
        if (beginTuner) {
            console.log("stop recording")
            return closeChanges()
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (frequency) {
            if (cv) {
                let prog = Math.floor((Math.abs(Math.floor(frequency)) - cv.val.frequency) * 5.9)
                if (prog < -105 || prog > 105)
                    setCv(closestValue(frequenciesBST, Math.abs(Math.floor(frequency))))
                // console.log(Math.floor((Math.abs(Math.floor(frequency)) - cv.val.frequency) * 5.9))
                setProgress(prog)
                setNote(cv.val.note)
            } else
                setCv(closestValue(frequenciesBST, Math.abs(Math.floor(frequency))))
        }
        // eslint-disable-next-line
    }, [frequency])

    const handleClick = () => {
        if (!beginTuner)
            setup(setFrequency).then(_ => setBeginTuner(!beginTuner))
        else
            closeChanges().then(_ => setBeginTuner(!beginTuner))
    }

    return (
        <div className="home">
            <div className="home__title">
                <h1>Welcome to Leg(n) App, {user.username}</h1>
            </div>
            <div className="home__contents">
                <div className="home__log">
                    <h2>Leg(n) logs</h2>
                    <div className="logs__contents">
                        {logs.map(log =>
                            <p key={log.date + log.content}><b>{moment(Date.parse(log.date)).format('MMMM Do YYYY')}: </b>{log.content}</p>
                        )}
                    </div>
                    <div className="logs__pic">
                        <ReactLogo id="logs__pic"/>
                    </div>
                </div>
                <Tuner note={note} progress={progress} handleClick={handleClick} beginTuner={beginTuner} />
            </div>
            <a href={`mailto:${process.env.REACT_APP_CONTACT}`}>
                <Fab color="primary" aria-label="edit" id="settings__help">
                    <Help />
                </Fab>
            </a>
            <p id="home__em">Made by EM</p>
        </div>
    )
}

export default Home
