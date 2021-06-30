let initState = {
  isShow: false,
  typePopup: "",
  dataPopup: "",
  blur: false,
};

export default function popup(state = initState, action) {
  switch (action.type) {
    case "SET_POPUP":
      return {
        ...state,
        isShow: action.payload.isShow,
        typePopup: action.payload.typePopup,
        dataPopup: action.payload.dataPopup,
        blur: true,
      };
    case "CLOSE_POPUP": {
      return {
        ...state,
        isShow: false,
        blur: false,
      };
    }

    default:
      return { ...state };
  }
}
