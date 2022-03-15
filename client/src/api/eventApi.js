import axiosClient from './http-common';

const eventApi = {
	get: () => {
		const url = '/event';
		return axiosClient.get(url);
	}
};

export default eventApi;
