import 'assets/css/login.css';
import LoginForm from 'components/SignIn/LoginForm';
import OnBoardingSlide from 'components/SignIn/OnBoardingSlide';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function Login() {
	const checkId = useSelector(state => state._checkLogin._checkLogin);
	const history = useHistory();

	useEffect(() => {
		document.title = 'Đăng nhập';
	}, []);

	useEffect(() => {
		if (checkId) history.goBack();
	}, [checkId, history]);

	return (
		<div className='login-container'>
			<LoginForm />
			<OnBoardingSlide />
			<Toaster position='top-right' reverseOrder={true} />
		</div>
	);
}
