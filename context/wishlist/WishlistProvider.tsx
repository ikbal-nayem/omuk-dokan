import { Reducer, useContext, useEffect, useReducer } from "react";
import { getCookie, setCookie } from "cookies-next";

import wishlistReducer from "./wishlistReducer";
import WishlistContext from "./WishlistContext";
import {
  ADD_TO_WISHLIST,
  DELETE_WISHLIST_ITEM,
  CLEAR_WISHLIST,
  wishlistType,
  SET_WISHLIST,
} from "./wishlist-type";
import { IProduct } from "../../interface/product.interface";

export const ProvideWishlist = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useProvideWishlist();
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

const useProvideWishlist = () => {
  const initPersistState: wishlistType = { wishlist: [] };
  const [state, dispatch] = useReducer<Reducer<any, any>>(wishlistReducer, initPersistState);

  useEffect(() => {
    const initialWishlist = getCookie("wishlist");
    if (initialWishlist) {
      const wishlistItems = JSON.parse(initialWishlist as string);
      dispatch({ type: SET_WISHLIST, payload: wishlistItems });
    }
  }, []);

  useEffect(() => {
    setCookie("wishlist", state.wishlist);
  }, [state.wishlist]);

  const addToWishlist = (item: IProduct) => {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: item,
    });
  };

  const deleteWishlistItem = (item: IProduct) => {
    dispatch({
      type: DELETE_WISHLIST_ITEM,
      payload: item,
    });
  };

  const clearWishlist = () => {
    dispatch({
      type: CLEAR_WISHLIST,
    });
  };

  const value: wishlistType = {
    wishlist: state.wishlist,
    addToWishlist,
    deleteWishlistItem,
    clearWishlist,
  };

  return value;
};
