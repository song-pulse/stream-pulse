import React, { useState } from "react"
import axios from "axios"
import Bubble from "../bubble"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Feedback from "../feedback/Feedback"
import Button from "@material-ui/core/Button"

function Run(props) {
  const [res, setRes] = useState([])
  const [loaded, isLoaded] = useState(false)
  const [filter, isFilter] = useState(true)

  const load = () => {
    axios.get(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/runs/" + props.run_id)
      .then(function(response) {
        setRes(response.data)
        console.log('requesturl',process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/runs/" + props.run_id)
        console.log('responsedata', response.data)
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
        </List>
      </Bubble>
      <Bubble title={"Results"}>
        <Button variant="contained" color={"primary"} style={{ marginLeft: "10px" }} onClick={() => isFilter(!filter)}>
          {filter ? "Show all" : "Show queued only"}
        </Button>
        {res.results.map(r => !filter || r.song_queued ?
          <Feedback part_id={props.part_id} rec_id={props.rec_id} run_id={props.run_id} res={r}
                    refresh={load}/> : null)}
      </Bubble>
    </>) : <div class="loader"></div>

}


export default Run
