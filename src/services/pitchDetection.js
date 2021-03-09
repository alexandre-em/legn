import * as ml5 from "ml5";

const setup = async (setFrequency) => {
    const audioContext = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    pitchDetection(audioContext, stream, setFrequency)
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
    const pitch = ml5.pitchDetection('http://localhost:3000/models/', audioContext, stream, modelLoaded)
}

export { setup }