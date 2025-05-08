import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const WishlistContext = createContext()


export const WishlistContextProvider = ({children}) => {
    const [wishlistItem, setWishlistItem] = useState([])

    const fetchWishlist = async() => {
        try {
            axios.get('http://localhost:5000/wishlist', {withCredentials: true})
            .then(res => setWishlistItem(res.data || []))
            .catch(()=> setWishlistItem([]))
        } catch (error) {
            console.log("Fetch wishlist failed", error);
        }
    }

    useEffect(()=>{
        fetchWishlist()
    },[])

    const addToWishlist = async(product) => {
        try {
            await axios.post('http://localhost:5000/wishlist/addToWishlist', product , {withCredentials:true})
            .then(res => Swal.fire({
                position: "bottom-end",
                icon: "success",
                title: res.data,
                showConfirmButton: false,
                timer: 1500
            }))            
        } catch (error) {
            console.log("Add to wishlist failed", error);
        }
        fetchWishlist()
    }

    const removeFromWishlist = async(id) => {
        try {
            await axios.get(`http://localhost:5000/wishlist/remove/${id}`,{withCredentials:true})
        } catch (error) {
            console.log("Delete from wishlist failed", error);
        }
        fetchWishlist()
    }

    const clearWishlist = async() => {
        await axios.get('http://localhost:5000/wishlist/clearWishlist',{withCredentials:true})
        .then(res => setWishlistItem([]))
        fetchWishlist()
    } 

    

    return (
        <WishlistContext.Provider value={{wishlistItem, setWishlistItem, fetchWishlist, addToWishlist, removeFromWishlist, clearWishlist}} >
            {children}
        </WishlistContext.Provider>
    )

}

export default WishlistContext