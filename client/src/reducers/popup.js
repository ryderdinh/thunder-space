let initState = {
  isShow: false,
  typePopup: "",
  dataPopup: "",
};

export default function popup(state = initState, action) {
  switch (action.type) {
    case "SET_POPUP":
      return {
        ...state,
        isShow: action.payload.isShow,
        typePopup: action.payload.typePopup,
        dataPopup: action.payload.dataPopup,
      };
    case "CLOSE_POPUP": {
      return {
        ...state,
        isShow: false,
      };
    }

    default:
      return { ...state };
  }
}
