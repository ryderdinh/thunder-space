import { useEffect, useState } from 'react';

export const hasWindowObj = () => typeof window !== 'undefined';

export default function useNavigatorStatus() {
	const [isOnline, setIsOnline] = useState(
		hasWindowObj() ? window.navigator.onLine : true
	);

	useEffect(() => {
		let isMounted = true;

		function offlineListener() {
			if (isMounted) {
				setIsOnline(false);
			}
		}

		if (hasWindowObj()) {
			window.addEventListener('offline', offlineListener);
		}

		return () => {
			isMounted = false;
			if (hasWindowObj()) {
				window.removeEventListener('offline', offlineListener);
			}
		};
	}, []);

	useEffect(() => {
		let isMounted = true;

		function onlineListener() {
			if (isMounted) {
				setIsOnline(true);
			}
		}

		if (typeof window !== 'undefined') {
			window.addEventListener('online', onlineListener);
		}

		return () => {
			isMounted = false;
			if (hasWindowObj()) {
				window.removeEventListener('online', onlineListener);
			}
		};
	}, []);

	return isOnline;
}
