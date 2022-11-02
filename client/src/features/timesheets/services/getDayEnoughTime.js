import { getCheckinHour } from 'features/checkin/services/getCheckinHour'

export const getDayEnoughTime = (list, maxHour = 8) => {
  let result = []
  for (let key in list) {
    let day = list[key]
    if (getCheckinHour(day) >= maxHour) result.push(Number(key))
  }

  return result
}
