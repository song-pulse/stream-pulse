import React, { useEffect, useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { PlaylistButton } from "./showPlaylist"

const ModifyPlaylist = (props) => {
  const [link, setLink] = useState("");
  let originalLink = props.link;

  useEffect(() => {
    setLink(props.link);
  }, [props.link]);

  const modifyPlaylist = (event) => {
    event.preventDefault()
    if (!originalLink) {
      axios.post(process.env.GATSBY_API_URL+"participants/"+props.part_id+"/playlists", { link: link, type: props.type })
        .then((response) => {props.refresh()})
        .catch((error) => {console.log(error)})
    } else {
      axios.put(process.env.GATSBY_API_URL+"participants/"+props.part_id+"/playlists", { link: link, type: props.type })
        .then((response) => {props.refresh()})
        .catch((error) => {console.log(error)})
    }

  }

  return (
    <form onSubmit={modifyPlaylist}>
      <TextField required label="Add Playlist" variant="outlined" size={"small"} onChange={e => setLink(e.target.value)} value={link}/>
      <Button variant="contained" color={"primary"} type="submit" style={{marginLeft:"10px"}} disabled={!link || originalLink === link}>Set Playlist</Button>
      <PlaylistButton link={link}/>
    </form>
  )
}

export default ModifyPlaylist