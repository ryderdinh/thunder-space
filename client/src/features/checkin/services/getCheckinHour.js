const getHourBetweenTwoTimes = (value1, value2) => {
  return (Math.abs(value2 - value1) / 36e5).toFixed(1)
}

export const getCheckinHour = (list) => {
  if (!list.length) return 0
  let current = list[list.length - 1]?.time
  let period = getHourBetweenTwoTimes(current, list[0].time)
  return period
}
