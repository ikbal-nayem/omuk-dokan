import { itemType } from "../wishlist/wishlist-type";

const addWishlist = (wishlistItems: itemType[], item: itemType) => {
  const duplicate = wishlistItems.some(
    (wishlistItem) => wishlistItem._id === item!._id
  );

  if (!duplicate) {
    return [...wishlistItems, { ...item }];
  } else {
    return [...wishlistItems];
  }
};

export default addWishlist;
