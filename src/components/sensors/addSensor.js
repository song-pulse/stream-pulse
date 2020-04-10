import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import axios from "axios"

const AddSensor = (props) => {
  const [name, setName] = useState("");

  const createSensor = (event) => {
    event.preventDefault()
    console.log(name)
    axios.post(process.env.GATSBY_API_URL+"sensors", { name: name })
      .then((response) => {props.refresh()})
      .catch((error) => {console.log(error)})
  }

  return (
    <form onSubmit={createSensor}>
      <TextField required label="New Sensor" variant="outlined" size={"small"} onChange={e => setName(e.target.value)} value={name}/>
      <Button variant="contained" color={"primary"} type="submit" style={{marginLeft:"10px"}} disabled={!name}>Add sensor</Button>
    </form>
  )
}

export default AddSensor