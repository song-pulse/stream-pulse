import React, { useState } from "react"
import axios from "axios"
import Bubble from "../bubble"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

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
    <Bubble title = {"Run " + props.run_id + " Details"}>
      <List>
        <ListItem key= {"run-time"}>
          <ListItemText primary= {"Time: "+ new Date(res.current_time * 1000).toISOString().substr(11,8)}>
          </ListItemText>
        </ListItem>
        <ListItem key= {"running"}>
          <ListItemText primary= {"Running: "+ res.is_running}>
          </ListItemText>
        </ListItem>
        <ListItem key= {"runid"}>
          <ListItemText primary= {"Run ID: "+ res.id}>
          </ListItemText>
        </ListItem>
        <ListItem key= {"recordingid"}>
          <ListItemText primary= {"Recording ID: "+ res.recording_id}>
          </ListItemText>
        </ListItem>
        <ListItem key= {"songid"}>
          <ListItemText primary= {"Song ID: "+ "res.results[1].song_id"}>
          </ListItemText>
        </ListItem>
        <ListItem key= {"songname"}>
          <ListItemText primary= {"Song Name: "+ "res.results['song']['name']"}>
          </ListItemText>
        </ListItem>
        <ListItem key= {"spotifylink"}>
          <ListItemText primary= {"Spotify: "+ "res.results['song']['link']"}>
          </ListItemText>
        </ListItem>
        {/* TODO: here put the spotify integration showplaylist as in participants recording and fix the songname, songid */}
      </List>
      {/* TODO: this can be removed as soon as songname and songid is fixed */}
      {JSON.stringify(res)}
      {/* <PlaylistDialog></PlaylistDialog> */}
    </Bubble>) : <div class="loader"></div>
}

export default Run