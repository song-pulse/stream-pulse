import React, { useEffect, useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import axios from "axios"

const ModifyFile = (props) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState();
  let originalName = props.name

  useEffect(() => {
    setName(props.name);
  }, [props.name]);

  const modifyFile = (event) => {
    event.preventDefault()
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      if (!originalName) {
        axios({
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
          url: process.env.GATSBY_API_URL+"participants/"+props.part_id+"/recordings/"+props.rec_id+"/sensors/"+props.sensor_id})
          .then((response) => {console.log(response); props.refresh()})
          .catch((error) => {console.log(error)})
      }
    }
  }

  return (
    <form onSubmit={modifyFile}>
      <TextField required label="Old File" variant="outlined" size={"small"} value={name} style={{marginRight:"10px"}} disabled/>
      <input type="file" name="file" accept={".csv"} onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0])
        }
      }} />
      <Button variant="contained" color={"primary"} type="submit" style={{marginLeft:"10px"}} disabled={!file}>Upload</Button>
    </form>
  )
}

export default ModifyFile