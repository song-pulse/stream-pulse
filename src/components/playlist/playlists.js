import React, {useState} from "react"
import axios from "axios"
import Bubble from "../bubble"
import ModifyPlaylist from "./modifyPlaylist"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

function Playlists(props) {
  const [res, setRes] = useState([])
  const [loaded, isLoaded] = useState(false)
  let types = ["Relax", "Motivate", "Balance"]

  const load = () => {
    axios.get(process.env.GATSBY_API_URL+"participants/"+props.part_id+"/playlists")
      .then(function(response) {
        isLoaded(true);
        setRes(response.data);
      })
  }

  const createTypeRows = (types, res) => {
    return types.map(type => {
      let playlist = res.find(plist => plist.type === type)
      return (
        <Box style={{marginBottom:"10px"}}>
          <Typography variant={"h5"} gutterBottom>{type}</Typography>
          <ModifyPlaylist refresh={load} part_id={props.part_id} link={playlist ? playlist.link : ""} type={type}/>
        </Box>
      )
    })
  }

  if (!loaded) { //only load once
    load();
  }

  console.log(res)

  return res ? (
    <Bubble title={"Playlists"}>
      {createTypeRows(types, res)}
      <br/>

    </Bubble>) : <div class="loader"></div>
}



export default Playlists