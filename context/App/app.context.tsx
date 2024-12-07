import { createContext, ReactNode, Reducer, useContext, useEffect, useReducer } from 'react';
import { LOCALSTORAGE_DATA } from '../../constants/storage.constant';
import { IObject } from '../../interface/common.interface';
import { appReducer, IReducerAction } from './app.reducer';

export type IAppContextProps = {
	appData: IObject;
	deliveryOption: IObject;
	dispatchApp: React.Dispatch<IReducerAction>;
};

const initialValue: IAppContextProps = {
	appData: {},
	deliveryOption: {},
	dispatchApp: () => {},
};

const appContext = createContext<IAppContextProps>(initialValue);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer<Reducer<any, any>>(appReducer, initialValue);

	useEffect(() => {
		const userData = localStorage.getItem(LOCALSTORAGE_DATA.USER_DATA);
		if (userData) {
			dispatch({ type: 'SET_ALL', payload: JSON.parse(userData as string) });
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCALSTORAGE_DATA.USER_DATA, JSON.stringify(state));
	}, [state]);

	// const fetchData = async () => {
	// 	Promise.all([
	// 		axiosIns.get('/product-config/category-tree?isActive=true'),
	// 		axiosIns.get('/product-config/collections?isActive=true'),
	// 	]).then(([res1, res2]) => {
	// 		dispatch({
	// 			type: 'ADD_APP_DATA',
	// 			payload: { categoryTree: res1.data?.data || [], collections: res2.data?.data || [] },
	// 		});
	// 	});
	// };
	// fetchData();

	return <appContext.Provider value={{ ...state, dispatchApp: dispatch }}>{children}</appContext.Provider>;
};

export const useApp = () => useContext(appContext);
