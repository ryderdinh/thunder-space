//* IMPORT =============================================
import callAPI from "../api/callAPI";
import { getAllCookie, removeCookie, setCookie } from "../units/cookieWeb";
import toast from "react-hot-toast";
//? CALL API============================================
export const actSignIn = (dataUser) => {
  loadingToast("Đang đăng nhập");
  return async (dispatch) => {
    const res = await callAPI("loginToken", "POST", dataUser, null);
    if (res !== undefined) {
      const res_1 = await callAPI("user/login", "GET", null, {
        authorization: `Bearer ${res.accessToken}`,
      });
      removeToast();
      if (res_1 !== undefined) {
        if (res_1.data.status === "Login succesfully") {
          setCookie(res_1.data.id, res.accessToken);
          successToast("Đăng nhập thành công");
          dispatch(actFetchEvents());
          setTimeout(() => {
            dispatch(setCheckLogin(true));
          }, 1500);
        } else {
          errorToast(
            "Đăng nhập thất bại, kiểm tra lại tên đăng nhập hoặc mật khẩu của bạn"
          );
        }
      } else {
        errorToast(
          "Đăng nhập thất bại, kiểm tra lại tên đăng nhập hoặc mật khẩu của bạn"
        );
      }
    } else {
      errorToast(
        "Đăng nhập thất bại, kiểm tra lại tên đăng nhập hoặc mật khẩu của bạn"
      );
    }
  };
};
export const actFetchStaffInfomation = () => {
  const { id, token } = getAllCookie();
  return async (dispatch) => {
    const payload = await callAPI(`userInfo/${id}`, "GET", null, {
      authorization: `Bearer ${token}`,
    });
    dispatch(setStaffInfomation(payload.staffInfo));
  };
};
export const actFetchDataTableOfWork = () => {
  const { id, token } = getAllCookie();
  return async (dispatch) => {
    const res = await callAPI(`table/${id}`, "GET", null, {
      authorization: `Bearer ${token}`,
    });
    if (res !== undefined) dispatch(getDataTableOfWork(res.data));
  };
};
export const actFetchTimeKeeping = () => {
  const { id, token } = getAllCookie();
  return async (dispatch) => {
    const res = await callAPI(`storeTimeline/${id}`, "GET", null, {
      authorization: `Bearer ${token}`,
    });
    if (res !== undefined) {
      dispatch(getDataTimeKeeping(res.data));
      dispatch(setTimeKeeping(res.data));
    }
  };
};
export const actSendLocationToServer = (location) => {
  loadingToast("Đang chấm công");
  const { id, token } = getAllCookie();
  return async (dispatch) => {
    const res = await callAPI(
      `location/${id}`,
      "POST",
      { lat: location[0], lon: location[1] },
      {
        authorization: `Bearer ${token}`,
      }
    );
    if (res !== undefined) {
      dispatch(actFetchTimeKeeping());
    } else {
      removeToast();
      errorToast("Chấm công thất bại");
    }
    if (res.data.status === "Check in complete") {
      removeToast();
      successToast("Chấm công thành công");
    }
    if (res.data.status === "Try after 5 minutes") {
      removeToast();
      errorToast("Bạn vừa chấm công, thử lại sau 5p");
    }
    if (res.data.status === "You are far from company") {
      removeToast();
      errorToast("Khoảng cách chấm công quá xa");
    }
  };
};
export const actFetchEvents = () => {
  const { token } = getAllCookie();
  return async (dispatch) => {
    const res = await callAPI(`event`, "GET", null, {
      authorization: `Bearer ${token}`,
    });
    dispatch(setEvents(res));
  };
};
export const actSendReport = (data) => {
  const { id, token } = getAllCookie();
  loadingToast("Đang gửi yêu cầu của bạn");
  return async () => {
    const res = await callAPI(`user/storeReport/${id}`, "POST", data, {
      authorization: `Bearer ${token}`,
    });

    if (res === undefined) {
      removeToast();
      errorToast("Gửi thất bại");
    }
    if (res.data.status === "Report complete") {
      removeToast();
      successToast("Gửi thành công");
    }
    if (res.data.status === "Canot report") {
      removeToast();
      successToast("Gửi thất bại");
    }
  };
};
export const actRefreshPage = () => {
  loadingToast("Đang đăng nhập lại");

  const { id, token } = getAllCookie();
  if (id === undefined || token === undefined)
    return (dispatch) => {
      dispatch(setCheckLogin(false));
      removeToast();
      errorToast("Bạn cần đăng nhập lại");
    };
  else {
    return async (dispatch) => {
      const res_1 = await callAPI("user/login", "GET", null, {
        authorization: `Bearer ${token}`,
      });
      removeToast();
      if (res_1 !== undefined) {
        if (res_1.data.status === "Login succesfully") {
          dispatch(actFetchEvents());
          dispatch(setCheckLogin(true));
          setCookie(res_1.data.id, token);
          successToast("Chào mừng quay trở lại");
        } else {
          errorToast("Bạn cần đăng nhập lại");
        }
      } else {
        errorToast("Bạn cần đăng nhập lại");
      }
    };
  }
};
export const actChangePassword = (data) => {
  loadingToast("Đang xử lí yêu cầu");
  const { id, token } = getAllCookie();
  return async () => {
    const res = await callAPI(`user/changePassword/${id}`, "POST", data, {
      authorization: `Bearer ${token}`,
    });
    removeToast();
    if (res.data.status === "New password is invalid") {
      errorToast("Mật khẩu mới phải trên 5 kí tự");
    }
    if (res.data.status === "Change password successfully") {
      successToast("Đổi mật khẩu thành công");
      window.location.href = "https://zelios-sea.netlify.app/";
      removeCookie(true, true);
    }
    if (res.data.status === "Current password is incorrectly") {
      errorToast("Mật khẩu cũ chưa chính xác");
    }
    if (res.data.status === "New password is same your current password") {
      errorToast("Mật khẩu mới phải khác mật khẩu cũ");
    }
  };
};
//? TOAST
const errorToast = toast.error;
const successToast = toast.success;
const loadingToast = (content) => {
  toast.loading(content);
};
const removeToast = () => toast.remove(loadingToast());
//TODO: TYPE AND PAYLOAD OF ACTION ================================
export const fetchMenus = () => ({
  type: "FETCH_MENUS",
});
export const setActiveSideBar = (payload) => ({
  type: "SET_ACTIVE_SIDEBAR",
  payload,
});
export const getNameContainer = () => ({
  type: "GET_NAME_CONTAINER",
});
export const changeNameContainer = (payload) => ({
  type: "CHANGE_NAME_CONTAINER",
  payload,
});
export const getLocation = () => (dispatch) => {
  dispatch({
    type: "TIME_KEEPING",
  });
};
export const getDataTableOfWork = (payload) => ({
  type: "GET_DATA_TABLE_OF_WORK",
  payload,
});
export const getDataTimeKeeping = (payload) => ({
  type: "SET_DATA_TIME_KEEPING",
  payload,
});
export const setTimeKeeping = (payload) => ({
  type: "SET_TIME_KEEPING",
  payload,
});
export const setCheckLogin = (payload) => ({
  type: "SET_CHECK_ID",
  payload,
});
export const setStaffInfomation = (payload) => ({
  type: "SET_STAFF_INFOMATION",
  payload,
});
export const setEvents = (payload) => ({
  type: "SET_EVENTS",
  payload,
});
export const setPopup = (payload) => ({
  type: "SET_POPUP",
  payload,
});
export const closePopup = () => ({
  type: "CLOSE_POPUP",
});
