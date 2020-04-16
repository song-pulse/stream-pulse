import React from "react"
import Button from "@material-ui/core/Button"
import axios from "axios"

const AddRecording = (props) => {

  const createRecording = (event) => {
    event.preventDefault()
    axios.post(process.env.GATSBY_API_URL+"participants/"+props.part_id+"/recordings", {total_time: 0})
      .then((response) => {props.refresh()})
      .catch((error) => {console.log(error)})
  }

  return (
    <>
      <form onSubmit={createRecording}>
        <Button variant="contained" color={"primary"} type="submit">Add recording</Button>
      </form>
    </>
  )
}

export default AddRecording