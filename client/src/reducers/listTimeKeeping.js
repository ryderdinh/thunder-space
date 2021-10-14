const initState = {
  _list: [],
  _count: 0,
  _status: false,
};
let changeTimeToFloat = (value1, value2) => {
  value1 =
    Number(value1.slice(0, 2)) +
    Number(value1.slice(3, 5)) / 60 +
    Number(value1.slice(6, 8)) / 3600;
  value2 =
    Number(value2.slice(0, 2)) +
    Number(value2.slice(3, 5)) / 60 +
    Number(value2.slice(6, 8)) / 3600;
  let value = (value2 - value1).toFixed(1);
  return value;
};
export default function listTimeKeeping(state = initState, action) {
  switch (action.type) {
    case "SET_DATA_TIME_KEEPING":
      return {
        ...state,
        _list: action.payload,
      };
    case "SET_TIME_KEEPING":
      let now = new Date().toLocaleTimeString(),
        current,
        period;
      if (action.payload.length === 0) return { ...state };
      else {
        current = action.payload[action.payload.length - 1][0];
        period = changeTimeToFloat(current, now);
        return {
          ...state,
          _count: period,
          _status: true,
        };
      }

    default:
      return state;
  }
}
