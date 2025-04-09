import React, { useState, useContext, useEffect } from "react";
import SliderContext from "../../context/Slidercontext";
import { Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const { sliderOpen } = useContext(SliderContext);

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:5000/admin/products/${id}`);
      if (result.status === 200) {
        setProducts(products.filter((product) => product.id !== id));
        console.log("Product deleted successfully");
      }
    } catch (error) {
      console.log("Data Deleting Error", error);
    }
  };

  const fetchAllProductData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/admin/products", {
        withCredentials: true,
      });
      if (data.length > 0) {
        setProducts(data);
      }
    } catch (error) {
      console.log("Data Fetching Error", error);
    }
  };

  useEffect(() => {
    fetchAllProductData();
  }, []);

  return (
    <div className={`pt-20 ${sliderOpen ? "pl-64" : "pl-0"} transition-all duration-300`}>
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col justify-between p-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
              >
                <button
                  onClick={() => handleDelete(product.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex-1">
                  <img
                    src={`http://localhost:5000/uploads/products/${product.image}`}
                    alt={product.productname}
                    className="w-full h-40 object-contain mx-auto mb-4"
                  />
                  <h3 className="text-lg text-center font-semibold capitalize">{product.productname}</h3>
                  <p className="mt-2 text-xl text-center font-bold text-yellow-400">₹{product.price}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <NavLink to={`/admin/products/editproduct/${product.slug}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                      Edit
                    </button>
                  </NavLink>
                  <NavLink to={`/admin/products/${product.slug}`}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                      View Details
                    </button>
                  </NavLink>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-300 text-lg col-span-full">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
