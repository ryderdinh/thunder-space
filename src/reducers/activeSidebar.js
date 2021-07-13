const initState = {
  _activeIndex: 0,
  _activeArray: ["list active", "list", "list", "list"],
};

export default function setActiveSidebar(state = initState, action) {
  switch (action.type) {
    case "SET_ACTIVE_SIDEBAR":
      return { ...state, _activeIndex: action.payload };
    case "SET_ACTIVE_SIDEBAR_MOBILE":
      let newActiveArray;
      for (let i = 0; i < 4; i++) {
        if (i !== Number(action.payload)) newActiveArray.push("list");
        else newActiveArray.push("list active");
      }
      return { ...state, _activeArray: newActiveArray };
    default:
      return state;
  }
}
