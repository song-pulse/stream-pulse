import React from "react"
import { Router } from "@reach/router"
import ParticipantView from "../components/participant/participantView"
import RecordingView from "../components/recording/recordingView"
import RunView from "../components/run/runView"

const ParticipantPage = () => (
  <Router>
    <ParticipantView path="/participants/:id"/>
    <RecordingView path="/participants/:part_id/recordings/:id"/>
    <RunView path="/participants/:part_id/recordings/:rec_id/runs/:id"/>
  </Router>
)

export default ParticipantPage
