import { getCookie, setCookie } from 'cookies-next';
import { Reducer, useContext, useEffect, useReducer } from 'react';

import { ICartItems } from '../../interface/order.interface';
import WishlistContext from './WishlistContext';
import {
	ADD_TO_WISHLIST,
	CLEAR_WISHLIST,
	DELETE_WISHLIST_ITEM,
	SET_WISHLIST,
	wishlistType,
} from './wishlist-type';
import wishlistReducer from './wishlistReducer';

export const ProvideWishlist = ({ children }: { children: React.ReactNode }) => {
	const value = useProvideWishlist();
	return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);

const useProvideWishlist = () => {
	const initPersistState: wishlistType = { wishlist: [] };
	const [state, dispatch] = useReducer<Reducer<any, any>>(wishlistReducer, initPersistState);

	useEffect(() => {
		const initialWishlist = getCookie('wishlist');
		if (initialWishlist) {
			const wishlistItems = JSON.parse(initialWishlist as string);
			dispatch({ type: SET_WISHLIST, payload: wishlistItems });
		}
	}, []);

	useEffect(() => {
		setCookie('wishlist', state.wishlist);
	}, [state.wishlist]);

	const addToWishlist = (item: ICartItems) => {
		dispatch({
			type: ADD_TO_WISHLIST,
			payload: item,
		});
	};

	const deleteWishlistItem = (item: ICartItems) => {
		dispatch({
			type: DELETE_WISHLIST_ITEM,
			payload: item,
		});
	};

	const clearWishlist = () => {
		dispatch({
			type: CLEAR_WISHLIST,
		});
	};

	const value: wishlistType = {
		wishlist: state.wishlist,
		addToWishlist,
		deleteWishlistItem,
		clearWishlist,
	};

	return value;
};
