const initState = {
  _checkLogin: false,
};

export default function checkLogin(state = initState, action) {
  switch (action.type) {
    case "SET_CHECK_ID": {
      return { ...state, _checkLogin: action.payload };
    }
    default:
      return { ...state };
  }
}
