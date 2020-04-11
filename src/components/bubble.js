import React from "react"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

const Bubble = (props) => (
  <Box style={{marginTop:"0.5em"}}>
    {props.title ? <Typography variant={"h6"}>{props.title}</Typography> : ""}
    <Paper style={{border:"1px solid black", padding:"0.5em"}}>
      {props.children}
    </Paper>
  </Box>
)

export default Bubble;