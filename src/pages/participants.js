import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Playlists from "../components/playlist/playlists"
import ParticipantView from "../components/participant/participantView"

const ParticipantPage = () => (
    <Router>
      <ParticipantView path="/participants/:id"></ParticipantView>
    </Router>
)

export default ParticipantPage
