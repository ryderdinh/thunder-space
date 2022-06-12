import axiosClient from './http-common';

const eventApi = {
	get: () => {
		const url = '/events';
		return axiosClient.get(url);
	}
};

export default eventApi;
	