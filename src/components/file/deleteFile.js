import React from "react"
import Button from "@material-ui/core/Button"
import axios from "axios"

const DeleteButton = (props) => {

  const deleteFile = () => {
    axios.delete(process.env.GATSBY_API_URL + "participants/" + props.part_id + "/recordings/" + props.rec_id + "/files/" + props.file_id)
      .then(r => props.refresh)
      .catch((error) => console.log(error))
  }

  return <Button onClick={deleteFile} variant="contained" color={"secondary"} style={{ marginLeft: "10px" }}
                 disabled={props.file_id <= 0}>Delete File</Button>
}

export default DeleteButton
