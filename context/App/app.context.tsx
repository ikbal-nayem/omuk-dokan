import { createContext, ReactNode, useContext, useReducer } from 'react';
import { appReducer, IReducerAction } from './app.reducer';

export type IAppContextProps = {
	appData: {};
	discatchApp: React.Dispatch<IReducerAction>;
};

const initialValue: IAppContextProps = {
	appData: {},
	discatchApp: () => {},
};

const appContext = createContext<IAppContextProps>(initialValue);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [state, discatch] = useReducer(appReducer, initialValue);

	// const fetchData = async () => {
	// 	Promise.all([
	// 		axiosIns.get('/product-config/category-tree?isActive=true'),
	// 		axiosIns.get('/product-config/collections?isActive=true'),
	// 	]).then(([res1, res2]) => {
	// 		discatch({
	// 			type: 'ADD_APP_DATA',
	// 			payload: { categoryTree: res1.data?.data || [], collections: res2.data?.data || [] },
	// 		});
	// 	});
	// };
	// fetchData();

	return <appContext.Provider value={{ ...state, discatchApp: discatch }}>{children}</appContext.Provider>;
};

export const useApp = () => useContext(appContext);
