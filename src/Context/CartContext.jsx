import axios from 'axios'
import React, {  createContext, useState } from 'react'

export let cartContext = createContext ()

export default function CartContext({children}) {
 let token =localStorage.getItem("token")
 console.log(token);
 
 const [numofCart, setnumofCart] = useState(null);
 const [totalCartPrice, settotalCartPrice] = useState(null);
 const [ productsCart , setproductsCart] = useState([]);
 const [ cartId , setcartId] = useState([]);


 
   async function addtoCart(productId)
    {
    return  axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},
            {
                headers:
                {
                     token
                }
            }
        ).then((res)=>{console.log(res)
          
            return true;}
        ).catch((error)=>{console.log(error)
            return false;
        })
    }
   

    function displayCart()
    {
        axios.get("https://ecommerce.routemisr.com/api/v1/cart" ,{headers:{token}}).then((res)=>{
            console.log(res.data);
            setnumofCart(res.data.numOfCartItems);
            settotalCartPrice(res.data.data.totalCartPrice);
            setcartId(res.data.cartId)
            console.log(res.data.cartId);
            console.log((cartId));
            
            setproductsCart(res.data.data.products);
            
        }).catch((error)=>{console.log(error);
        })
    }
    async function clearCart() {
        try {
          const response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart`, 
            { headers: { token }} 
          );
      
          if (response.status === 200) {
            console.log("Cart cleared successfully:", response.data);
            displayCart(); // Refresh cart data
          }
        } catch (error) {
          console.error("Error clearing cart:", error.response?.data || error.message);
        }
      }
      

      async function updateCartItem(productId, newQuantity) {
        try {
          const response = await axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
            { count: newQuantity }, 
            {
              headers: { token }, 
            }
          );
      
          if (response.status === 200) {
            console.log("Quantity updated successfully:", response.data);
            displayCart(); // Refresh cart data
          }
        } catch (error) {
          console.error("Error updating item quantity:", error.response?.data || error.message);
        }
      }
      

      async function removeFromCart(productId) {
        try {
          const response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
              headers: { token }, 
            }
          );
      
          if (response.status === 200) {
            console.log("Item removed successfully:", response.data);
            displayCart(); // Refresh cart data
          }
        } catch (error) {
          console.error("Error removing item:", error.response?.data || error.message);
        }
      }
      
      
   
      

  return<>
<cartContext.Provider value={{addtoCart,cartId,removeFromCart,displayCart,clearCart,updateCartItem,numofCart,productsCart,totalCartPrice}}>
   {children}
</cartContext.Provider>
  </>
}
