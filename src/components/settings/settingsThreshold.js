import axios from "axios"
import Bubble from "../bubble"
import React, { useState } from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"

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

    if (!loaded) { // only load once
      load();
    }

    return res ? (
      <Bubble title={props.name}>
        <List>
            TODO fill list
            {/* <ListItem key={"settingthreshold-title"}>
              <ListItemText primary= {}/>
            </ListItem> */}

        </List>

      </Bubble>
    ): <div class="loader"></div>
    //return props
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