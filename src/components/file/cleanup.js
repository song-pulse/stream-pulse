
const cleanupSingleColumn = async (data, file_id, timeWindow, createValue) => {
  let timestamp = parseInt(data[0])
  let frequency = parseInt(data[1])
  let stepWindow = timeWindow * frequency

  let sum = 0
  for (let win = 2; win < data.length - stepWindow; win = win + stepWindow) {
    for (let winStart = win; winStart < win + stepWindow; winStart++) {
      sum = sum + parseFloat(data[winStart])
    }
    timestamp = timestamp + timeWindow
    let avg = sum / stepWindow
    let res = await createValue(timestamp, avg, 0.0, 0.0, file_id)
    console.log(res + " " + avg)
    sum = 0
  }
  return true; // TODO: handle errors
}

const cleanupTwoColumn = async (data, file_id, createValue) => {
  console.log(data)
}

const cleanupThreeColumn = async (data, file_id, createValue) => {
  console.log(data)
  return true; // TODO: handle errors
}

export const cleanupValues = async (data, file_id, timeWindow, createValue) => {
  if (data[0].length === 1) {
    return await cleanupSingleColumn(data, file_id, timeWindow, createValue)
  } else if (data[0].length === 2) {
    return await cleanupTwoColumn(data, file_id, createValue)
  } else if (data[0].length === 3) {
    return await cleanupThreeColumn(data, file_id, createValue)
  } else {
    console.log("unknown file")
  }
}