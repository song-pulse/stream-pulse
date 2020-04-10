import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import axios from "axios"

const AddParticipant = (props) => {
  const [name, setName] = useState("");

  const createUser = (event) => {
    event.preventDefault()
    axios.post(process.env.GATSBY_API_URL+"participants", { name: name })
      .then((response) => {props.refresh()})
      .catch((error) => {console.log(error)})
  }

  return (
    <>
      <form onSubmit={createUser}>
        <TextField required label="New Participant" variant="outlined" size={"small"} onChange={e => setName(e.target.value)} value={name}/>
        <Button variant="contained" color={"primary"} type="submit" style={{marginLeft:"10px"}} disabled={!name}>Add participant</Button>
      </form>
    </>
  )
}



export default AddParticipant