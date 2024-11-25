import { ICartItems } from '../../interface/order.interface';

const addItemToCart = (cartItems: ICartItems[], item: ICartItems) => {
	const cartIdx = cartItems.findIndex((cartItem) =>
		item?.hasVariants
			? cartItem._id === item._id && cartItem.selectedVariant?._id === item.selectedVariant?._id
			: cartItem._id === item._id
	);

	if (cartIdx > -1) {
		let itemQty = 0;
		!item.qty ? (itemQty = (cartItems[cartIdx].qty || 0) + 1) : (itemQty = item.qty);
		cartItems[cartIdx].qty = itemQty;
		return [...cartItems]
		;
	}
	let itemQty = 0;
	!item.qty ? itemQty++ : (itemQty = item.qty);
	return [...cartItems, { ...item, qty: itemQty }];
};

export default addItemToCart;
