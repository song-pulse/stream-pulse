import React, { useState } from "react"
import axios from "axios"
import Files from "../file/files"
import StartButton from "../run/startRun"
import RunShort from "../run/runShort"

function Recording(props) {
  const [res, setRes] = useState([])
  const [loaded, isLoaded] = useState(false)

  const load = () => {
    axios.get(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id)
      .then(function(response) {
        setRes(response.data)
        isLoaded(true)
      })
  }

  if (!loaded) { //only load once
    load()
  }

  return loaded && res ? (
    <>
      <StartButton {...props} refresh={load}/>
      <RunShort {...props} data={res.runs}/>
      <Files {...props} data={res.files} refresh={load} runs={res.runs}/>
    </>) : <div class="loader"></div>
}

export default Recording
