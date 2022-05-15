export const formatResponse = (res) => {
  return JSON.stringify(res, null, 2)
}
import decimalAdjust from './decimalAdjust'

export { formatResponse, decimalAdjust }
