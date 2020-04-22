import React from "react"
import { Link } from "gatsby"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Line from "../line"
import Bubble from "../bubble"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"


function RunShort(props) {

  const createTypeRows = (runs) => {
    return runs.map(run => {
      let current_timestamp = Math.max.apply(Math, run.results.map(function(o) {
        return o.timestamp
      }))
      let current_result = run.results.find(function(o) {
        return o.timestamp === current_timestamp
      })
      let link = ""
      if (current_result) {
        link = current_result.song.link.split("/").slice(-1).pop().split("?")[0] //this takes the link, gets the last part and removes the added ?
      }
      return (
        <Line>
          <Grid container spacing={2} direction="row" justify="center" alignItems="center">
            <Grid item xs={3}>{run.is_running ? <PlayArrowIcon/> : "DONE"}</Grid>
            <Grid item xs={3}><Typography>{run.name}</Typography></Grid>
            <Grid item xs={3}>
              <Link to={"/participants/" + props.part_id + "/recordings/" + props.rec_id + "/runs" + run.id}>Show
                Details</Link>
            </Grid>
            <Grid item xs={3}>
              {link ? <iframe title={link} src={"https://open.spotify.com/embed/track/" + link} width="100%" height="80"
                              frameBorder="0" allowTransparency="true" allow="encrypted-media"/> : ""}

            </Grid>
          </Grid>
        </Line>
      )
    })
  }

  return (
    <Bubble title={"Runs"}>
      {createTypeRows(props.data)}
    </Bubble>
  )
}

export default RunShort