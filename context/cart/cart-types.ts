import { IProduct } from '../../interface/product.interface';

export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ONE = 'ADD_ONE';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SET_CART = 'SET_CART';
export const CLEAR_CART = 'CLEAR_CART';

export type commonType = {
	_id: string;
	name: string;
	price: number;
	qty?: number | undefined;
	discountPercent?: number;
	description?: string;
	detail?: string;
	categoryId?: string;
	stock?: number;
	createdAt?: string;
	updatedAt?: string | null;
	category?: {
		_id?: string;
		name?: string;
		description?: string;
		thumbnailImage?: string;
		createdAt?: string;
		updatedAt?: string | null;
	};
};

export interface itemType extends commonType {
	img1?: string;
	img2?: string;
	categoryName?: string;
}

export interface apiProductsType extends commonType {
	_id: string;
	images?: string;
}

export type cartFuncType = (item: IProduct) => void;

export type ICart = {
	cart: IProduct[];
	addItem?: cartFuncType;
	addOne?: cartFuncType;
	removeItem?: cartFuncType;
	deleteItem?: cartFuncType;
	clearCart?: () => void;
};
