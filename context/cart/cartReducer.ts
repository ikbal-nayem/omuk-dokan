import { IProduct } from '../../interface/product.interface';
import addItemToCart from '../Util/addItemToCart';
import removeItemFromCart from '../Util/removeItemFromCart';
import { ADD_ITEM, ADD_ONE, CLEAR_CART, DELETE_ITEM, ICart, REMOVE_ITEM, SET_CART } from './cart-types';

type actionType = {
	type: string;
	payload?: IProduct | IProduct[];
};

const cartReducer = (state: ICart, action: actionType) => {
	switch (action.type) {
		case ADD_ITEM:
			return {
				...state,
				cart: addItemToCart(state.cart, action.payload as IProduct),
			};
		case ADD_ONE:
			return {
				...state,
				cart: addItemToCart(state.cart, action.payload as IProduct, true),
			};
		case REMOVE_ITEM:
			return {
				...state,
				cart: removeItemFromCart(state.cart, action.payload as IProduct),
			};
		case DELETE_ITEM:
			return {
				...state,
				cart: state.cart?.filter((cartItem: IProduct) => cartItem._id !== (action.payload as IProduct)._id),
			};
		case SET_CART:
			return {
				...state,
				cart: action.payload as IProduct[],
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
