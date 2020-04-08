import React from "react"
import Paper from '@material-ui/core/Paper'
import Recording from "./recording"
import Button from "@material-ui/core/Button"

function Participant(props) {
  let data = props.data;
  return (
    <Paper style={{border:"1px solid black", padding:"0.5em", marginTop:"0.5em"}}>
      <Button>{data.name}</Button>
      {data.recordings.map(rec => <Recording key={rec.id} data={rec}/>)}
    </Paper>)
}

export default Participant