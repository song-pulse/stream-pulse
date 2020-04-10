import React, {useState, useEffect} from "react"
import Participant from "../participant/participant"
import axios from "axios"
import AddParticipant from "../participant/addParticipant"

function Overview() {
  const [res, setRes] = useState([]);

  const load = () => {
    axios.get(process.env.GATSBY_API_URL+"participants")
      .then(function(response) {
        setRes(response.data);
      })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      load();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [])

  console.log(res);
  return res ? (
    <>
      <AddParticipant refresh={load}/>
      <br/>
      {res.map(part => <Participant key={part.id} data={part}/>)}
    </>) : "" //TODO add loading animation
}

export default Overview