export const getHistoryFromDate = (data, { year, month, day }) => {
  return ((data[year] || {})[month] || {})[day] || []
}
