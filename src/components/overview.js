import React, {useState, useEffect} from "react"
import Entry from "./entry"
import axios from "axios"

function Overview() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(process.env.GATSBY_API_URL+"simulations")
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
    {res.map(sim => <Entry key={sim.id} data={sim}/>)}
    </>) : "" //TODO add loading animation
}

export default Overview