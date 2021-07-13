import Cookies from "js-cookie";

const getAllCookie = () => ({
  id: Cookies.get("id-zeliossea"),
  token: Cookies.get("token-zeliossea"),
});

const setCookie = (id, token, username, password) => {
  if (id != null) Cookies.set("id-zeliossea", id);
  if (token != null) Cookies.set("token-zeliossea", token);
};
const removeCookie = (id, token, username, password) => {
  if (id === true) Cookies.remove("id-zeliossea");
  if (token === true) Cookies.remove("token-zeliossea");
};

export { setCookie, getAllCookie, removeCookie };
