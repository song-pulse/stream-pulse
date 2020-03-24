import React from "react"

const Upload = () => (
    <>
      <form method="post" action={process.env.GATSBY_API_URL+"simulations"}>
        <label htmlFor={"id"}>Participant: </label>
        <input type="text" id="id" name="id"/>
        <label htmlFor={"file"}> Data: </label>
        <input type="file" id="file" name="file"/>
        <input type="submit" value="Submit"/>
      </form>
    </>
)

export default Upload