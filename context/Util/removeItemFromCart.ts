import { ICartItems } from '../../interface/order.interface';

const removeItemFromCart = (cartItems: ICartItems[], item: ICartItems) => {
	//   const duplicate = cartItems.some((cartItem) => cartItem.id === item.id);
	if (item.qty === 1) {
		return cartItems.filter((cartItem) => cartItem._id !== item._id);
	}
	return cartItems.map((cartItem) =>
		cartItem._id === item._id ? { ...cartItem, qty: cartItem.qty! - 1 } : cartItem
	);
};

export default removeItemFromCart;
