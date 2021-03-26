import { useEffect, useState } from "react";
import { getPitches, selectPitches, parseChords, getChords } from "../../services/chordChanges";
import { setup, closeChanges } from "../../services/pitchDetection";
import "./ChordChanges.css"
import teoria from 'teoria'
import * as notesFreq from '../../constants/notesFrequencies'
import Option from "../../components/Body/ChordChanges/Option/Option";
import { getChanges } from "../../services/Api/ChordChanges";

function ChordChanges() {
    const [frequency, setFrequency] = useState(0)
    const [pitches, setPitches] = useState([])
    const [noteSet, setNoteSet] = useState([])
    const [songs, setSongs] = useState([])

    const [level, setLevel] = useState([])
    const [chordChange, setChordChange] = useState(-1)
    const [order, setOrder] = useState('')
    const [repeat, setRepeat] = useState(false)
    const [begin, setBegin] = useState(0)
    const [chords, setChords] = useState([])


    const beginTest = () => {
        if (level && chordChange && order)
            setBegin(begin+1)
            initTest()
    }

    const initTest = () => {
        const chordParsed = parseChords(songs[chordChange].chords)
        setChords(getChords(chordParsed, order, setChords))
        setPitches(selectPitches(getPitches(chordParsed[0].tone), level))
        initChord()
    }
    
    const initChord = () => {
        if (begin !== 0 && chords) {
            const chord = teoria.chord(chords[0].root + chords[0].tone)
            const notes = (chord.notes().map(note => note.toString().replace(/[0-9]/g, '')))
            console.log(notes)
            setNoteSet(notes.map((val, i) => {
                return {
                    note: val,
                    deg: String(i + 1),
                    freqSet: notesFreq[val]
                }
            }))
        }
    }

    useEffect(() => {
        // setup(setFrequency) // TODO: Uncomment
        getChanges().then(res => {
            setSongs(res.data.data)
        })
        return closeChanges
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (begin!==0){
            initTest()
        }
        // eslint-disable-next-line
    }, [begin])


    useEffect(() => {
        if (frequency && noteSet) {
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
        if (begin && pitches && pitches.reduce((acc, val) => acc && val.found)){
            setPitches(selectPitches(getPitches(chords[1].tone), level))
            chords.shift()
            initChord()
        }
        // eslint-disable-next-line
    }, [frequency])

    useEffect(() => {
        if (begin && chords)
            setPitches(selectPitches(getPitches(chords[0].tone), level))
        // eslint-disable-next-line
    }, [level])

    return (
        <div className="cc">
            {begin!==0 ? <div className="cc__main">
                <h3>{chordChange}</h3>
                <div className="main__current">
                    <h1>{chords[0]?.root}<sup>{chords[0]?.tone}</sup></h1>
                    <h4>{pitches.map(({ pitch, found }, i) => {
                        return <p key={`${i} pitches`} className={found ? "main__current__pitch--found" : ""}>{pitch} &nbsp;</p>
                    })}</h4>
                </div>

                {chords[1] ?
                    <div className="main__next">
                        <h5>Next</h5>
                        <h1>{chords[1]?.root}<sup>{chords[1]?.tone}</sup></h1>
                        <h4>{selectPitches(getPitches(chords[1]?.tone), level).map(({ pitch }) => {
                            return pitch
                        }).join(" ")}</h4>
                    </div> : ""}
            </div> : ""}
            <Option level={level} setLevel={setLevel}
                chordChange={chordChange} setChordChange={setChordChange}
                order={order} setOrder={setOrder}
                repeat={repeat} setRepeat={setRepeat}
                begin={begin} setBegin={beginTest} songs={songs} />
        </div>
    );
}

export default ChordChanges;