import React from "react"
import Button from "@material-ui/core/Button"
import axios from "axios"

const StartButton = (props) => {

  const startRun = () => {
    axios.post(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/runs", {
      current_time: 0,
      is_running: true,
    })
      .then(r => props.refresh())
      .catch((error) => console.log(error))
  }

  return <Button onClick={startRun} variant="contained" color={"primary"}>Start new Run</Button>
}

export default StartButton