import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import axios from "axios"

const AddSensor = (props) => {
  const [name, setName] = useState("")
  const [frequency, setFrequency] = useState(180)

  const createSensor = (event) => {
    event.preventDefault()
    console.log(name)
    axios.post(process.env.GATSBY_API_URL + "sensors", { name: name, frequency: frequency })
      .then((response) => {props.refresh()})
      .catch((error) => {console.log(error)})
  }

  return (
    <form onSubmit={createSensor}>
      <TextField required label="New Sensor" variant="outlined" size={"small"} onChange={e => setName(e.target.value)}
                 value={name}/>
      <TextField required label="Average Frequency (s)" variant="outlined" size={"small"} type="number"
                 onChange={e => setFrequency(e.target.value)} value={frequency} style={{ marginLeft: "10px" }}/>
      <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}
              disabled={!name || !frequency}>Create</Button>
    </form>
  )
}

export default AddSensor