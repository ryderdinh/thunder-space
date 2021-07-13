let initState = {
  name_container: "Trang chủ",
};

export default function nameContainer(state = initState, action) {
  switch (action.type) {
    case "GET_NAME_CONTAINER":
      return { ...state };
    case "CHANGE_NAME_CONTAINER":
      state.name_container = action.payload;
      return { ...state };
    default:
      return state;
  }
}
