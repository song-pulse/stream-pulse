import axios from "axios"
import Bubble from "../bubble"
import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import List from "@material-ui/core/List"
import Button from "@material-ui/core/Button"
import { ListItem } from "@material-ui/core"

function SettingsThreshold() {
  const [stress_threshold, setStressThreshold] = useState(0.0)
  const [acc_threshold, setAccThreshold] = useState(0.0)
  const [temp_baseline, setTempBaseline] = useState(0.0)
  const [eda_threshold, setEDAThreshold] = useState(0.0)
  const [ibi_threshold, setIbiThreshold] = useState(0.0)
  const [prr_threshold, setPrrThreshold] = useState(0.0)
  const [temp_latency, setTempLatency] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loaded, isLoaded] = useState(false)

  const load = () => {
      axios.get(process.env.GATSBY_API_URL + "settings")
        .then(function(response) {
         console.log('responsedata', response.data)
         setStressThreshold(response.data.stress_threshold)
         setAccThreshold(response.data.acc_threshold)
         setEDAThreshold(response.data.eda_threshold)
         setTempBaseline(response.data.temp_baseline)
          setIbiThreshold(response.data.ibi_threshold)
          setPrrThreshold(response.data.prr_threshold)
          setTempLatency(response.data.temp_latency)
         setDuration(response.data.duration)
          isLoaded(true)
        })
    }

    const update = (event) => {
      event.preventDefault()
      axios.put(process.env.GATSBY_API_URL + "settings", {
        stress_threshold: stress_threshold,
        acc_threshold: acc_threshold,
        eda_threshold: eda_threshold,
        ibi_threshold: ibi_threshold,
        prr_threshold: prr_threshold,
        temp_baseline: temp_baseline,
        temp_latency: temp_latency,
        duration: duration,
      })
    }

    if (!loaded) { // only load once
      load();
    }

    return (
      <Bubble title={"Thresholds"}>
        <form onSubmit={update}>
          <List>
            <ListItem>
              <TextField required label="Stress Threshold" variant="outlined" size={"small"}
                         onChange={(s) => setStressThreshold(s.target.value)}
                         value={stress_threshold}/>
            </ListItem>
            <ListItem>
              <TextField required label="Acc Threshold" variant="outlined" size={"small"}
                         onChange={(s) => setAccThreshold(s.target.value)}
                         value={acc_threshold}/>
            </ListItem>
            <ListItem>
              <TextField required label="Temp Baseline" variant="outlined" size={"small"} onChange={(s) => setTempBaseline(s.target.value)}
                         value={temp_baseline}/>
            </ListItem>
            <ListItem>
              <TextField required label="EDA Threshold" variant="outlined" size={"small"}
                         onChange={(s) => setEDAThreshold(s.target.value)}
                         value={eda_threshold}/>
            </ListItem>
            <ListItem>
              <TextField required label="IBI Threshold" variant="outlined" size={"small"}
                         onChange={(s) => setIbiThreshold(s.target.value)}
                         value={ibi_threshold}/>
            </ListItem>
            <ListItem>
              <TextField required label="PRR Threshold" variant="outlined" size={"small"}
                         onChange={(s) => setPrrThreshold(s.target.value)}
                         value={prr_threshold}/>
            </ListItem>
            <ListItem>
              <TextField required label="Temp Latency" variant="outlined" size={"small"}
                         onChange={(s) => setTempLatency(s.target.value)}
                         value={temp_latency}/>
            </ListItem>
            <ListItem>
              <TextField required label="Duration" variant="outlined" size={"small"}
                         onChange={(s) => setDuration(s.target.value)}
                         value={duration}/>
            </ListItem>
            <ListItem>
              <Button variant="contained" color={"primary"} type="submit" style={{ marginLeft: "10px" }}>Update</Button>
            </ListItem>
          </List>
        </form>
      </Bubble>
    )
}

export default SettingsThreshold
