import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000'
})


export const fetchProducts = async () => {
    try {
        const {data} = await api.get('/products',{
            withCredentials: true
        })
        return data
    } catch (error) {
        console.log("Product Not Found", error);
    }
}


export const BestProduct = async () => {
    const res = await api.get('/products')
    return res.data.filter(item => item.rate_count >= 300).sort((a, b) => b.rate_count - a.rate_count);
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