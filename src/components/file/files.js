import React, { useState } from "react"
import axios from "axios"
import Bubble from "../bubble"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { FileButton } from "./addFile"
import TextField from "@material-ui/core/TextField"
import { ValueButton } from "../values/displayValues"
import DeleteButton from "./deleteFile"

function Files(props) {
  const [sensors, setSensors] = useState([])
  const [loaded, isLoaded] = useState(false)

  const loadSensors = () => {
    axios.get(process.env.GATSBY_API_URL+"sensors")
      .then(function(response) {
        setSensors(response.data);
        isLoaded(true);
      })
  }

  const createTypeRows = (sensors, files) => {
    return sensors.map(sensor => {
      let file = files.find(file => file.sensor_id === sensor.id)
      return (
        <Box style={{marginBottom:"10px"}}>
          <Typography variant={"h5"} gutterBottom>{sensor.name + " @ " + sensor.frequency + "s"}</Typography>
          <Box display={"flex"}>
            <TextField required label="File" variant="outlined" size={"small"} value={file ? file.name : ""}
                       style={{ marginRight: "10px" }} disabled/>
            <FileButton refresh={props.refresh} part_id={props.part_id} rec_id={props.rec_id} sensor_id={sensor.id}
                        sensor_frequency={sensor.frequency} sensor={sensor.name} name={file ? file.name : ""}/>
            <ValueButton refresh={props.refresh} part_id={props.part_id} rec_id={props.rec_id}
                         file_id={file ? file.id : -1} filename={file ? file.name : ""}/>
            <DeleteButton refresh={props.refresh} part_id={props.part_id} rec_id={props.rec_id}
                          file_id={file ? file.id : -1} filename={file ? file.name : ""}/>
          </Box>
        </Box>
      )
    })
  }

  if (!loaded) { //only load once
    loadSensors();
  }

  return sensors && loaded ? (
    <Bubble title={"Files"}>
      {createTypeRows(sensors, props.data)}
    </Bubble>) : "" //TODO add loading animation
}

export default Files