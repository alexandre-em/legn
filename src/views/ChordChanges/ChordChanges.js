import * as ml5 from "ml5";
import { useEffect, useState } from "react";
import "./ChordChanges.css"

function ChordChanges() {
    const [frequency, setFrequency] = useState(0)

    useEffect(() => {
        setup()
        // eslint-disable-next-line
    }, [])

    const setup = async () => {
        const audioContext = new AudioContext();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        pitchDetection(audioContext, stream)
    }

    const pitchDetection = (audioContext, stream) => {
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

    return (
        <div className="cc">
            Pitch detected: {frequency}
        </div>
    );
}

export default ChordChanges;