//* IMPORT =============================================
import callAPI from '../api/callAPI';
import { getAllCookie, removeCookie, setCookie } from '../units/cookieWeb';
import toast from 'react-hot-toast';
import axios from 'axios';

//? CALL API============================================
export const actSignIn = dataUser => {
	loadingToast('Đang đăng nhập');
	return async dispatch => {
		const res = await callAPI('loginToken', 'POST', dataUser, null);
		if (res !== undefined) {
			const res_1 = await callAPI('user/login', 'GET', null, {
				authorization: `Bearer ${res.accessToken}`
			});
			removeToast();
			if (res_1 !== undefined) {
				if (res_1.data.status === 'Login succesfully') {
					setCookie(res_1.data.id, res.accessToken);
					dispatch(actFetchEvents());
					dispatch(actFetchStaffInfomation());
					dispatch(actFetchDataTableOfWork());
					dispatch(actFetchTimeKeeping());
					successToast('Đăng nhập thành công');

					setTimeout(() => {
						dispatch(setCheckLogin(true));
					}, 1500);
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
		const payload = await callAPI(`userInfo/${id}`, 'GET', null, {
			authorization: `Bearer ${token}`
		});
		dispatch(setStaffInfomation(payload.staffInfo));
	};
};
export const actFetchDataTableOfWork = () => {
	const { id, token } = getAllCookie();
	return async dispatch => {
		const res = await callAPI(`table/${id}`, 'GET', null, {
			authorization: `Bearer ${token}`
		});
		if (res !== undefined) dispatch(getDataTimesheets(res.data));
	};
};
export const actFetchTimeKeeping = () => {
	const { id, token } = getAllCookie();
	return async dispatch => {
		const res = await callAPI(`storeTimeline/${id}`, 'GET', null, {
			authorization: `Bearer ${token}`
		});
		if (res !== undefined) {
			dispatch(getDataTimeKeeping(res.data));
			dispatch(setTimeKeeping(res.data));
		}
	};
};
export const actSendLocationToServer = location => {
	loadingToast('Đang chấm công');
	const { id, token } = getAllCookie();
	return async dispatch => {
		const res = await callAPI(
			`location/${id}`,
			'POST',
			{ lat: location[0], lon: location[1] },
			{
				authorization: `Bearer ${token}`
			}
		);
		if (res !== undefined) {
			dispatch(actFetchTimeKeeping());
		} else {
			removeToast();
			errorToast('Chấm công thất bại');
		}
		if (res.data.status === 'Check in complete') {
			removeToast();
			successToast('Chấm công thành công');
		}
		if (res.data.status === 'Try after 5 minutes') {
			removeToast();
			errorToast('Bạn vừa chấm công, thử lại sau 5p');
		}
		if (res.data.status === 'You are far from company') {
			removeToast();
			errorToast('Khoảng cách chấm công quá xa');
		}
	};
};
export const actFetchEvents = () => {
	const { token } = getAllCookie();
	return async dispatch => {
		const res = await callAPI(`event`, 'GET', null, {
			authorization: `Bearer ${token}`
		});
		dispatch(setEvents(res));
	};
};
export const actSendReport = data => {
	const { id, token } = getAllCookie();
	loadingToast('Đang gửi yêu cầu của bạn');
	return async () => {
		const res = await callAPI(`user/storeReport/${id}`, 'POST', data, {
			authorization: `Bearer ${token}`
		});

		if (res === undefined) {
			removeToast();
			errorToast('Gửi thất bại');
		}
		if (res.data.status === 'Report complete') {
			removeToast();
			successToast('Gửi thành công');
		}
		if (res.data.status === 'Canot report') {
			removeToast();
			successToast('Gửi thất bại');
		}
	};
};
export const actRefreshPage = () => {
	loadingToast('Đang đăng nhập lại');
	const { id, token } = getAllCookie();
	if (id === undefined || token === undefined)
		return dispatch => {
			dispatch(setCheckLogin(false));
			removeToast();
			errorToast('Bạn cần đăng nhập lại');
		};
	else {
		return async dispatch => {
			const res_1 = await callAPI('user/login', 'GET', null, {
				authorization: `Bearer ${token}`
			});
			removeToast();
			if (res_1 !== undefined) {
				if (res_1.data.status === 'Login succesfully') {
					dispatch(actFetchEvents());
					dispatch(actFetchStaffInfomation());
					dispatch(actFetchDataTableOfWork());
					dispatch(actFetchTimeKeeping());
					dispatch(setCheckLogin(true));
					setCookie(res_1.data.id, token);
					successToast('Chào mừng quay trở lại');
				} else {
					errorToast('Bạn cần đăng nhập lại');
				}
			} else {
				errorToast('Bạn cần đăng nhập lại');
			}
		};
	}
};
export const actChangePassword = data => {
	loadingToast('Đang xử lí yêu cầu...');
	const { id, token } = getAllCookie();
	return async () => {
		const res = await callAPI(`user/changePassword/${id}`, 'POST', data, {
			authorization: `Bearer ${token}`
		});
		removeToast();
		if (res.data.status === 'New password is invalid') {
			errorToast('Mật khẩu mới phải trên 5 kí tự');
		}
		if (res.data.status === 'Change password successfully') {
			successToast('Đổi mật khẩu thành công');
			window.location.href = 'https://zelios-sea.netlify.app/';
			removeCookie(true, true);
		}
		if (res.data.status === 'Current password is incorrectly') {
			errorToast('Mật khẩu cũ chưa chính xác');
		}
		if (res.data.status === 'New password is same your current password') {
			errorToast('Mật khẩu mới phải khác mật khẩu cũ');
		}
	};
};
export const searchUser = email => {
	const { token } = getAllCookie();
	return async dispatch => {
		try {
			const res = await axios({
				method: 'GET',
				url: `https://hrmadmin.herokuapp.com/api/searchUser`,
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`
				},
				params: {
					email
				}
			});
			removeToast();
			if (res.data.hasOwnProperty('data')) {
				successToast('Tạo dự án thành công');
				dispatch(closePopup());
			} else {
				errorToast('Tạo dự án thất bại');
				throw new Error('Failed');
			}
		} catch (error) {
			console.log(error);
			errorToast('Tạo dự án thất bại');
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
			if (res.data.hasOwnProperty('data')) {
				successToast('Tạo dự án thành công');
				dispatch(closePopup());
			} else {
				errorToast('Tạo dự án thất bại');
				throw new Error('Failed');
			}
		} catch (error) {
			console.log(error);
			errorToast('Tạo dự án thất bại');
		}
	};
};
export const actFetchProject = data => {
	// loadingToast("Đang lấy dữ liệu...");
	const { id, token } = getAllCookie();
	let _param = '';
	if (data !== undefined) {
		for (let i = 0; i < data.length; i++) {
			_param = `projectCode=${data[i]}`;
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
			console.log(error);
			errorToast(`Lỗi`);
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
			console.log(error);
			errorToast('Tạo issue thất bại');
		}
	};
};
// export const actFetch
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
export const getDataTimeKeeping = payload => ({
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
