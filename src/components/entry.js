import React from "react"

function Entry(props) {
  let data = props.data;
  return (
    <div style={{border:"1px solid black", padding:"1.5em"}}>
      <p style={{display:"inline"}}>{data.running ? "x Running" : "> Waiting"}</p> <p style={{display:"inline"}}>{data.timeRunning}/{data.timeTotal}</p> <p style={{display:"inline"}}>{data.participantId}</p> <p style={{display:"inline"}}>{data.song}</p>
    </div>
  )
}

export default Entry