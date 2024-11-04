import { IProduct } from '../../interface/product.interface';

const addItemToCart = (cartItems: IProduct[], item: IProduct, add_one = false) => {
	const duplicate = cartItems.some((cartItem) => cartItem._id === item._id);

	if (duplicate) {
		return cartItems.map((cartItem) => {
			let itemQty = 0;
			!item.stock || add_one ? (itemQty = cartItem.stock! + 1) : (itemQty = item.stock);

			console.log(itemQty);
			return cartItem._id === item._id ? { ...cartItem, qty: itemQty } : cartItem;
		});
	}
	// console.log(itemQty);
	let itemQty = 0;
	!item.stock ? itemQty++ : (itemQty = item.stock);
	return [
		...cartItems,
		{
			id: item._id,
			name: item.name,
			price: item.price,
			img1: item.img1,
			img2: item.img2,
			qty: itemQty,
		},
	];
};

export default addItemToCart;
