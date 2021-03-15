
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

export { getPitches, selectPitches }