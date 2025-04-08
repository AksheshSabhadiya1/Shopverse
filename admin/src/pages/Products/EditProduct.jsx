import React, { useState, useContext } from "react";
import SliderContext from "../../context/Slidercontext";
import Swal from "sweetalert2";

export default function EditProduct() {
  const { sliderOpen } = useContext(SliderContext);

  const [product, setProduct] = useState(0);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className={`pt-0 ${sliderOpen ? "pl-64" : "pl-0"}`}>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20 w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Edit Product</h2>
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-white mb-1">Product Name</label>
              <input
                type="text"
                name="productName"
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter price"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white mb-1">Description</label>
              <textarea
                name="description"
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter product description"
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-white mb-1">Category</label>
              <input
                type="text"
                name="category"
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter category"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1">Image</label>
              <input
                type="file"
                name="image"
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter rating"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1">Rate Count</label>
              <input
                type="number"
                name="rate_count"
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter total ratings"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1">Stock Count</label>
              <input
                type="number"
                name="stock_count"
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter stock count"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter product brand"
                required
              />
            </div>

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition"
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
