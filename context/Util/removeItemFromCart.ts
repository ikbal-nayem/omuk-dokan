import { ICartItems } from '../../interface/order.interface';

export const removeItemFromCart = (cartItems: ICartItems[], item: ICartItems) => {
	const cartIdx = cartItems.findIndex((cartItem) =>
		item?.hasVariants
			? cartItem._id === item._id && cartItem.selectedVariant?._id === item.selectedVariant?._id
			: cartItem._id === item._id
	);

	if (item.qty <= 1) {
		cartItems.splice(cartIdx, 1);
		return cartItems;
	}
	cartItems[cartIdx].qty = item.qty || 0;
	return [...cartItems];
};

export const deleteItemFromCart = (cartItems: ICartItems[], item: ICartItems) => {
	const cartIdx = cartItems.findIndex((cartItem) =>
		item?.hasVariants
			? cartItem._id === item._id && cartItem.selectedVariant?._id === item.selectedVariant?._id
			: cartItem._id === item._id
	);
	cartItems.splice(cartIdx, 1);
	return cartItems;
};
