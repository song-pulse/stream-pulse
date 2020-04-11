import React from "react"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

const Line = (props) => (
  <Box style={{marginTop:"0.5em", borderTop:"1px solid black", borderBottom:"1px solid black", padding:"0.5em"}}>
      {props.children}
  </Box>
)

export default Line;