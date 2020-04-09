import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import axios from "axios"

const Upload = () => {
  const [name, setName] = useState("");
  return (
    <>
      <TextField required label="New Participant" variant="outlined" size={"small"} onChange={e => setName(e.target.value)} value={name}/>
      <Button onClick={() => name ? createUser(name) : ""} variant="contained" color={"primary"} type="submit" style={{marginLeft:"10px"}}>Add</Button>
    </>
  )
}

const createUser = (name) => {
  axios.post(process.env.GATSBY_API_URL+"participants", { name: name })
    .then((response) => {console.log(response)})
    .catch((error) => {console.log(error)})
}

export default Upload