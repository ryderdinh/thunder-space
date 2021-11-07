//* IMPORT =============================================
import callAPI from '../api/callAPI';
import { getAllCookie, setCookie } from '../units/cookieWeb';
import toast from 'react-hot-toast';
import axios from 'axios';

//? CALL API============================================
export const actSignIn = dataUser => {
	loadingToast('Đang đăng nhập');
	return async dispatch => {
		const res = await callAPI('token', 'POST', dataUser, null);
		if (res) {
			const res_1 = await callAPI('login', 'GET', null, {
				authorization: `Bearer ${res?.accessToken}`
			});
			removeToast();
			if (res_1) {
				//? check login success
				if (res_1?.data?.status === 'Login succesfully') {
					successToast('Đăng nhập thành công');
					Promise.all([
						setCookie(res_1.data?.id, res.accessToken),
						await dispatch(actFetchStaffInfomation()),
						await dispatch(actFetchEvents()),
						await dispatch(actFetchDataTableOfWork()),
						await dispatch(actFetchTimeKeeping())
					]).then(() => {
						dispatch(setCheckLogin(true));
					});
				} else {
					errorToast(
						'Đăng nhập thất bại, kiểm tra lại tên đăng nhập hoặc mật khẩu của bạn'
					);
				}
			} else {
				errorToast(
					'Đăng nhập thất bại, kiểm tra lại tên đăng nhập hoặc mật khẩu của bạn'
				);
			}
		} else {
			errorToast(
				'Đăng nhập thất bại, kiểm tra lại tên đăng nhập hoặc mật khẩu của bạn'
			);
		}
	};
};

export const actFetchStaffInfomation = () => {
	const { id, token } = getAllCookie();
	return async dispatch => {
		const res = await callAPI(`users/${id}`, 'GET', null, {
			authorization: `Bearer ${token}`
		});
		res && dispatch(setStaffInfomation(res.staffInfo));
	};
};

export const actFetchDataTableOfWork = () => {
	const { id, token } = getAllCookie();
	return async dispatch => {
		const res = await callAPI(`table/${id}`, 'GET', null, {
			authorization: `Bearer ${token}`
		});
		res && dispatch(getDataTimesheets(res.data));
	};
};

export const actFetchTimeKeeping = () => {
	const { id, token } = getAllCookie();
	return async dispatch => {
		await dispatch(setLoadingTimeKeeping());
		const res = await callAPI(`timeline/${id}`, 'GET', null, {
			authorization: `Bearer ${token}`
		});
		if (res?.data) {
			await dispatch(setDataTimeKeeping(res.data));
			await dispatch(setTimeKeeping(res.data));
		}
	};
};

export const actSendLocationToServer = location => {
	loadingToast('Đang chấm công');
	const { id, token } = getAllCookie();
	return async dispatch => {
		const res = await callAPI(
			`location/${id}?lat=${location[0]}&lon=${location[1]}`,
			'PUT',
			null,
			{
				authorization: `Bearer ${token}`
			}
		);
		if (res) {
			dispatch(actFetchTimeKeeping());
		} else {
			removeToast();
			errorToast('Chấm công thất bại');
		}
		console.log(res);
		if (res?.status) {
			removeToast();
			switch (res.status) {
				case 'check in complete': {
					successToast('Chấm công thành công');
					break;
				}
				case 'try after 5 minutes': {
					errorToast('Bạn vừa chấm công, thử lại sau');
					break;
				}
				case 'you are far from company': {
					errorToast('Khoảng cách chấm công quá xa');
					break;
				}
				default:
					break;
			}
		}
	};
};

export const actFetchEvents = () => {
	const { token } = getAllCookie();
	return async dispatch => {
		const res = await callAPI(`event`, 'GET', null, {
			authorization: `Bearer ${token}`
		});
		res && dispatch(setEvents(res));
	};
};

export const actSendReport = data => {
	const { id, token } = getAllCookie();
	loadingToast('Đang gửi yêu cầu');
	return async () => {
		const res = await callAPI(`user/storeReport/${id}`, 'POST', data, {
			authorization: `Bearer ${token}`
		});

		if (!res) {
			removeToast();
			errorToast('Gửi thất bại, vui lòng thử lại sau!');
		}
		switch (res?.data?.status) {
			case 'Report complete': {
				successToast('Gửi thành công');
				break;
			}
			case 'Canot report': {
				errorToast('Gửi thất bại, vui lòng thử lại sau!');
				break;
			}
			default:
				break;
		}
	};
};

export const actRefreshPage = () => {
	loadingToast('Đang đăng nhập lại');
	const { id, token } = getAllCookie();
	if (!id || !token)
		return dispatch => {
			dispatch(setCheckLogin(false));
			removeToast();
			errorToast('Bạn cần đăng nhập lại');
		};
	return async dispatch => {
		const res_1 = await callAPI('login', 'GET', null, {
			authorization: `Bearer ${token}`
		});
		if (res_1) {
			if (res_1?.data?.status === 'Login succesfully') {
				Promise.all([
					await dispatch(actFetchStaffInfomation()),
					await dispatch(actFetchDataTableOfWork()),
					await dispatch(actFetchTimeKeeping()),
					await dispatch(actFetchEvents())
				])
					.then(() => {
						setCookie(res_1.data?.id, token);
					})
					.then(() => {
						removeToast();
						successToast('Chào mừng quay trở lại');
						dispatch(setCheckLogin(true));
					});
			} else {
				removeToast();
				errorToast('Bạn cần đăng nhập lại');
			}
		} else {
			removeToast();
			errorToast('Bạn cần đăng nhập lại');
		}
	};
};

