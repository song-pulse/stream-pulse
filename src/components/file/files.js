import React, {useState} from "react"
import axios from "axios"
import Bubble from "../bubble"
import ModifyFile from "./modifyFile"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

function Files(props) {
  const [sensors, setSensors] = useState([])
  const [loaded, isLoaded] = useState(false)

  const loadSensors = () => {
    axios.get(process.env.GATSBY_API_URL+"sensors")
      .then(function(response) {
        isLoaded(true);
        setSensors(response.data);
      })
  }

  const createTypeRows = (sensors, files) => {
    return sensors.map(sensor => {
      let file = files.find(file => file.sensor_id === sensor.id)
      return (
        <Box style={{marginBottom:"10px"}}>
          <Typography variant={"h5"} gutterBottom>{sensor.name}</Typography>
          <ModifyFile refresh={props.refresh} part_id={props.part_id} rec_id={props.rec_id} sensor_id={sensor.id} sensor={sensor.name} name={file ? file.name : ""}/>
        </Box>
      )
    })
  }

  if (!loaded) { //only load once
    loadSensors();
  }

  return sensors ? (
    <Bubble title={"Files"}>
      {createTypeRows(sensors, props.data)}
    </Bubble>) : "" //TODO add loading animation
}



export default Files