import React from "react"
import Button from "@material-ui/core/Button"
import axios from "axios"

const DeleteButton = (props) => {

  const deleteSensor = () => {
    axios.delete(process.env.GATSBY_API_URL + "sensors/" + props.sensor_id)
      .then(r => props.refresh())
      .catch((error) => console.log(error))
  }

  return <Button onClick={deleteSensor} variant="contained" color={"secondary"}
                 style={{ marginLeft: "10px" }}>Delete</Button>
}

export default DeleteButton
