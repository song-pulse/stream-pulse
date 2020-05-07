import React, { useState } from "react"
import axios from "axios"
import Box from "@material-ui/core/Box"

function Run(props) {
  const [res, setRes] = useState([])
  const [loaded, isLoaded] = useState(false)

  const load = () => {
    axios.get(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/runs/" + props.run_id)
      .then(function(response) {
        setRes(response.data)
        isLoaded(true)
      })
  }

  if (!loaded) { //only load once
    load()
  }

  return loaded && res ? (
    <>
      {"RUN " + props.run_id + " loaded"}
      <Box>
        {JSON.stringify(res)}
      </Box>
    </>) : <div class="loader"></div>
}

export default Run