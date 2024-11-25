import { ICartItems } from '../../interface/order.interface';
import addItemToCart from '../Util/addItemToCart';
import removeItemFromCart from '../Util/removeItemFromCart';
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
		case ADD_ONE:
			return {
				...state,
				cart: addItemToCart(state.cart, action.payload as ICartItems, true),
			};
		case REMOVE_ITEM:
			return {
				...state,
				cart: removeItemFromCart(state.cart, action.payload as ICartItems),
			};
		case DELETE_ITEM:
			return {
				...state,
				cart: state.cart?.filter((cartItem: ICartItems) => cartItem._id !== (action.payload as ICartItems)._id),
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
