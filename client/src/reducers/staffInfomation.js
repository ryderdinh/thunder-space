const initState = {
  _staffInfomation: [],
};
export default function staffInfomation(state = initState, action) {
  switch (action.type) {
    case "SET_STAFF_INFOMATION": {
      let array = action.payload;

      return {
        ...state,
        _staffInfomation: array,
      };
    }
    default:
      return { ...state };
  }
}
