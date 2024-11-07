import { IAppContextProps } from './app.context';

export interface IReducerAction {
	type: 'ADD_APP_DATA';
	payload?: any;
}

export const appReducer = (state: IAppContextProps, action: IReducerAction) => {
	switch (action.type) {
		case 'ADD_APP_DATA':
			return {
				...state,
				appData: action?.payload || {},
			};
		default:
			return state;
	}
};
