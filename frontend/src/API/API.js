import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000'
})


export const FetchProducts = async () => {
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
    try {
        const res = await api.get('/products')
        return res.data.filter(item => item.rate_count >= 300).sort((a, b) => b.rate_count - a.rate_count).slice(0,4);
    } catch (error) {
        console.log("BestProduct Not Found", error);
    }
}


export const ExploreProducts = async () => {
    try {
        const res = await api.get('/products')
        return res.data.reverse().slice(0,8)
    } catch (error) {
        console.log("Explore Products Not Found", error);
    }
}


export const wishlist = async() =>{
    try {
        const res = await api.get('/products')
        return res.data.slice(0,4)
    } catch (error) {
        console.log("Wishlist Not Found", error);
    }
}


export const FindProductById = async (id) => {
    try {
        const {data} = await api.get(`/products/${id}`)
        return data
    } catch (error) {
        console.log("Product Not Found", error);
    }
}