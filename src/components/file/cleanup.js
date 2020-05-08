
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
  console.log('2 COL DATA')
  console.log(data)
  // TODO Anja: IBI would be two cols
}

const cleanupThreeColumn = async (data, file_id, timeWindow, createValue) => {
  console.log('3 COL DATA')
  let frequency = parseInt(data[1][0]) // 32
  let timestamp = parseInt(data[0][1])
  let stepWindow = timeWindow * frequency // should be 180*32= 5760
  console.log('STEPWINDOW', stepWindow)
  console.log('DATALENGHT', data.length) // 884661
  let sumX=0
  let sumY=0
  let sumZ=0

  for (let win = 2; win < data.length - stepWindow; win = win + stepWindow) {
    for (let winStart = win; winStart < win + stepWindow; winStart++) {
      let valueX = parseFloat(data[winStart][0])
      let valueY = parseFloat(data[winStart][1])
      let valueZ = parseFloat(data[winStart][2])
      sumX += valueX
      sumY += valueY
      sumZ += valueZ
    }
    timestamp = timestamp + timeWindow
    let avgX = sumX / stepWindow
    let avgY = sumY / stepWindow
    let avgZ = sumZ / stepWindow
    // TODO: avg[win] is the summed value with all three values v1,v2,v3 in one 
    // if we want everyone for his own we do not have to do the buff and sum thing
    let res = await createValue(timestamp, avgX, avgY, avgZ, file_id)
    console.log('res   avgX   avgY   avgZ',res + " " + avgX + " "+ avgY + " " + avgZ)
    sumX = 0
    sumY = 0
    sumZ = 0
  }
  return true; // TODO: handle errors
}


const cleanupThreeColumnAvg = async (data, file_id, timeWindow, createValue) => {
  /**
   * TODO: this method is not used yet, as the avg gets computed in the preprocessingstep
   * timestamp=data[0]: [1585038955,1585038955, 1585038955], frequency=data[1]: [32,32,32], acc=data[2]: [33,-3,54]
   * https://support.empatica.com/hc/en-us/articles/202028739-How-is-the-acceleration-data-formatted-in-E4-connect-
   * sum+= max3(abs(buffX[i] - prevX), abs(buffY[i] - prevY), abs(buffZ[i] - prevZ))
   * avg=avg*0.9+(sum/32)*0.1
   */
  console.log('3 COL DATA')
  let frequency = parseInt(data[1][0]) // 32
  let timestamp = parseInt(data[0][1])
  let stepWindow = timeWindow * frequency // should be 180*32= 5760
  console.log('STEPWINDOW', stepWindow)
  console.log('DATALENGHT', data.length) // 884661

  let prevX=0
  let prevY=0
  let prevZ=0
  let avg= []
  let sum=0

  for (let win = 2; win < data.length - stepWindow; win = win + stepWindow) {
    for (let winStart = win; winStart < win + stepWindow; winStart++) {
      let buffX = data[winStart][0]
      let buffY = data[winStart][1]
      let buffZ = data[winStart][2]
      sum += Math.max(Math.abs(buffX-prevX), Math.abs(buffY-prevY), Math.abs(buffZ-prevZ))
      prevX=buffX
      prevY=buffY
      prevZ=buffZ
    }
    timestamp = timestamp + timeWindow
    let avgpos = win===2? 0 : ((win-2)/stepWindow) // win=2 --> avgpos=0, win=stepwindow+2 --> avgpos=1 etc.
    // console.log('avgposition', avgpos)
    let avgValue = (sum/frequency)*0.9+(sum/frequency)*0.1
    // console.log('avgVAlue', avgValue)
    avg.push(avgValue/stepWindow)
    // console.log('AVG[win]', avg[avgpos])
    // TODO: avg[win] is the summed value with all three values v1,v2,v3 in one 
    // if we want everyone for his own we do not have to do the buff and sum thing
    let res = await createValue(timestamp, avg[avgpos], 0.0, 0.0, file_id)
    console.log('res   avg',res + " " + avg)
    sum = 0
  }
  return true; // TODO: handle errors
}

export const cleanupValues = async (data, file_id, timeWindow, createValue) => {
  if (data[0].length === 1) {
    return await cleanupSingleColumn(data, file_id, timeWindow, createValue)
  } else if (data[0].length === 2) {
    return await cleanupTwoColumn(data, file_id, timeWindow, createValue)
  } else if (data[0].length === 3) {
    return await cleanupThreeColumn(data, file_id, timeWindow, createValue)
  } else {
    console.log("unknown file")
  }
}