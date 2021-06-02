import axios from "axios";
import toast from "react-hot-toast";
//mock API
let API_URL = "https://hrmapplication.herokuapp.com";
export default async function callAPI(endpoint, method, body, header) {
  if (header === null)
    try {
      const res = await axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data: JSON.stringify(body),
      });
      return res.data;
    } catch (err) {
      toast.error("Lỗi");
    }
  else
    try {
      const res_1 = await axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data: JSON.stringify(body),
        headers: header,
      });
      return res_1.data;
    } catch (err_1) {
      toast.error("Lỗi");
    }
}
