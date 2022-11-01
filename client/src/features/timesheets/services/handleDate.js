export const handleMonths = (numOfMonths, date = new Date()) => {
  date.setMonth(date.getMonth() + numOfMonths)

  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
}
