import { ICartItems } from '../../interface/order.interface';
import addItemToCart from '../Util/addItemToCart';
import { deleteItemFromCart, removeItemFromCart } from '../Util/removeItemFromCart';
import { ADD_ITEM, ADD_ONE, CLEAR_CART, DELETE_ITEM, ICart, REMOVE_ITEM, SET_CART } from './cart-types';

type actionType = {
	type: string;
	payload?: ICartItems | ICartItems[];
};

const cartReducer = (state: ICart, action: actionType) => {
	switch (action.type) {
		case ADD_ITEM:
			return {
				...state,
				cart: addItemToCart(state.cart, action.payload as ICartItems),
			};
		case REMOVE_ITEM:
			return {
				...state,
				cart: removeItemFromCart(state.cart, action.payload as ICartItems),
			};
		case DELETE_ITEM:
			return {
				...state,
				cart: deleteItemFromCart(state.cart, action.payload as ICartItems),
			};
		case SET_CART:
			return {
				...state,
				cart: action.payload as ICartItems[],
			};
		case CLEAR_CART:
			return {
				...state,
				cart: [],
			};
		default:
			return state;
	}
};

export default cartReducer;
