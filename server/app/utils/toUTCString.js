function toUTCString(date){
  date = new Date(date)
  return date.toUTCString()
}

module.exports = { toUTCString }