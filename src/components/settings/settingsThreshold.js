import { Button } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import React, { useState } from "react";
import axios from "axios"
import Bubble from "../bubble";

const SettingsThreshold = (props) => {
    const [res, setRes] = useState("")
    const [feedback, setFeedback]= useState("")

    const createFeedback = (event) => {
      event.preventDefault()
      console.log(res)
      axios.post(process.env.GATSBY_API_URL + "settings")
        .then((response) => {props.refresh()})
        .catch((error) => {console.log(error)})
    }

    return (
      <Bubble title= {props.name}>
        <form onSubmit={createFeedback}>
          <TextField required label="Feedback here" variant="outlined" size={"small"}/>
            <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}>Good</Button>
            <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}>Ok</Button>
            <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}>Bad</Button>
        </form>
      </Bubble>
    )
}

export default SettingsThreshold


// TODO: save the feedback in the db with the post request and a setFeedback here in the buttons
// axios.post(process.env.GATSBY_API_URL + "sensors", { name: name, frequency: frequency })
// return (
    //       <form onSubmit={createSensor}>
    //         <TextField required label="New Sensor" variant="outlined" size={"small"} onChange={e => setName(e.target.value)}
    //                    value={name}/>
    //         <TextField required label="Average Frequency (s)" variant="outlined" size={"small"} type="number"
    //                    onChange={e => setFrequency(e.target.value)} value={frequency} style={{ marginLeft: "10px" }}/>
    //         <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}
    //                 disabled={!name || !frequency}>Create</Button>
    //       </form>
    //     )