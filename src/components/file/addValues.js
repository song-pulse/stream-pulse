import React from "react"
import axios from "axios"
import Box from "@material-ui/core/Box"
import FileReader from "./fileReader"

const AddValues = (props) => {

  const createFile = async (filename) => {
    let res = await axios.post(process.env.GATSBY_API_URL+"participants/"+props.part_id+"/recordings/"+props.rec_id+"/files",
      { name:filename, sensor_id:props.sensor_id });
    return res.data.id
  }

  const createValue = async (timestamp, value, file_id) => {
    let res = await axios.post(process.env.GATSBY_API_URL+"participants/"+props.part_id+"/recordings/"+props.rec_id+"/files/"+file_id+"/values",
      { timestamp:timestamp, value:value })
    return res.status
  }

  const createValues = async (data, file_id) => {

    if (file_id > 0) {
      let timestamp = parseInt(data[0])
      let frequency = parseInt(data[1])
      let timeWindow = 180
      let stepWindow = timeWindow*frequency

      let sum = 0
      for (let win = 2; win < data.length-stepWindow; win = win+stepWindow) {
        for (let winStart = win; winStart < win+stepWindow; winStart++) {
          sum = sum + parseFloat(data[winStart])
        }
        timestamp = timestamp + timeWindow;
        let avg = sum/stepWindow
        let res = await createValue(timestamp, avg, file_id)
        console.log(res + " " + avg)
        sum = 0
      }
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