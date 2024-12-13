import { IUser } from '@/interface/auth.interface';
import { isNull } from '@/utils/check-validation';
import { COOKIES_DATA } from 'constants/storage.constant';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosIns, { setHeaderToken } from 'services/api/axios.config';

type authType = {
	user: null | IUser;
	isLoggedIn?: boolean;
	setAuthUser: (user: { data: IUser; token: string }) => void;
	logout?: () => void;
};

const initialAuth: authType = {
	user: null,
	isLoggedIn: false,
	setAuthUser: (user: { data: IUser; token: string }) => {},
	logout: () => {},
};

const authContext = createContext<authType>(initialAuth);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: { children: React.ReactNode }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
	return useContext(authContext);
};

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const initialToken = getCookie(COOKIES_DATA.TOKEN);
		if (!isNull(initialToken)) {
			axiosIns
				.get('/user/details')
				.then((resp) => {
					setAuthUser(resp.data);
					setLoggedIn(true);
				})
				.catch((err) => logout());
		}
	}, []);

	// useEffect(() => {
	// 	localStorage.setItem(LOCALSTORAGE_DATA.USER_DATA, JSON.stringify(user));
	// }, [user]);

	const setAuthUser = (user: { data: IUser; token: string }) => {
		if (isNull(user?.token) || isNull(user?.data)) logout();
		setHeaderToken(user?.token);
		setCookie(COOKIES_DATA.TOKEN, user.token);
		setUser(user.data);
		setLoggedIn(true);
	};

	const logout = () => {
		setUser(null);
		setLoggedIn(false);
		deleteCookie(COOKIES_DATA.TOKEN);
	};

	// Return the user object and auth methods
	return {
		user,
		isLoggedIn,
		setAuthUser,
		logout,
	};
};
