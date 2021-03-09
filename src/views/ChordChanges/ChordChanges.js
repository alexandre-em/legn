import { useEffect, useState } from "react";
import { getPitches, selectPitches } from "../../services/chordChanges";
import { setup } from "../../services/pitchDetection";
import "./ChordChanges.css"

function ChordChanges() {
    const [frequency, setFrequency] = useState(0)
    const title = "Autumn Leave"
    const chords = [
        {
            root: "G",
            tone: "m7"
        },
        {
            root: "F",
            tone: "7"
        }
    ]

    useEffect(() => {
        // setup(setFrequency)
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cc">
            <div className="cc__main">
                <h3>{title}</h3>
                <div className="main__current">
                    <h1>{chords[0].root}<sup>{chords[0].tone}</sup></h1>
                    <h4>{selectPitches(getPitches(chords[0].tone), [1, 3, 5, 7]).map(({ pitch, found }) => {
                        return <p className={found ? "main__current__pitch--found" : ""}>{pitch} &nbsp;</p>
                    })}</h4>
                </div>
                <div className="main__next">
                    <h5>Next</h5>
                    <h1>{chords[1].root}<sup>{chords[1].tone}</sup></h1>
                    <h4>{selectPitches(getPitches(chords[1].tone), [1, 3, 5, 7]).map(({ pitch, found }) => {
                        return pitch
                    }).join(" ")}</h4>
                </div>
            </div>
            <div className="cc__option">
                <h4>Changes setup</h4>:
                Level :
                Chord Changes { /* TODO add random */}
                <h4>Workout options:</h4>
                Order : Forward | Reverse | random { /* order of degrees */}
                Repeat : { /** Boolean repeat */}
                Key : Gm7
            </div>
        </div>
    );
}

export default ChordChanges;