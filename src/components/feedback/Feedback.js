import { Button } from "@material-ui/core"
import React, { useState } from "react"
import axios from "axios"
import Line from "../line"

const Feedback = (props) => {
    const [feedback, setFeedback]= useState(1) // default verdict is 1

    const createFeedback = (event) => {
      event.preventDefault()
      console.log('feedback',feedback)
      axios.put(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/runs/" + props.run_id + "/results/" + props.res.id, { verdict: feedback, timestamp: props.res.timestamp, song_id: props.res.song_id, input: props.res.input })
        .then((response) => {props.refresh()})
        .catch((error) => {console.log(error)})
    }

    return (
      <Line>
        <div>Timestamp: {props.res.timestamp}</div>
        <div>Song name: {props.res.song.name}</div>
        <div>Playlist: {props.res.action === 0 ? "Too Relaxed" : props.res.action === 1 ? "Balanced state" : props.red.action === 2 ? "Too Stressed" : "ERROR"} {props.res.song_queued ? " - QUEUED" : ""}</div>
        <form onSubmit={createFeedback}>
          <Button variant="contained" color={"primary"} type="submit"
                  onClick={() => setFeedback(2)}>Good</Button>
          <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}
                  onClick={() => setFeedback(1)}>Ok</Button>
          <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}
                  onClick={() => setFeedback(0)}>Bad</Button>
        </form>
      </Line>
    )
}

export default Feedback
