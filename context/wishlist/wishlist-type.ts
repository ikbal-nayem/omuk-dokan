import { ICartItems } from "../../interface/order.interface";

export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const DELETE_WISHLIST_ITEM = "DELETE_WISHLIST_ITEMS";
export const SET_WISHLIST = "SET_WISHLIST";
export const CLEAR_WISHLIST = "CLEAR_WISHLIST";

export type itemType = {
  _id: string;
  img1?: string;
  img2?: string;
  name: string;
  price: number;
  qty?: number;
};

export type wishlistType = {
  wishlist: ICartItems[];
  // addItem?: (item: ICartItems) => void; // delete
  addToWishlist?: (item: ICartItems) => void;
  // removeItem?: (item: ICartItems) => void; // delete
  deleteWishlistItem?: (item: ICartItems) => void;
  clearWishlist?: () => void;
};
