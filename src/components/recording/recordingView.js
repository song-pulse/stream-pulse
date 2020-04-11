import React from "react"
import Layout from "../layout"
import Recording from "./recording"


const RecordingView = (props) =>
  <Layout subtitle={"Recording " + props.id}>
    <Recording part_id={props.part_id} rec_id={props.id}/>
  </Layout>

export default RecordingView