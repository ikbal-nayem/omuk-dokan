import { ICartItems } from '../../interface/order.interface';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SET_CART = 'SET_CART';
export const CLEAR_CART = 'CLEAR_CART';

export type cartFuncType = (item: ICartItems) => void;

export type ICart = {
	cart: ICartItems[];
	addItem?: cartFuncType;
	addOne?: cartFuncType;
	removeItem?: cartFuncType;
	deleteItem?: cartFuncType;
	clearCart?: () => void;
};
