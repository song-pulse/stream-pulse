import React from "react"
import axios from "axios"

function Entry(props) {
  let data = props.data;
  let run = data.runs.find(run => run.is_running)
  let is_running = false
  let song = ""
  if (run) {
    is_running = true
    let current_timestamp = Math.max.apply(Math, run.results.map(function(o) { return o.timestamp; }))
    let current_result = run.results.find(function(o){ return o.timestamp === current_timestamp; })
    console.log(current_result)
    song = current_result ? current_result.song : "NOT RUNNING"
  }
  return (
    <div style={{border:"1px solid black", padding:"1.5em", marginTop:"0.5em"}}>
      <button onClick={() => start_stop_simulation(data.id, !is_running)}>{is_running ? "x STOP" : "> RUN"}</button>
      <p style={{display:"inline"}}> {"  "+ (run ? run.current_time: 0)}/{data.total_time}</p>
      <p style={{display:"inline"}}> {"  "+ data.participant_id}</p>
      <p style={{display:"inline"}}>{"  "+ song}</p>
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