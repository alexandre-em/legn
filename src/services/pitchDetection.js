import * as ml5 from "ml5";

const audioContext = new AudioContext();
let stream

/** Allume le micro */
const setup = async (setFrequency) => {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    pitchDetection(audioContext, stream, setFrequency)
}

/** Eteint le micro */
const closeChanges = async () => {
    stream.getTracks().forEach((track) => {
        track.stop()
    })
    // audioContext.close()
}

const pitchDetection = (audioContext, stream, setFrequency) => {
    // When the model is loaded
    const modelLoaded = () => {
        console.log('Model Loaded!');
        pitch.getPitch(getPitch)
    }

    const getPitch = (error, freq) => {
        audioContext.resume();
        if (error) {
            console.error(error);
        } else {
            if (freq) {
                setFrequency(freq);
            }
            pitch.getPitch(getPitch);
        }
    }
    const url = process.env.REACT_APP_ENDPOINT
    const pitch = ml5.pitchDetection(url, audioContext, stream, modelLoaded)
}

export { setup, closeChanges }
