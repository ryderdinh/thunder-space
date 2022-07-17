import axiosClient from './http-common';

const timesheetsApi = {
	get: () => {
		const url = '/timesheets';
		return axiosClient.get(url);
	}
};

export default timesheetsApi;
