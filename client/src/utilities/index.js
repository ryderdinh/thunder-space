import capitalizeFirstLetter from './capitalizeFirstLetter'
import decimalAdjust from './decimalAdjust'

const formatResponse = (res) => {
  return JSON.stringify(res, null, 2)
}

export { formatResponse, decimalAdjust, capitalizeFirstLetter }
