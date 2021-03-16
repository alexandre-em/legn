import { useEffect, useState } from "react";
import { getPitches, selectPitches } from "../../services/chordChanges";
import { setup } from "../../services/pitchDetection";
import "./ChordChanges.css"
import teoria from 'teoria'
import * as notesFreq from '../../constants/notesFrequencies'
import Option from "../../components/Body/ChordChanges/Option/Option";

function ChordChanges() {
    const [frequency, setFrequency] = useState(0)
    const [pitches, setPitches] = useState([])
    const [noteSet, setNoteSet] = useState([])

    const [level, setLevel] = useState([])
    const [chordChange, setChordChange] = useState("")
    const [order, setOrder] = useState('')
    const [repeat, setRepeat] = useState(false)
    const [begin, setBegin] = useState(false)

    const chords = [
        {
            root: "G",
            tone: "min7"
        },
        {
            root: "F",
            tone: "7"
        }
    ]

    const beginTest = () => {
        if(level && chordChange && order)
            setBegin(true)
    }

    useEffect(() => {
        // setup(setFrequency)
        setPitches(selectPitches(getPitches(chords[0].tone), [1, 3, 5, 7]))
        const am = teoria.chord(chords[0].root + chords[0].tone)
        const notes = (am.notes().map(note => note.toString().replace(/[0-9]/g, '')))
        setNoteSet(notes.map((val, i) => {
            return {
                note: val,
                deg: String(i + 1),
                freqSet: notesFreq[val]
            }
        }))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (frequency) {
            pitches.forEach((pitch, i) => {
                if (noteSet[i].freqSet?.has(Math.floor(frequency))) {
                    setPitches(pitches.map((p, j) => {
                        if (i === j)
                            return { pitch: pitch.pitch, found: true }
                        return p
                    }))
                }
            })
        }
        // eslint-disable-next-line
    }, [frequency])

    useEffect(() => {
        setPitches(selectPitches(getPitches(chords[0].tone), level))
    }, [level])

    return (
        <div className="cc">
            {begin ? <div className="cc__main">
                <h3>{chordChange}</h3>
                <div className="main__current">
                    <h1>{chords[0].root}<sup>{chords[0].tone}</sup></h1>
                    <h4>{pitches.map(({ pitch, found }, i) => {
                        return <p key={`${i} pitches`} className={found ? "main__current__pitch--found" : ""}>{pitch} &nbsp;</p>
                    })}</h4>
                </div>
                <div className="main__next">
                    <h5>Next</h5>
                    <h1>{chords[1].root}<sup>{chords[1].tone}</sup></h1>
                    <h4>{selectPitches(getPitches(chords[1].tone), level).map(({ pitch }) => {
                        return pitch
                    }).join(" ")}</h4>
                </div>
            </div> : ""}
            <Option level={level} setLevel={setLevel}
                chordChange={chordChange} setChordChange={setChordChange}
                order={order} setOrder={setOrder}
                repeat={repeat} setRepeat={setRepeat}
                begin={begin} setBegin={beginTest} />
        </div>
    );
}

export default ChordChanges;