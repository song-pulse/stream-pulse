import React from "react"
import { Link } from "gatsby"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Line from "../line"


function RecordingShort(props) {
  let data = props.data;
  return (
    <Line>
      <Grid container spacing={2} direction="row" justify="center" alignItems="center">
        <Grid item xs={6}><Typography>{data.name}</Typography></Grid>
        <Grid item xs={6}>
          <Link to={"/participants/" + data.participant_id + "/recordings/" + data.id}>Show Details</Link>
        </Grid>
      </Grid>
    </Line>
  )
}

export default RecordingShort