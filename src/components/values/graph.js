import React, { useState } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import axios from "axios"
import Box from "@material-ui/core/Box"

function Graph(props) {
  const [values, setValues] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [loaded, isLoaded] = useState(false)

  const loadValues = () => {
    axios.get(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/files/" + props.file_id + "/values")
      .then(function(response) {
        let t = []
        let v = []
        response.data.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).forEach(val => {
          t.push(new Date(val.timestamp * 1000).toISOString().substr(11, 8))
          v.push(val.value1)
        })
        setValues(v)
        setTimestamps(t);
        isLoaded(true);
      })
  }

  if (!loaded) { //only load once
    loadValues();
  }
  return values && timestamps && loaded ? <HighchartsReact
    highcharts={Highcharts}
    options={{
      chart: {
        type: 'line'
      },
      title: {
        text: props.filename
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
            enabled: false
          },
          enableMouseTracking: true
        }
      },
      series: [{
        data: values
      }]
    }}
  /> : <Box style={{ width: "500px", height: "400px" }}/>
}

export default Graph