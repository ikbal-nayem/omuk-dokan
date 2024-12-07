import React, { createContext, Reducer, useContext, useEffect, useReducer } from 'react';
import { ICartItems } from '../../interface/order.interface';
import { ADD_ITEM, CLEAR_CART, DELETE_ITEM, ICart, REMOVE_ITEM, SET_CART } from './cart-types';
import cartReducer from './cartReducer';

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
		const initialCart = localStorage.getItem('cart');
		if (initialCart) {
			const cartItems = JSON.parse(initialCart as string);
			dispatch({ type: SET_CART, payload: cartItems });
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state?.cart));
	}, [state?.cart]);

	const addItem = (item: ICartItems) => {
		dispatch({
			type: ADD_ITEM,
			payload: item,
		});
	};

	const addOne = (item: ICartItems) => {
		item.qty = item.qty ? item.qty + 1 : 1;
		dispatch({
			type: ADD_ITEM,
			payload: item,
		});
	};

	const removeItem = (item: ICartItems) => {
		item.qty = item.qty - 1;
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
