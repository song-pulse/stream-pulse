import React from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { Link } from "gatsby"
import SettingsIcon from '@material-ui/icons/Settings';

function Layout(props) {
  return (
    <Box style={{margin:"auto", width:"80%"}}>
      <Box style={{display: "flex", justifyContent: "space-between"}}>
        <Link to={"/"} style={{ textDecoration: "none", color: "#000000", }}><Typography variant="h1">Stream-Pulse</Typography></Link>
        <Link to="/settings"><SettingsIcon/></Link>
      </Box>
      <Typography variant="h4"><u>{props.subtitle}</u></Typography>
      <br/>
      {props.children}
    </Box>
  );
}

export default Layout;