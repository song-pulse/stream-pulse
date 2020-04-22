import React, { useState } from "react"
import axios from "axios"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Bubble from "../bubble"
import AddSensor from "./addSensor"
import DeleteButton from "./deleteSensor"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import List from "@material-ui/core/List"

function Sensors(props) {
  const [res, setRes] = useState([])
  const [loaded, isLoaded] = useState(false)

  const load = () => {
    axios.get(process.env.GATSBY_API_URL + "sensors")
      .then(function(response) {
        setRes(response.data)
        isLoaded(true)
      })
  }

  if (!loaded) { //only load once
    load();
  }

  return res ? (
    <Bubble title={props.name}>
      <List>
        <ListItem key={"sensor-title"}>
          <ListItemText primary={"id: name @ frequency"}/>
        </ListItem>
        {res.map(sens =>
          <ListItem key={"sensor-" + sens.id}>
            <ListItemText primary={sens.id + ": " + sens.name} secondary={"@ " + sens.frequency + " seconds"}/>
            <ListItemSecondaryAction>
              <DeleteButton sensor_id={sens.id} refresh={load}/>
            </ListItemSecondaryAction>
          </ListItem>)
        }
      </List>
      <br/>
      <AddSensor refresh={load}/>
    </Bubble>) : "" //TODO add loading animation
}

export default Sensors