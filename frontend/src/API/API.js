import axios from 'axios'

const api = axios.create({
    baseURL: 'https://fakestoreapi.com'
})


export const fetchProducts = async () => {
    const res = await api.get('/products')
    return res.status === 200 ? res.data : null
}


export const BestProduct = async () => {
    const res = await api.get('/products')
    return res.data.filter(item => item.rating.count >= 400)
}


export const ExploreProducts = async () => {
    const res = await api.get('/products')
    return res.data.reverse().slice(0,8)
}


export const Categories = () => {
    const categories = [
        { name: "Phones", icon: "icons/mobile-phone-black.png" },
        { name: "Computers", icon: "icons/computer-black.png" },
        { name: "SmartWatch", icon: "icons/smartwatch-black.png" },
        { name: "Camera", icon: "icons/camera-black.png" },
        { name: "HeadPhones", icon: "icons/headphones-black.png" },
        { name: "Gaming", icon: "icons/gaming-black.png" },
        { name: "Tablets", icon: "icons/tablet-black.png" },
        { name: "Drones", icon: "icons/drone-black.png" },
        { name: "Speakers", icon: "icons/speaker-black.png" },
    ];

    return categories
}


export const wishlist = async() =>{
   const res = await api.get('/products')
   return res.data.slice(0,4)
}