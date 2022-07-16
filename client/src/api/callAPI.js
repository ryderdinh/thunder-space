import axios from 'axios';
import toast from 'react-hot-toast';

//BASE URL
const API_URL = 'https://hrmadmin.herokuapp.com/api';

export default async function callAPI(endpoint, method, body, header) {
	if (header === null)
		try {
			const res = await axios({
				method,
				url: `${API_URL}/${endpoint}`,
				data: body
			});
			return res.data;
		} catch (err) {
			toast.error('Lỗi');
		}
	else
		try {
			const res_1 = await axios({
				method,
				url: `${API_URL}/${endpoint}`,
				data: body,
				headers: {
					'Content-Type': 'application/json',
					authorization: header.authorization
				}
			});
			return res_1.data;
		} catch (err_1) {
			toast.error('Lỗi');
		}
}
