import React from "react"
import Sensors from "../components/sensors/sensors"
import Layout from "../components/layout"

const SettingsPage = () => (
  <Layout subtitle={"Settings"}>
    <h3>Sensors</h3>
    <Sensors/>
  </Layout>
)

export default SettingsPage
