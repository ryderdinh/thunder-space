import axiosClient from './http-common';

const userApi = {
	getInfomation: () => {
		const url = '/users';
		return axiosClient.get(url);
	},
	updatePassword: data => {
		const url = '/users/update-password';
		return axiosClient.put(url, data);
	},
	updateAvatar: data => {
		const url = '/users/update-avatar';
		return axiosClient.put(url, data, {
			header: { 'content-type': 'multipart/form-data' }
		});
	},
	getAllUsers: () => {
		const url = '/users/to-create-project'
		return axiosClient.get(url);
	}
};

export default userApi;
