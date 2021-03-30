import * as ml5 from "ml5";

const audioContext = new AudioContext();
let stream

/** Allume le micro */
const setup = async (setFrequency) => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            latency: 0
        }, video: false
    });
    pitchDetection(audioContext, stream, setFrequency)
}

/** Eteint le micro */
const closeChanges = async () => {
    await stream?.getTracks().forEach((track) => {
        track.stop()
    })
    if (audioContext.state === 'running' || audioContext.state === 'suspended')
        audioContext?.close()
    console.log(audioContext)
}

const pitchDetection = (audioContext, stream, setFrequency) => {
    // When the model is loaded
    const modelLoaded = () => {
        console.log('Model Loaded!');
        pitch.getPitch(getPitch)
    }

    const getPitch = async (error, freq) => {
        if (audioContext.state === 'suspended')
            await audioContext.resume();
        if (error) {
            console.error(error);
        } else {
            if (freq) {
                setFrequency(freq);
            }
            pitch.getPitch(getPitch);
        }
    }
    const url = 'http://localhost:3000/models/' || process.env.REACT_APP_ENDPOINT
    const pitch = ml5.pitchDetection(url, audioContext, stream, modelLoaded)
}

export { setup, closeChanges }
