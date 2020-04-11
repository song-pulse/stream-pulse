import React from "react"
import Layout from "../layout"
import Playlists from "../playlist/playlists"


const ParticipantView = (props) =>
  <Layout subtitle={"Participant " + props.id}>
    <Playlists part_id={props.id}/>
  </Layout>

export default ParticipantView