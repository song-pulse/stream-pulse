import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import AddValues from "./addValues"

const FileDialog = (props) => {
  return (
    <Dialog onClose={props.onClose} open={props.open} fullWidth>
      <DialogTitle>Upload File</DialogTitle>
      <DialogContent>
        <AddValues close={props.close} part_id={props.part_id} rec_id={props.rec_id} sensor_id={props.sensor_id}
                   sensor_frequency={props.sensor_frequency}/>
      </DialogContent>
    </Dialog>
  )
}

export const FileButton = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" color={"primary"} style={{ marginLeft: "10px" }}
              disabled={props.name}>Add File</Button>
      <FileDialog open={open} onClose={() => setOpen(false)} part_id={props.part_id} rec_id={props.rec_id}
                  sensor_id={props.sensor_id} sensor_frequency={props.sensor_frequency} close={() => {
        setOpen(false)
        props.refresh()
      }}/>
    </>
  )
}
