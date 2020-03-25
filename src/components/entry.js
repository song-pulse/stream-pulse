import React from "react"
import axios from "axios"

function Entry(props) {
  let data = props.data;
  return (
    <div style={{border:"1px solid black", padding:"1.5em", marginTop:"0.5em"}}>
      <button onClick={() => start_stop_simulation(data.id, !data.running)}>{data.running ? "x STOP" : "> RUN"}</button>
      <p style={{display:"inline"}}> {"  "+data.timeRunning}/{data.timeTotal}</p>
      <p style={{display:"inline"}}> {"  "+data.participantId}</p>
      <p style={{display:"inline"}}>{"  "+data.song}</p>
    </div>
  )
}

function start_stop_simulation(id, start_stop) {
  axios.put(process.env.GATSBY_API_URL+"simulations/" + id, {start_stop: start_stop})
    .then(function(response) {
      console.log(response);
  });
}

export default Entry