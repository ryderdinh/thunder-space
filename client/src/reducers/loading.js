const initState = 0;

export default function loading(state = initState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return (state = Number(action.payload) * 10);
    case "FINISH_LOADING":
      return (state = 0);
    default:
      return state;
  }
}