export const actChangePassword = data => {
	loadingToast('Đang xử lí yêu cầu...');
	const { id, token } = getAllCookie();
	return async () => {
		const res = await callAPI(`change-password/${id}`, 'PUT', data, {
			authorization: `Bearer ${token}`
		});
		removeToast();

		if (res) {
			switch (res?.data?.status) {
				case 'Change password successfully': {
					successToast('Đổi mật khẩu thành công');
					break;
				}
				case 'New password is invalid': {
					errorToast('Mật khẩu mới phải trên 5 kí tự');
					break;
				}
				case 'Wrong old password': {
					errorToast('Mật khẩu cũ không đúng');
					break;
				}
				case 'New password is same your current password': {
					errorToast('Mật khẩu mới không được trùng với mật khẩu cũ');
					break;
				}
				default:
					break;
			}
		}
	};
};

export const actCreateProject = data => {
	loadingToast('Đang xử lí yêu cầu...');
	const { id, token } = getAllCookie();
	return async dispatch => {
		try {
			const res = await axios({
				method: 'POST',
				url: `https://hrmadmin.herokuapp.com/api/createProject/${id}`,
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`
				},
				data
			});
			removeToast();
			if (res?.data?.data) {
				successToast('Tạo dự án thành công');
				dispatch(closePopup());
			} else {
				errorToast('Tạo dự án thất bại');
				throw new Error('Failed');
			}
		} catch (error) {
			removeToast();
			errorToast('Tạo dự án thất bại');
		}
	};
};

export const actFetchProject = data => {
	// loadingToast("Đang lấy dữ liệu...");
	const { id, token } = getAllCookie();
	let _param = '';
	if (data) {
		for (const item of data) {
			_param = `projectCode=${item}`;
		}
		_param = '?' + _param;
	}
	return async dispatch => {
		try {
			const res = await axios({
				method: 'GET',
				url: `https://hrmadmin.herokuapp.com/api/projectInfo/${id}${_param}`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			});
			// removeToast();
			let dataResult = res.data;
			if (dataResult?.status) {
				errorToast(`${dataResult.status}`);
			} else {
				dispatch(setDataProject(dataResult));
				if (data === undefined) {
					dispatch(
						setWorkflow({
							workflowName: 'Tất cả',
							workflowType: 'project',
							workflowId: ''
						})
					);
				} else {
					dispatch(
						setWorkflow({
							workflowName: dataResult[0].projectName,
							workflowType: 'project',
							workflowId: dataResult[0].projectCode
						})
					);
				}
			}
		} catch (error) {
			errorToast(`Lỗi không xác định`);
		}
	};
};

export const actCreateIssue = (wid, data) => {
	loadingToast('Đang xử lí yêu cầu...');
	const { id, token } = getAllCookie();
	return async dispatch => {
		try {
			const res = await axios({
				method: 'POST',
				url: `https://hrmadmin.herokuapp.com/api/createIssue/${id}/${wid}`,
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`
				},
				data
			});
			removeToast();
			if (res?.data?.data) {
				successToast('Tạo issue thành công');
				dispatch(closePopup());
			} else errorToast('Tạo issue thất bại');
		} catch (error) {
			errorToast('Tạo issue thất bại');
		}
	};
};

//? TOAST
const errorToast = toast.error;
const successToast = toast.success;
const loadingToast = content => {
	toast.loading(content);
};
const removeToast = () => toast.remove(loadingToast());

//TODO: TYPE AND PAYLOAD OF ACTION ================================
export const fetchMenus = () => ({
	type: 'FETCH_MENUS'
});
export const setActiveSideBar = payload => ({
	type: 'SET_ACTIVE_SIDEBAR',
	payload
});
export const getNameContainer = () => ({
	type: 'GET_NAME_CONTAINER'
});
export const changeNameContainer = payload => ({
	type: 'CHANGE_NAME_CONTAINER',
	payload
});
export const getLocation = () => dispatch => {
	dispatch({
		type: 'TIME_KEEPING'
	});
};
export const getDataTimesheets = payload => ({
	type: 'GET_DATA_TIMESHEETS',
	payload
});
export const getDataTimesheetsDetail = payload => ({
	type: 'GET_DATA_TIMESHEETS_DETAIL',
	payload
});
export const setLoadingTimeKeeping = () => ({
	type: 'SET_TIME_KEEPING_LOADING'
});
export const setDataTimeKeeping = payload => ({
	type: 'SET_DATA_TIME_KEEPING',
	payload
});
export const setTimeKeeping = payload => ({
	type: 'SET_TIME_KEEPING',
	payload
});
export const setCheckLogin = payload => ({
	type: 'SET_CHECK_ID',
	payload
});
export const setStaffInfomation = payload => ({
	type: 'SET_STAFF_INFOMATION',
	payload
});
export const setEvents = payload => ({
	type: 'SET_EVENTS',
	payload
});
export const setPopup = payload => ({
	type: 'SET_POPUP',
	payload
});
export const closePopup = () => ({
	type: 'CLOSE_POPUP'
});
export const setLoading = payload => ({
	type: 'SET_LOADING',
	payload
});
export const finishLoading = () => ({
	type: 'FINISH_LOADING'
});
export const setDataProject = payload => ({
	type: 'SET_DATA_PROJECT',
	payload
});
export const setInitalProject = () => ({
	type: 'SET_INITAL_PROJECT'
});
export const setDataIssue = payload => ({
	type: 'SET_DATA_ISSUE',
	payload
});
export const setWorkflow = payload => ({
	type: 'SET_WORKFLOW',
	payload
});
