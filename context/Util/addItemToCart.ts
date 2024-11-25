import { ICartItems } from '../../interface/order.interface';

const addItemToCart = (cartItems: ICartItems[], item: ICartItems, add_one = false) => {
	const cartIdx = cartItems.findIndex((cartItem) => cartItem._id === item._id);

	if (
		(cartIdx > -1 && !item?.hasVariants) ||
		(item?.hasVariants && item?.selectedVariant?._id === cartItems[cartIdx]?.selectedVariant?._id)
	) {
		return cartItems.map((cartItem) => {
			if (cartItem._id !== item._id) return cartItem;
			let itemQty = 0;
			!item.qty || add_one ? (itemQty = cartItem.qty! + 1) : (itemQty = item.qty);
			return { ...cartItem, qty: itemQty };
		});
	}
	let itemQty = 0;
	!item.qty || add_one ? itemQty++ : (itemQty = item.qty);
	return [...cartItems, { ...item, qty: itemQty }];
};

export default addItemToCart;
