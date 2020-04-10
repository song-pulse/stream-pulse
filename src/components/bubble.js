import React from "react"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

const Bubble = (props) => (
  <>
    {props.title ? <Button>{props.title}</Button> : ""}
    <Paper style={{border:"1px solid black", padding:"0.5em", marginTop:"0.5em"}}>
      {props.children}
    </Paper>
  </>
)

export default Bubble;