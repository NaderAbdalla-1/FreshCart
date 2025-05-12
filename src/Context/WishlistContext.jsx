import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let WishContext = createContext();

export default function WishContextProvider({children}) {
  const [wishItems, setwishItems] = useState(0);
  

  const headers = {
    token: localStorage.getItem("token"),
  };

  function addProductToWish(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteWishItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function getUserWish() {

    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((res) => {
        setwishItems(res.data.count);
        return res;
      })
      .catch((err) => err);
  }



  return (
    <WishContext.Provider
      value={{
        addProductToWish,
        deleteWishItem,
        getUserWish,
        wishItems,
        setwishItems,
      }}
    >
      {children}
    </WishContext.Provider>
  );
}
