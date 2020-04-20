import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import axios from "axios"
import TextField from "@material-ui/core/TextField"

const AddRecording = (props) => {
  const [name, setName] = useState("")

  const createRecording = (event) => {
    event.preventDefault()
    axios.post(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings", { name: name })
      .then((response) => {
        props.refresh()
        setName("")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <form onSubmit={createRecording}>
        <TextField required label="New Recording" variant="outlined" size={"small"}
                   onChange={e => setName(e.target.value)} value={name}/>
        <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}
                disabled={!name}>Create</Button>
      </form>
    </>
  )
}

export default AddRecording