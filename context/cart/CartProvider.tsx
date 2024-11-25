import { getCookie, setCookie } from 'cookies-next';
import React, { createContext, Reducer, useContext, useEffect, useReducer } from 'react';
import {
  ADD_ITEM,
  ADD_ONE,
  CLEAR_CART,
  DELETE_ITEM,
  ICart,
  REMOVE_ITEM,
  SET_CART,
} from './cart-types';
import cartReducer from './cartReducer';
import { ICartItems } from '../../interface/order.interface';

const CartContext = createContext<ICart>({
	cart: [],
});

export const ProvideCart = ({ children }: { children: React.ReactNode }) => {
	const value = useProvideCart();
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

const useProvideCart = () => {
	const [state, dispatch] = useReducer<Reducer<any, any>>(cartReducer, { cart: [] });

	useEffect(() => {
		const initialCart = getCookie('cart');
		if (initialCart) {
			const cartItems = JSON.parse(initialCart as string);
			dispatch({ type: SET_CART, payload: cartItems });
		}
	}, []);

	useEffect(() => {
		setCookie('cart', state?.cart);
	}, [state?.cart]);

	const addItem = (item: ICartItems) => {
		dispatch({
			type: ADD_ITEM,
			payload: item,
		});
	};

	const addOne = (item: ICartItems) => {
		dispatch({
			type: ADD_ONE,
			payload: item,
		});
	};

	const removeItem = (item: ICartItems) => {
		dispatch({
			type: REMOVE_ITEM,
			payload: item,
		});
	};

	const deleteItem = (item: ICartItems) => {
		dispatch({
			type: DELETE_ITEM,
			payload: item,
		});
	};

	const clearCart = () => {
		dispatch({
			type: CLEAR_CART,
		});
	};

	const value: ICart = {
		cart: state.cart,
		addItem,
		addOne,
		removeItem,
		deleteItem,
		clearCart,
	};

	return value;
};
