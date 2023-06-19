const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, prettyPrint } = format

const myFormat = printf(({ level, message, timestamp }) => {
  return `${new Date(timestamp).toLocaleString()} ${level}: ${message}`
})

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), timestamp(), myFormat)
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(format.colorize(), timestamp(), myFormat)
    })
  ]
})

module.exports = logger
