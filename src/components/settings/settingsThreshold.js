import axios from "axios"
import Bubble from "../bubble"
import React, { useState } from "react"
// import ListItem from "@material-ui/core/ListItem"
// import ListItemText from "@material-ui/core/ListItemText"
import TextField from "@material-ui/core/TextField"
import List from "@material-ui/core/List"
import Button from "@material-ui/core/Button"
import { ListItem } from "@material-ui/core"

function SettingsThreshold(props) {
    const [res, setRes] = useState([])
    const [loaded, isLoaded] = useState(false)

    const load = () => {
      axios.get(process.env.GATSBY_API_URL + "/settings")
        .then(function(response) {
          setRes(response.data)
          isLoaded(true)
        })
    }

    const update = (event) => {
      axios.put(process.env.GATSBY_API_URL + "/settings", {stress_threshold: props.stress_threshold, acc_threshold: props.acc_threshold, eda_threshold: props.eda_threshold,
                ibi_threshold: props.ibi_threshold, temp_baseline: props.temp_baseline, temp_latency: props.temp_latency, duration: props.duration })
    }

    if (!loaded) { // only load once
      load();
    }

    return res ? (
      <Bubble title={props.name}>
        <form onSubmit={update}>
          <List>
            <ListItem>
              <TextField required label="Stress Threshold" variant="outlined" size={"small"} onChange={() => setRes(props.stress_threshold)}
                value={props.stress_threshold}/>
            </ListItem>
            <ListItem>
              <TextField required label="Acc Threshold" variant="outlined" size={"small"} onChange={() => setRes(props.acc_threshold)}
                value={props.acc_threshold}/>
            </ListItem>
            <ListItem>
              <TextField required label="Temp Threshold" variant="outlined" size={"small"} onChange={() => setRes(props.temp_threshold)}
                value={props.temp_threshold}/>
            </ListItem>
            <ListItem>
              <TextField required label="EDA Threshold" variant="outlined" size={"small"} onChange={() => setRes(props.eda_threshold)}
                value={props.eda_threshold}/>
            </ListItem>
            <ListItem>
              <TextField required label="IBI Threshold" variant="outlined" size={"small"} onChange={() => setRes(props.ibi_threshold)}
                value={props.ibi_threshold}/>
            </ListItem>
            <ListItem>
              <TextField required label="Temp Latency" variant="outlined" size={"small"} onChange={() => setRes(props.temp_latency)}
                value={props.temp_latency}/>
            </ListItem>
            <ListItem>
              <TextField required label="Duration" variant="outlined" size={"small"} onChange={() => setRes(props.duration)}
                value={props.duration}/>
            </ListItem>
            <ListItem>
              <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}
                onClick= { () => update()}>Update</Button>
            </ListItem>
          </List>
        </form>
      </Bubble>
    ): <div class="loader"></div>
    //TODO update method call when thresholds are written --> see below
    // return (
    //     <form onSubmit={createSensor}>
    //       <TextField required label="New Sensor" variant="outlined" size={"small"} onChange={e => setName(e.target.value)}
    //                  value={name}/>
    //       <TextField required label="Average Frequency (s)" variant="outlined" size={"small"} type="number"
    //                  onChange={e => setFrequency(e.target.value)} value={frequency} style={{ marginLeft: "10px" }}/>
    //       <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}
    //               disabled={!name || !frequency}>Create</Button>
    //     </form>
    //   )
}

export default SettingsThreshold


  
//     return res ? (
//       <Bubble title={props.name}>
//         <List>
//           <ListItem key={"sensor-title"}>
//             <ListItemText primary={"id: name @ frequency"}/>
//           </ListItem>
//           {res.map(sens =>
//             <ListItem key={"sensor-" + sens.id}>
//               <ListItemText primary={sens.id + ": " + sens.name} secondary={"@ " + sens.frequency + " seconds"}/>
//               <ListItemSecondaryAction>
//                 <DeleteButton sensor_id={sens.id} refresh={load}/>
//               </ListItemSecondaryAction>
//             </ListItem>)
//           }
//         </List>
//         <br/>
//         <AddSensor refresh={load}/>
//       </Bubble>) : <div class="loader"></div>
//   }