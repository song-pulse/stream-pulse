import { Button } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import React, { useState } from "react";
import axios from "axios"
import Bubble from "../bubble";

const SettingsThreshold = (props) => {
    const [feedback, setFeedback]= useState(1) // default verdict is 1

    const createFeedback = (event) => {
      event.preventDefault()
      console.log('feedback',feedback)
      axios.put(process.env.GATSBY_API_URL + "settings", { verdict: feedback })
        .then((response) => {props.refresh()})
        .catch((error) => {console.log(error)})
    }

    return (
      <Bubble title= {props.name}>
        <form onSubmit={createFeedback}>
          <TextField required label="Feedback here" variant="outlined" size={"small"}/>
            <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }} onClick={ () => setFeedback(feedback => 2)}>Good</Button>
            <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }} onClick={ () => setFeedback(feedback => 1)}>Ok</Button>
            <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }} onClick={ () => setFeedback(feedback => 0)}>Bad</Button>
        </form>
      </Bubble>
    )
}

export default SettingsThreshold