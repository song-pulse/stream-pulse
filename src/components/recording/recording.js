import React from "react"
import Button from '@material-ui/core/Button'
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import Typography from "@material-ui/core/Typography"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Bubble from "../bubble"



function Recording(props) {
  let data = props.data;
  let run = data.runs.find(run => run.is_running)
  let is_running = false
  let link = ""
  let total_time = convertSecondsToHMS(data.total_time)
  let current_time = convertSecondsToHMS(0);
  if (run) {
    is_running = true
    let current_timestamp = Math.max.apply(Math, run.results.map(function(o) { return o.timestamp; }))
    current_time = convertSecondsToHMS(current_timestamp)
    let current_result = run.results.find(function(o){ return o.timestamp === current_timestamp; })
    link = current_result.song.link.split("/").slice(-1).pop().split("?")[0] //this takes the link, gets the last part and removes the added ?
  }
  return (
    <Bubble>
      <Grid container spacing={2} direction="row" justify="center" alignItems="center">
        <Grid item xs={3}>
          <Button onClick={() => start_stop_simulation(data.id, !is_running)} variant={"contained"} color={is_running ? "secondary" : "primary"} startIcon={is_running ? <StopIcon/> : <PlayArrowIcon />}>{is_running ? "stop" : "Start"}</Button>
        </Grid>
        <Grid item xs={3}><Typography>{current_time}/{total_time}</Typography></Grid>
        <Grid item xs={3}>
          <Button>Show Details</Button>
        </Grid>
        <Grid item xs={3}>
          {link ? <iframe title={link} src={"https://open.spotify.com/embed/track/" + link} width="100%" height="80"
                  frameBorder="0" allowTransparency="true" allow="encrypted-media"/> : ""}

        </Grid>
      </Grid>
    </Bubble>
  )
}

function start_stop_simulation(id, start_stop) {
  axios.put(process.env.GATSBY_API_URL+"simulations/" + id, {start_stop: start_stop})
    .then(function(response) {
      console.log(response);
  });
}

function convertSecondsToHMS(seconds) {
  let measuredTime = new Date(null);
  measuredTime.setSeconds(seconds);
  return measuredTime.toISOString().substr(11, 8);
}

export default Recording