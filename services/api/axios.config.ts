import axios from 'axios';
import { COOKIES_DATA } from 'constants/storage.constant';
import { getCookie } from 'cookies-next';

const axiosIns = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	// withCredentials: true,
});

export const setHeaderToken = (token?: string) => {
	axiosIns.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
};

setHeaderToken(getCookie(COOKIES_DATA.TOKEN));

export default axiosIns;
