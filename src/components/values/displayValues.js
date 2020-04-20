import React, {useState} from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import Graph from "./graph"

const ValueDialog = (props) => {
  return (
    <Dialog onClose={props.onClose} open={props.open} fullWidth>
        <Graph close={props.close} part_id={props.part_id} rec_id={props.rec_id} file_id={props.file_id} filename={props.filename}/>
    </Dialog>
  )
}

export const ValueButton = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" color={"primary"} style={{marginLeft:"10px"}} disabled={!props.filename}>Show Values</Button>
      <ValueDialog open={open} onClose={() => setOpen(false)} part_id={props.part_id} rec_id={props.rec_id} file_id={props.file_id} filename={props.filename} close={() => setOpen(false)}/>
    </>
  )
}
