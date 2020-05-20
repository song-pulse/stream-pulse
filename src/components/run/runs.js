import React, { useState } from "react"
import axios from "axios"
import Bubble from "../bubble"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Feedback from "../feedback/Feedback"

function Run(props) {
  const [res, setRes] = useState([])
  const [loaded, isLoaded] = useState(false)

  const load = () => {
    axios.get(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/runs/" + props.run_id)
      .then(function(response) {
        setRes(response.data)
        isLoaded(true)
      })
  }

  if (!loaded) { //only load once
    load()
  }

  return loaded && res ? (
    <>
      <Bubble title={"Run " + props.run_id + " Details"}>
        <List>
          <ListItem key={"running"}>
            <ListItemText primary={"Running: " + res.is_running}>
            </ListItemText>
          </ListItem>
          <ListItem key={"runid"}>
            <ListItemText primary={"Run ID: " + res.id}>
            </ListItemText>
          </ListItem>
          <ListItem key={"recordingid"}>
            <ListItemText primary={"Recording ID: " + res.recording_id}>
            </ListItemText>
          </ListItem>
          <ListItem key={"songid"}>
            <ListItemText primary={"Song ID: " + res.results[0].song_id}>
            </ListItemText>
          </ListItem>
          <ListItem key={"songname"}>
            <ListItemText primary={"Song Name: " + res.results[0]["song"].name}>
            </ListItemText>
          </ListItem>
          <ListItem key={"spotifylink"}>
            <ListItemText primary={"Spotify: " + res.results[0]["song"].link}>
            </ListItemText>
          </ListItem>
        </List>
      </Bubble>
      <Bubble title={"Results"}>
        {/* TODO: songid, songname, spotifylink nach unten nehmen zum feedback */}
        {res.results.map(r => <Feedback part_id={props.part_id} rec_id={props.rec_id} run_id={props.run_id} res={r}
                                        refresh={load}/>)}
      </Bubble>
    </>) : <div class="loader"></div>

}


export default Run