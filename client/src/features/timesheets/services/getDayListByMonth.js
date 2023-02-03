export const getDayListByMonth = (month, year) => {
  let dayInMonth = 0
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12: {
      dayInMonth = 31
      break
    }
    case 2: {
      if (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
      )
        dayInMonth = 29
      else dayInMonth = 28
      break
    }
    default: {
      dayInMonth = 30
      break
    }
  }

  const positionDayStart = new Date(2022, month - 1, 1).getDay()
  const createArrDay = []
  for (let i = 2 - positionDayStart; i <= dayInMonth; i++) {
    createArrDay.push(i)
  }

  return createArrDay
}
