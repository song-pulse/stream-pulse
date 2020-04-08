import React from "react"
import Upload from "../components/upload"
import Overview from "../components/overview"
import Typography from "@material-ui/core/Typography"

const IndexPage = () => (
  <div style={{margin:"auto", width:"80%"}}>
    <Typography variant="h1">Stream-Pulse</Typography>
    <Upload/>
    <br/>
    <Overview/>
  </div>
)

export default IndexPage
