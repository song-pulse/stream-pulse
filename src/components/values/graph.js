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
  const [loaded, isLoaded] = useState(false)

  const loadValues = () => {
    axios.get(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/files/" + props.file_id + "/values")
      .then(function(response) {
        let t = []
        let v1 = []
        let v2 = []
        let v3 = []
        response.data.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).forEach(val => {
          t.push(new Date(val.timestamp * 1000).toISOString().substr(11, 8))
          v1.push(val.value1)
          v2.push(val.value2)
          v3.push(val.value3)
        })
        setValues1(v1)
        setValues2(v2)
        setValues3(v3)
        setTimestamps(t)
        isLoaded(true)
      })
  }

  if (!loaded) { //only load once
    loadValues()
  }

  const series = () => {
    let res = [{ name: "x-values", data: values1 }]

    // if we have no values they are saved as 0.00, so if all values are 0.00 we assume that there are none
    if (values2.find((v) => v !== 0.00)) {
      res.push({ name: "y-values", data: values2 })
    }
    if (values3.find((v) => v !== 0.00)) {
      res.push({ name: "z-values", data: values3 })
    }
    return res
  }

  return values1 && timestamps && loaded ? <HighchartsReact
    highcharts={Highcharts}
    options={{
      chart: {
        type: "line",
      },
      title: {
        text: props.filename,
      },
      xAxis: {
        title: {
          text: 'Timestamp'
        },
        categories: timestamps
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