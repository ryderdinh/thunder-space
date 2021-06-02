const initState = {
  _noti: "",
  _typeNoti: "loading",
};

export default function toastNotification(state = initState, action) {
  switch (action.type) {
    case "SUCCESS": {
      return { ...state, _noti: action.payload, _typeNoti: "success" };
    }
    case "ERROR": {
      return { ...state, _noti: action.payload, _typeNoti: "error" };
    }
    case "LOADING": {
      return { ...state, _noti: action.payload, _typeNoti: "loading" };
    }
  }
}
