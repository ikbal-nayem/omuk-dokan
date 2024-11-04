import { IProduct } from "../../interface/product.interface";
import addWishlist from "../Util/addWishlist";
import {
  ADD_TO_WISHLIST,
  DELETE_WISHLIST_ITEM,
  CLEAR_WISHLIST,
  wishlistType,
  SET_WISHLIST,
} from "./wishlist-type";

type actionType = {
  type: string;
  payload?: IProduct | IProduct[];
};

const wishlistReducer = (state: wishlistType, action: actionType) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: addWishlist(state.wishlist, action.payload as IProduct),
      };
    case DELETE_WISHLIST_ITEM:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (wishlistItem) => wishlistItem._id !== (action.payload as IProduct)?._id
        ),
      };
    case SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload as IProduct[],
      };
    case CLEAR_WISHLIST:
      return {
        ...state,
        wishlist: [],
      };
    default:
      return state;
  }
};

export default wishlistReducer;
