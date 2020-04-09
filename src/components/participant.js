import React from "react"
import Paper from '@material-ui/core/Paper'
import Recording from "./recording"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import axios from "axios"

const Participant = (props) => {
  let data = props.data;
  return (
    <Paper style={{border:"1px solid black", padding:"0.5em", marginTop:"0.5em"}}>
      <Box style={{display: "flex", justifyContent: "space-between"}}>
        <Button>{data.name}</Button>
        <Button onClick={() => deleteParticipant(data.id)}>Delete</Button>
      </Box>

      {data.recordings.map(rec => <Recording key={rec.id} data={rec}/>)}
    </Paper>)
}

const deleteParticipant = (id) => {
  axios.delete(process.env.GATSBY_API_URL+"participants/"+id)
    .then((response) => {console.log(response)})
    .catch((error) => {console.log(error)});
}

export default Participant