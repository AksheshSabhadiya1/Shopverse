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



export const wishlist = async() =>{
    const res = await api.get('/products')
    return res.data.slice(0,4)
}


export const CartData = async () => {
    const res = await api.get('/products')
    return res.data.slice(0,2)
}


export const FindProductDetails = async (id) => {
    const res = await api.get(`/products/${id}`)
    return Array(res.data)
}