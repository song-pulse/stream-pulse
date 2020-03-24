import React from "react"
import Upload from "../components/upload"
import Overview from "../components/overview"

const IndexPage = () => (
  <div style={{margin:"auto", width:"50%"}}>
    <h1>Stream-Pulse</h1>
    <Upload/>
    <br/>
    <Overview/>
  </div>
)

export default IndexPage
