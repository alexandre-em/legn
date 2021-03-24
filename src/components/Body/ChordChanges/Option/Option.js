import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, NativeSelect, Radio, RadioGroup } from "@material-ui/core";
import './Option.css'
import { ReactComponent as ReactLogo } from '../../../../assets/images/undraw_Progress_tracking_re_ulfg.svg'

function Option(props) {
    return (
        <div className={`cc__option${props.begin!==0?"":" begin"}`}>
            <ReactLogo id="cc__image"/>
            <h2>Changes setup:</h2>
            <FormControl>
                <NativeSelect
                    value={props.level}
                    onChange={e => {
                        props.setLevel(e.target.value.split(",").map(val => JSON.parse(val)))
                    }}
                    name="age"
                    inputProps={{ 'aria-label': 'level' }}
                >
                    <option value={""}>None</option>
                    <optgroup label="SINGLE CHORD TONES">
                        <option value={"1"}>Root</option>
                        <option value={"3"}>3rd</option>
                        <option value={"5"}>5th</option>
                        <option value={"7"}>7th</option>
                    </optgroup>
                    <optgroup label="TWO CHORD TONES">
                        <option value={"1,3"}>Root, 3rd</option>
                        <option value={"1,5"}>Root, 5th</option>
                        <option value={"1,7"}>Root, 7th</option>
                        <option value={"3,5"}>3rd, 5th</option>
                        <option value={"3,7"}>3rd, 7th</option>
                    </optgroup>
                    <optgroup label="THREE CHORD TONES">
                        <option value={"1,3,5"}>Root, 3rd, 5th</option>
                        <option value={"3,5,7"}>3rd, 5th, 7th</option>
                    </optgroup>
                    <optgroup label="FOUR CHORD TONES">
                        <option value={"1,3,5,7"}>Root, 3rd, 5th, 7th</option>
                        <option value={"3,5,7,1"}>3rd, 5th, 7th, Root</option>
                        <option value={"5,7,1,3"}>5th, 7th, Root, 3rd</option>
                        <option value={"7,1,3,5"}>7th, Root, 3rd, 5th</option>
                    </optgroup>
                </NativeSelect>
                <FormHelperText>Level</FormHelperText>
            </FormControl>
            <FormControl>
                <NativeSelect
                    value={props.chordChange}
                    onChange={e => {
                        props.setChordChange(e.target.value)
                    }}
                    name="changes"
                    inputProps={{ 'aria-label': 'changes' }}
                >
                    <option value={""}>None</option>
                    {props.songs.map((val, i) =>{
                        return <option key={val.songname+i} value={i}>{val.songname}</option>
                    })}
                </NativeSelect>
                <FormHelperText>Chord Changes</FormHelperText>
            </FormControl>

            <h2>Workout options:</h2>
            <FormControl component="fieldset">
                <FormLabel component="legend">Order</FormLabel>
                <RadioGroup aria-label="Order" name="order" value={props.order} onChange={e => props.setOrder(e.target.value)}>
                    <FormControlLabel value="forward" control={<Radio color="primary"/>} label="Forward" />
                    <FormControlLabel value="reverse" control={<Radio color="primary"/>} label="Reverse" />
                    <FormControlLabel value="random" control={<Radio color="primary"/>} label="Random" />
                </RadioGroup>
            </FormControl>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.repeat}
                        onChange={e => props.setRepeat(e.target.checked)}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Repeat"
            />
            <button className="button" id="option__begin" onClick={e => props.setBegin()}>Begin</button>
        </div>
    )
}

export default Option
