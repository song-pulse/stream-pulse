import React, { useState } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import axios from "axios"
import Box from "@material-ui/core/Box"

function Graph(props) {
  const [values1, setValues1] = useState([])
  const [values2, setValues2] = useState([])
  const [values3, setValues3] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [relaxedResults, setRelaxedResults] = useState([])
  const [balancedResults, setBalancedResults] = useState([])
  const [stressedResults, setStressedResults] = useState([])
  const [loaded, isLoaded] = useState(false)

  const loadValues = () => {
    axios.get(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/files/" + props.file_id + "/values")
      .then(function(response) {
        let t = []
        let v1 = []
        let v2 = []
        let v3 = []
        let relaxed = []
        let balanced = []
        let stressed = []
        response.data.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).forEach(val => {
          t.push(new Date(val.timestamp * 1000).toISOString().substr(11, 8))
          v1.push(val.value1)
          v2.push(val.value2)
          v3.push(val.value3)
          let res = props.results && props.results.find((res) => res.timestamp === val.timestamp)
          relaxed.push(res && res.action === 0 ? val.value1 : 0.00)
          balanced.push(res && res.action === 1 ? val.value1 : 0.00)
          stressed.push(res && res.action === 2 ? val.value1 : 0.00)
        })
        setValues1(v1)
        setValues2(v2)
        setValues3(v3)
        setTimestamps(t)
        setRelaxedResults(relaxed)
        setBalancedResults(balanced)
        setStressedResults(stressed)
        isLoaded(true)
      })
  }

  if (!loaded) { //only load once
    loadValues()
  }

  const series = () => {
    let res = [{ name: props.filename !== "ACC" ? props.filename : "x-values", type: "line", data: values1 }]

    // if we have no values they are saved as 0.00, so if all values are 0.00 we assume that there are none
    if (values2.find((v) => v !== 0.00)) {
      res.push({ name: "y-values", type: "line", data: values2 })
    }
    if (values3.find((v) => v !== 0.00)) {
      res.push({ name: "z-values", type: "line", data: values3 })
    }

    res.push({ name: "Too Relaxed", type: "column", data: relaxedResults })
    res.push({ name: "Balanced", type: "column", data: balancedResults })
    res.push({ name: "Too Stressed", type: "column", data: stressedResults })
    return res
  }

  return values1 && timestamps && loaded ? <HighchartsReact
    highcharts={Highcharts}
    options={{
      title: {
        text: props.filename,
      },
      xAxis: {
        title: {
          text: "Timestamp",
        },
        categories: timestamps,
      },
      yAxis: {
        title: {
          text: 'Value'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false,
          },
          enableMouseTracking: true,
        },
      },
      series: series(),
    }}
  /> : <Box style={{ width: "500px", height: "400px" }}/>
}

export default Graph
