import { IAppContextProps } from './app.context';

export interface IReducerAction {
	type: 'ADD_APP_DATA' | 'SET_DELIVERY_OPTION' | 'SET_ALL';
	payload?: any;
}

export const appReducer = (state: IAppContextProps, action: IReducerAction) => {
	switch (action.type) {
		case 'ADD_APP_DATA':
			return {
				...state,
				appData: action?.payload || {},
			};
		case 'SET_DELIVERY_OPTION':
			return {
				...state,
				deliveryOption: action?.payload || {},
			};
		case 'SET_ALL':
			return {
				...action?.payload,
			};
		default:
			return state;
	}
};
