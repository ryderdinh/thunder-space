export const getHistoryFromDate = (data, { year, month, day }) => ({
  month: (data[year] || {})[month] || {},
  day: ((data[year] || {})[month] || {})[day] || []
})
