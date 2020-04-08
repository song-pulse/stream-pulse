import React, {useState, useEffect} from "react"
import Participant from "./participant"
import axios from "axios"

function Overview() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(process.env.GATSBY_API_URL+"participants")
        .then(function(response) {
          setRes(response.data);
        })
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [])

  console.log(res);
  return res ? (<>
    {res.map(part => <Participant key={part.id} data={part}/>)}
    </>) : "" //TODO add loading animation
}

export default Overview