import React, {useState} from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"

const PlaylistDialog = (props) => {
  let link = props.link.split("/").slice(-1).pop().split("?")[0]

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <iframe title={link} src={"https://open.spotify.com/embed/playlist/"+link} width="300" height="380" frameBorder="0"
              allowTransparency="true" allow="encrypted-media"/>
    </Dialog>
  )
}

export const PlaylistButton = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" color={"primary"} style={{marginLeft:"10px"}} disabled={!props.link}>Show</Button>
      <PlaylistDialog open={open} onClose={() => setOpen(false)} link={props.link}/>
    </>
  )
}

