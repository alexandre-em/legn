
const getPitches = (tone) => {
    switch (tone) {
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

const getScale = (root, tone) => {
    const rootCode = root.charCodeAt(0)-65;
    return tone.map( (pitch, i) => {
        const note = ((rootCode + i)%7)+65
        if(pitch.includes("♭"))
            return String.fromCharCode(note) + "♭"
        return String.fromCharCode(note)
    })
}

export { getPitches, selectPitches }