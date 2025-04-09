import React, { useState, useContext, useEffect } from "react";
import SliderContext from "../../context/Slidercontext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { sliderOpen } = useContext(SliderContext);

  const [oldImage, setOldImage] = useState('');

  const {id} = useParams()
  const nevigate = useNavigate()

  const form = useForm({
        defaultValues: async() =>{
          const {data} = await axios.get(`http://localhost:5000/admin/products/${id}`)
          setOldImage(data[0].image)

          return{
            productname: data[0].productname,
            price: data[0].price,
            description: data[0].description,
            category: data[0].category,
            rating: data[0].rating,
            rate_count: data[0].rate_count,
            stock_count: data[0].stock_count,
            brand: data[0].brand,
          }
        }, 
      mode: 'all',
    })

    const {register, handleSubmit, setValue, trigger, formState} = form
    const {errors} = formState



  const updateProduct = async(data) => {
    try {
      const formdata = new FormData()
      formdata.append('productname', data.productname);
      formdata.append('price', data.price);
      formdata.append('description', data.description);
      formdata.append('category', data.category);
      formdata.append('rating', data.rating);
      formdata.append('rate_count', data.rate_count);
      formdata.append('stock_count', data.stock_count);
      formdata.append('brand', data.brand);
      formdata.append('image',oldImage)

      if(data.image && data.image[0]){
        formdata.append('image',data.image[0])
      }

      await axios.post(`http://localhost:5000/admin/products/editproduct/${id}`, formdata, {
        withCredentials: true,
        headers:{
          'Content-Type': 'multipart/form-data'
        },
      })
      console.log("Product Updated Successfully"); 
      nevigate('/admin/products')
    } catch (error) {
      console.log("Product not updated", error);
    }
  };

  return (
    <div className={`${sliderOpen ? "pl-64" : "pl-0"}`}>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20 w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Update Product</h2>
          <form onSubmit={handleSubmit(updateProduct)} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-white mb-1">Product Name</label>
              <input
                type="text"
                name="productname"
                id="productname"
                title="Enter product name"
                {...register('productname', {required: "productname is required"})}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.productname?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400" }`}
                placeholder="Enter product name"
                required
              /><p className="error ml-2 text-red-500">{errors.productname?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                {...register('price', {required: "price is required"})}
                title="Enter product price"
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.price?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400" }`}
                placeholder="Enter product price"
                required
              /><p className="error ml-2 text-red-500">{errors.price?.message}</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-white mb-1">Description</label>
              <textarea
                name="description"
                title="Enter product description"
                {...register('description', {required: "description is required"})}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.description?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400" }`}
                placeholder="Enter product description"
                rows="3"
                required
              ></textarea><p className="error ml-2 text-red-500">{errors.description?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Category</label>
              <input
                type="text"
                name="category"
                title="Enter product category"
                {...register('category', {required: "category is required"})}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.category?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400" }`}
                placeholder="Enter product category"
                required
              /><p className="error ml-2 text-red-500">{errors.category?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                title="Enter product brand"
                {...register('brand', {required: "brand is required"})}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.brand?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400" }`}
                placeholder="Enter product brand"
                required
              /><p className="error ml-2 text-red-500">{errors.brand?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Image</label>
              <input
                type="file"
                name="image"
                title="Enter product image"
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.image?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400" }`}
              />
            </div>

            <div>
              <label className="block text-white mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                title="Enter product rating"
                {...register('rating', {required: "rating is required"})}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.rating?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400" }`}
                placeholder="Enter product rating"
                required
              /><p className="error ml-2 text-red-500">{errors.rating?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Rate Count</label>
              <input
                type="number"
                name="rate_count"
                title="Enter product rating count"
                {...register('rate_count', {required: "rate count is required"})}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.rate_count?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400" }`}
                placeholder="Enter product rating count"
                required
              /><p className="error ml-2 text-red-500">{errors.rate_count?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Stock Count</label>
              <input
                type="number"
                name="stock_count"
                title="Enter product stock"
                {...register('stock_count', {required: "stock count is required"})}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.stock_count?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400" }`}
                placeholder="Enter product stock"
                required
              /><p className="error ml-2 text-red-500">{errors.stock_count?.message}</p>
            </div>

            

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition"
                onClick={()=> trigger()}
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
