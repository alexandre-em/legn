
const parseChords = (chord) => {
    return (chord.split('|').map(ch => {
        const rootTone = ch.split('.')
        return {
            root: rootTone[0],
            tone: rootTone[1]
        }
    }))
}

const getPitches = (tone) => {
    const t = tone.split('7')[0] + '7'
    switch (t) {
        case "maj7":
            return ["1", "0", "3", "0", "5", "0", "7"]
        case "min7":
            return ["1", "0", "♭3", "4", "5", "0", "♭7"]
        case "7":
            return ["1", "0", "3", "0", "5", "0", "♭7"]
        default:
            return ["1", "0", "♭3", "0", "5", "0", "7"]
    }
}

const selectPitches = (pitches, option) => {
    return option.map(pitch => {
        return {
            pitch: pitches[pitch - 1],
            found: false
        }
    })
}

const getChords = (chordParsed, order, setChords) => {
    switch (order) {
        case "reverse":
            return (chordParsed.reverse())
        case "random":
            return (chordParsed.sort(() => Math.random() - 0.5))
        default:
            return (chordParsed)
    }
}

export { getPitches, selectPitches, parseChords, getChords }