import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext()

export const CartContextProvider = ({children}) => {

    const [cartItem, setCartItem] = useState([])
    const [sessionItem, setSessionItem] = useState([])
    let tempArr = JSON.parse(sessionStorage.getItem('cartitem')) || []

    const fetchCart = async() => {
        try {
            axios.get('http://localhost:5000/cart', {withCredentials: true})
            .then(res => setCartItem(res.data || []))
            .catch(()=> setCartItem([]))
        } catch (error) {
            console.log("Fetch cart failed", error);
        }
    }

    useEffect(()=>{
        fetchCart()
        setSessionItem(tempArr)
    },[])
    
    const addToCart = async(product) => {
        try {
            const {data} = await axios.post('http://localhost:5000/cart/addToCart', product , {withCredentials:true})
            const item = tempArr.find(item => item.id === data.id)
            if(!item){  
                tempArr.push({...data, quantity: 1})
            }else{
                if(tempArr.includes(item)){
                    item.quantity += 1
                }
            }
            setSessionItem(tempArr)
            sessionStorage.setItem('cartitem', JSON.stringify(tempArr))
            fetchCart()
        } catch (error) {
            console.log("Add to cart failed", error);
        }
    }

    const updateCart = async(id, value) => {
        try {
            await axios.post(`http://localhost:5000/cart/updateCart/${id}`, {value} , {withCredentials:true})
            fetchCart()
        } catch (error) {
            console.log("Updated Cart Successfully ", error);
        }
    }


    const removeFromCart = async(id) => {
        try {
            
            if(cartItem.length === 0){
                const newArr = tempArr.filter(item => item.id !== id)
                setSessionItem(newArr)
                sessionStorage.setItem('cartitem', JSON.stringify(newArr))
            }

            await axios.get(`http://localhost:5000/cart/remove/${id}`,{withCredentials:true})
        } catch (error) {
            console.log("Delete from cart failed", error);
        }
        fetchCart()
    }

    const clearCart = () => setCartItem([])

    return (
        <CartContext.Provider value={{cartItem, setCartItem, sessionItem, setSessionItem, updateCart, addToCart, removeFromCart, clearCart}} >
            {children}
        </CartContext.Provider>
    )
}


export default CartContext