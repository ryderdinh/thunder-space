import axiosClient from './http-common';

const authApi = {
	authentication: data => {
		const url = '/token';
		return axiosClient.post(url, data);
	},
	authorization: () => {
		const url = '/login';
		return axiosClient.get(url);
	}
};

export default authApi;
