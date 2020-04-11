import React from "react"
import { Router } from "@reach/router"
import ParticipantView from "../components/participant/participantView"
import RecordingView from "../components/recording/recordingView"

const ParticipantPage = () => (
    <Router>
      <ParticipantView path="/participants/:id"></ParticipantView>
      <RecordingView path="/participants/:part_id/recordings/:id"></RecordingView>
    </Router>
)

export default ParticipantPage
