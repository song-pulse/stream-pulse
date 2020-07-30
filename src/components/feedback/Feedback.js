import React, { useState } from "react"
import axios from "axios"
import Line from "../line"

const Feedback = (props) => {
    const [feedback, setFeedback]= useState(1) // default verdict is 1

    const createFeedback = (event) => {
      event.preventDefault()
      console.log("feedback", feedback)
      axios.put(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/runs/" + props.run_id + "/results/" + props.res.id, {
        verdict: feedback,
        timestamp: props.res.timestamp,
        song_id: props.res.song_id,
        input: props.res.input,
      })
        .then((response) => {
          props.refresh()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  let date = new Date(props.res.timestamp * 1000)

    return (
      <Line>
        <div>Timestamp: {date.toString()}</div>
        <div>Song name: {props.res.song.name}</div>
        <div>Playlist: {props.res.action === 0 ? "Too Relaxed" : props.res.action === 1 ? "Balanced state" : props.res.action === 2 ? "Too Stressed" : "ERROR"} {props.res.song_queued ? " - QUEUED" : ""}</div>
      </Line>
    )
}

export default Feedback
