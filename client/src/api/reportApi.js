import axiosClient from './http-common';

const reportApi = {
	get: () => {
		const url = `/report`;
		return axiosClient.get(url);
	},
	create: data => {
		const url = '/report';
		return axiosClient.post(url, data);
	}
};

export default reportApi;
