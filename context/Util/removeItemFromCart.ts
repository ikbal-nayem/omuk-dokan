import { IProduct } from '../../interface/product.interface';

const removeItemFromCart = (cartItems: IProduct[], item: IProduct) => {
	//   const duplicate = cartItems.some((cartItem) => cartItem.id === item.id);
	if (item.stock === 1) {
		return cartItems.filter((cartItem) => cartItem._id !== item._id);
	}
	return cartItems.map((cartItem) =>
		cartItem._id === item._id ? { ...cartItem, qty: cartItem.stock! - 1 } : cartItem
	);
	//   if (duplicate) {
	//     return cartItems.map((cartItem) =>
	//       cartItem.id === item.id
	//         ? { ...cartItem, qty: cartItem.qty - 1 }
	//         : cartItem
	//     );
	//   }
	//   return [
	//     ...cartItems,
	//     {
	//       id: item.id,
	//       name: item.name,
	//       price: item.price,
	//       img1: item.img1,
	//       img2: item.img2,
	//       qty: 1,
	//     },
	//   ];
};

export default removeItemFromCart;
