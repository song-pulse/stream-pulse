import React from "react"
import Layout from "../layout"
import Run from "./runs"


const RunView = (props) =>
  <Layout subtitle={"Run " + props.id}>
    <Run part_id={props.part_id} rec_id={props.rec_id} run_id={props.id}/>
  </Layout>

export default RunView