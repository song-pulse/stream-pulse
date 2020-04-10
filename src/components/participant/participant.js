import React from "react"
import Bubble from "../bubble"
import Recording from "../recording/recording"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios"


const Participant = (props) => {
  let data = props.data;
  return (
    <Bubble title={data.name}>
      <Box style={{display: "flex", justifyContent: "space-between"}}>
        <Box/>
        <Button onClick={() => deleteParticipant(data.id)} color="secondary" variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
      </Box>
      {data.recordings.map(rec => <Recording key={rec.id} data={rec}/>)}
      <Box style={{marginTop:"0.5em"}}>
        <Button color="primary" variant="contained">Add Recording</Button>
      </Box>
    </Bubble>)
}

const deleteParticipant = (id) => {
  axios.delete(process.env.GATSBY_API_URL+"participants/"+id)
    .then((response) => {console.log(response)})
    .catch((error) => {console.log(error)});
}

export default Participant