import React, { useState } from 'react'
import Papa from 'papaparse'
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

const FileReader = (props) => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleFileLoad = async () => {
    setLoading(true)
    let fresh_file_id = await props.createFile(file.name)

    Papa.parse(file, {
      chunk: (results, parser) => {
        if (fresh_file_id === 0) {
          console.log("aborted")
          parser.abort();
        } else {
          props.createValues(results.data, fresh_file_id)
        }
      },
      complete: () => {
        props.close();
        setLoading(false)
      },
    })
  }

  return (
    <Box style={{display:"flex"}}>
      <Button variant="contained" component="label" color="primary">
        Choose File
        <input
          type="file"
          style={{ display: "none" }}
          accept={".csv"}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0])
            }
          }}
        />
      </Button>
      <Paper style={{
        flex: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        padding: 7,
        marginLeft: "10px",
        marginRight: "10px",
      }}
      >
        <Typography>{file ? file.name : ""}</Typography>
      </Paper>
      <Button variant="contained" color="primary" disabled={!file || loading} onClick={handleFileLoad}>Upload</Button>
    </Box>
  )
}

export default FileReader