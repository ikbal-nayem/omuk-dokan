import { IProduct } from '../../interface/product.interface';

const addWishlist = (wishlistItems: IProduct[], item: IProduct) => {
	const duplicate = wishlistItems.some((wishlistItem) => wishlistItem._id === item!._id);

	if (!duplicate) {
		return [...wishlistItems, { ...item }];
	} else {
		return [...wishlistItems];
	}
};

export default addWishlist;
