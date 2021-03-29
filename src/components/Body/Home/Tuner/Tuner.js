import { Button } from '@material-ui/core'
import React from 'react'
import './Tuner.css'

function Tuner({ note, progress, handleClick, beginTuner }) {
    // TODO: Optimize tuner note detection
    return (
        <div className="tuner" >
            <h3>Tuner</h3>
            <div className="tuner__contents">
                <Button color={beginTuner?"secondary":"primary"} variant="outlined" onClick={handleClick} >{beginTuner?"Stop Tuner":"Run Tuner"}</Button>
                <div className="tuner__progressbar" style={{
                    backgroundColor: (progress === 0) ? "green" : "#ebebebeb",
                    display: beginTuner ? "flex" : "none"
                }}>
                    <div className="tuner__progress" style={{
                        width: `${Math.abs(progress)}%`,
                        height: '100%',
                        ...((progress > 0) && { borderRight: '.25vw solid red' }),
                        ...((progress < 0) && { borderLeft: '.25vw solid red' }),
                    }}></div>
                </div>
                <div className="tuner__note" style={{
                    display: beginTuner ? "flex" : "none"
                }}>
                    <h1>{note}</h1>
                </div>
            </div>
        </div>
    )
}

export default Tuner
