import React from "react"
import { Link } from "gatsby"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Line from "../line"


function RecordingShort(props) {
  let data = props.data;
  let run = data.runs.find(run => run.is_running)
  let link = ""
  if (run) {
    let current_timestamp = Math.max.apply(Math, run.results.map(function(o) { return o.timestamp; }))
    let current_result = run.results.find(function(o){ return o.timestamp === current_timestamp; })
    link = current_result.song.link.split("/").slice(-1).pop().split("?")[0] //this takes the link, gets the last part and removes the added ?
  }
  return (
    <Line>
      <Grid container spacing={2} direction="row" justify="center" alignItems="center">
        <Grid item xs={4}><Typography>{data.name}</Typography></Grid>
        <Grid item xs={4}>
          <Link to={"/participants/" + data.participant_id + "/recordings/" + data.id}>Show Details</Link>
        </Grid>
        <Grid item xs={4}>
          {link ? <iframe title={link} src={"https://open.spotify.com/embed/track/" + link} width="100%" height="80"
                          frameBorder="0" allowTransparency="true" allow="encrypted-media"/> : ""}

        </Grid>
      </Grid>
    </Line>
  )
}

export default RecordingShort