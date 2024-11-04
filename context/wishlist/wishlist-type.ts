import { IProduct } from "../../interface/product.interface";

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
  wishlist: IProduct[];
  // addItem?: (item: IProduct) => void; // delete
  addToWishlist?: (item: IProduct) => void;
  // removeItem?: (item: IProduct) => void; // delete
  deleteWishlistItem?: (item: IProduct) => void;
  clearWishlist?: () => void;
};
