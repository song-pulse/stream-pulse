import React, { useState } from "react"
import axios from "axios"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Bubble from "../bubble"
import AddSensor from "./addSensor"

function Sensors(props) {
  const [res, setRes] = useState([])
  const [loaded, isLoaded] = useState(false)

  const load = () => {
    axios.get(process.env.GATSBY_API_URL+"sensors")
      .then(function(response) {
        setRes(response.data);
        isLoaded(true);
      })
  }

  if (!loaded) { //only load once
    load();
  }

  return res ? (
    <Bubble title={props.name}>
      <ListItem key={"sensor-title"}>
        <ListItemText primary={"id: name"} />
      </ListItem>
      {res.map(sens =>
        <ListItem key={"sensor-"+sens.id}>
          <ListItemText primary={sens.id + ": " + sens.name} />
        </ListItem>)
      }
    <br/>
    <AddSensor refresh={load}/>
    </Bubble>) : "" //TODO add loading animation
}

export default Sensors