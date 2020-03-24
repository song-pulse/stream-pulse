import React from "react"

const Upload = () => (
    <>
      <form method="post" action={process.env.GATSBY_API_URL+"simulations"}>
        <label htmlFor={"id"}>Participant: </label>
        <input type="text" id="id" name="id"/>
        <label htmlFor={"EDA"}> EDA: </label>
        <input type="file" id="eda" name="eda"/>
        <label htmlFor={"EDA"}> HR: </label>
        <input type="file" id="hr" name="hr"/>
        <label htmlFor={"EDA"}> Gyro: </label>
        <input type="file" id="gyro" name="gyro"/>
        <input type="submit" value="Submit"/>
      </form>
    </>
)

export default Upload