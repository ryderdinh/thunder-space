const initState = {
  _events: [],
};

export default function events(state = initState, action) {
  switch (action.type) {
    case "SET_EVENTS":
      console.log(action.payload.event);
      return { ...state, _events: action.payload.event };
    default:
      return { ...state };
  }
}
