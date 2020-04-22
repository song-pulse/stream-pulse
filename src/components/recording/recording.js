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
      <StartButton part_id={props.part_id} rec_id={props.rec_id} refresh={load}/>
      <RunShort data={res.runs} part_id={props.part_id} rec_id={props.rec_id}/>
      <Files data={res.files} part_id={props.part_id} rec_id={props.rec_id} refresh={load}/>
    </>) : "" //TODO add loading animation
}

export default Recording