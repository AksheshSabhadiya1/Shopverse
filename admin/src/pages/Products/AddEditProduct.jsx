import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Input } from "@mui/material";
import SliderContext from "../../context/SliderData/SliderContext";



export default function AddEditProduct() {
  const { sliderOpen } = useContext(SliderContext);
  const [oldImage, setOldImage] = useState("");
  const [productsize, setProductsize] = useState([]);
  const [productcolor, setProductcolor] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();


  const isEdit = Boolean(id);
  const sizes = ["Select All Sizes", "XS", "S", "M", "L", "XL"]
  const colors = ["Select All Colors","Red", "Green", "Blue", "White", "Black"]

  const handleSizeChange = (event) => {
    const { target: { value }, } = event;

      if (value.includes('Select All Sizes')) {
        setProductsize(sizes.slice(1, sizes.length))
      } else {
        setProductsize(typeof value === 'string' ? value.split(',') : value);
      }
  }

  const handleColorChange = (event) => {
    const { target: { value }, } = event;

      if (value.includes('Select All Colors')) {
        setProductcolor(colors.slice(1, colors.length))
      } else {
        setProductcolor(typeof value === 'string' ? value.split(',') : value);
      }
  }

  const form = useForm({
    defaultValues: isEdit
      ? async () => {
        const { data } = await axios.get(`http://localhost:5000/admin/products/${id}`);
        setOldImage(data[0].image);
        return {
          productname: data[0].productname,
          originalprice: data[0].originalprice,
          sellingprice: data[0].sellingprice,
          description: data[0].description,
          category: data[0].category,
          rating: data[0].rating,
          rate_count: data[0].rate_count,
          stock_count: data[0].stock_count,
          brand: data[0].brand,
          productcolor: setProductcolor(data[0].productcolor),
          productsize: setProductsize(data[0].productsize),
        };
      }
      : {
        productname: "",
        originalprice: "",
        sellingprice: "",
        description: "",
        category: "",
        image: "",
        rating: "",
        rate_count: "",
        stock_count: "",
        brand: "",
        productcolor: "",
        productsize: "",
      },
    mode: "all",
  });

  const { register, handleSubmit, getValues, trigger, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("productname", data.productname);
      formData.append("originalprice", data.originalprice);
      formData.append("sellingprice", data.sellingprice);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("rating", data.rating);
      formData.append("rate_count", data.rate_count);
      formData.append("stock_count", data.stock_count);
      formData.append("brand", data.brand);
      formData.append("productcolor", JSON.stringify(productcolor))
      formData.append("productsize", JSON.stringify(productsize))

      if (isEdit) {
        formData.append("image", oldImage);
        if (data.image && data.image[0]) {
          formData.set("image", data.image[0]);
        }
        await axios.post(`http://localhost:5000/admin/products/editproduct/${id}`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Product Updated Successfully");
      } else {
        formData.append("image", data.image[0]);
        await axios.post("http://localhost:5000/admin/products/addproduct", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("New Product added Successfully");
      }
      navigate("/admin/products");
    } catch (error) {
      console.log("Product not processed", error);
    }
  };

  return (
    <div className={`${sliderOpen ? "pl-64" : "pl-0"}`}>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20 w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-white text-start mb-6">
            {isEdit ? `Edit Product: ${getValues("productname")}` : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-white mb-1">Product Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="productname"
                id="productname"
                title="Enter product name"
                {...register('productname', { required: "productname is required" })}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.productname?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
                placeholder="Enter product name"
                required
              /><p className="error ml-2 text-red-500">{errors.productname?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Original Price<span className="text-red-500">*</span> (₹)</label>
              <input
                type="number"
                name="originalprice"
                {...register('originalprice', { required: "originalprice is required" })}
                title="Enter product originalprice"
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.originalprice?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
                placeholder="Enter product originalprice"
                required
              /><p className="error ml-2 text-red-500">{errors.originalprice?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Selling Price<span className="text-red-500">*</span> (₹)</label>
              <input
                type="number"
                name="sellingprice"
                {...register('sellingprice', { required: "sellingprice is required" })}
                title="Enter product sellingprice"
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.sellingprice?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
                placeholder="Enter product sellingprice"
                required
              /><p className="error ml-2 text-red-500">{errors.sellingprice?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Image<span className="text-red-500">*</span></label>
              <div className="flex justify-center items-center">
                {
                  isEdit && <img src={`http://localhost:5000/uploads/products/${oldImage}`} alt="image" className="w-20 me-2 h-12 rounded" />
                }
                <input
                  type="file"
                  name="image"
                  title="Enter product image"
                  {...register('image')}
                  className={`w-full p-3 bg-white/20 text-white rounded outline-none ${errors.image?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-white mb-1">Description<span className="text-red-500">*</span></label>
              <textarea
                name="description"
                title="Enter product description"
                {...register('description', { required: "description is required" })}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.description?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
                placeholder="Enter product description"
                rows="3"
                required
              ></textarea><p className="error ml-2 text-red-500">{errors.description?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Category<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="category"
                title="Enter product category"
                {...register('category', { required: "category is required" })}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.category?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
                placeholder="Enter product category"
                required
              /><p className="error ml-2 text-red-500">{errors.category?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Brand<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="brand"
                title="Enter product brand"
                {...register('brand', { required: "brand is required" })}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.brand?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
                placeholder="Enter product brand"
                required
              /><p className="error ml-2 text-red-500">{errors.brand?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">
                Size
              </label>
              <FormControl sx={{ width: 475 }}>
                <Select
                  id="demo-multiple-chip"
                  multiple
                  value={productsize}
                  onChange={handleSizeChange}
                  className={`${errors.productsize?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"} h-12`}
                  input={
                    <Input
                      id="select-multiple-chip"
                      className="bg-gray-500 text-black"
                      placeholder="Enter Product Size"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 1 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} sx={{color: "white"}} />
                      ))}
                    </Box>
                  )}
                >
                  {sizes.map((name) => (
                    <MenuItem key={name} value={name} sx={{ backgroundColor: '#6a7282' }}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <p className="error ml-2 text-red-500">{errors.productsize?.message}</p>
              </FormControl>
            </div>

            <div>
              <label className="block text-white mb-1">
                Color
              </label>
              <FormControl sx={{ width: 475 }}>
                <Select
                  id="demo-multiple-chip"
                  multiple
                  value={productcolor}
                  onChange={handleColorChange}
                  className={`${errors.productcolor?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"} h-12`}
                  input={
                    <Input
                      id="select-multiple-chip"
                      className="bg-gray-500 text-black"
                      placeholder="Enter Product Color"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 1 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} sx={{color: "white"}} />
                      ))}
                    </Box>
                  )}
                >
                  {colors.map((name) => (
                    <MenuItem key={name} value={name} sx={{ backgroundColor: '#6a7282' }}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <p className="error ml-2 text-red-500">{errors.productcolor?.message}</p>
              </FormControl>
            </div>


            <div>
              <label className={`block text-white mb-1`}>Rating<span className="text-red-500">*</span></label>
              <input
                type="number"
                name="rating"
                title="Enter product rating"
                {...register('rating', { required: "rating is required" })}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.rating?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
                placeholder="Enter product rating"
                required
              /><p className="error ml-2 text-red-500">{errors.rating?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Rate Count<span className="text-red-500">*</span></label>
              <input
                type="number"
                name="rate_count"
                title="Enter product rating count"
                {...register('rate_count', { required: "rate count is required" })}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.rate_count?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
                placeholder="Enter product rating count"
                required
              /><p className="error ml-2 text-red-500">{errors.rate_count?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Stock Count<span className="text-red-500">*</span></label>
              <input
                type="number"
                name="stock_count"
                title="Enter product stock"
                {...register('stock_count', { required: "stock count is required" })}
                className={`w-full p-3 bg-white/20 text-white rounded outline-none  ${errors.stock_count?.message ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
                placeholder="Enter product stock"
                required
              /><p className="error ml-2 text-red-500">{errors.stock_count?.message}</p>
            </div>



            <div className="md:col-span-2 space-x-4 mt-2">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition"
                onClick={() => trigger()}
              >
                {isEdit ? "Update Product" : "Add Product"}
              </button>
              <NavLink to='/admin/products'>
                <button
                  type="submit"
                  className="bg-red-500 text-white py-3 px-6 rounded hover:bg-red-700 transition"
                >
                  Cancel
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
