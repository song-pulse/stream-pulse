import React from "react"
import axios from "axios"
import Box from "@material-ui/core/Box"
import FileReader from "./fileReader"
import { cleanupValues } from "./cleanup"

const AddValues = (props) => {

  const createFile = async (filename) => {
    let res = await axios.post(process.env.GATSBY_API_URL+"participants/"+props.part_id+"/recordings/"+props.rec_id+"/files",
      { name:filename, sensor_id:props.sensor_id });
    return res.data.id
  }

  const createValue = async (timestamp, value1, value2, value3, file_id) => {
    let res = await axios.post(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/files/" + file_id + "/values",
      { timestamp: timestamp, value1: value1, value2: value2, value3: value3 })
    return res.status
  }

  const createValues = async (data, file_id) => {
    if (file_id && file_id > 0) {
      await cleanupValues(data, file_id, props.sensor_frequency, createValue)
    } else {
      console.log("error")
    }
  }

  return (
    <Box>
      <FileReader createFile={createFile} createValues={createValues} close={props.close}/>
    </Box>
  )
}

export default AddValues