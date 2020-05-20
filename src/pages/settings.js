import React from "react"
import Sensors from "../components/sensors/sensors"
import Layout from "../components/layout"
import SettingsThreshold from "../components/settings/settingsThreshold"

const SettingsPage = () => (
  <Layout subtitle={"Settings"}>
    <Sensors/>
    <SettingsThreshold/>
  </Layout>
)

export default SettingsPage
