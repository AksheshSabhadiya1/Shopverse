import React, { useState, useContext } from "react";
import SliderContext from "../../context/Slidercontext";
import Swal from "sweetalert2";

export default function EditProduct() {
  const { sliderOpen } = useContext(SliderContext);

  const [product, setProduct] = useState({
    id: 1,
    name: "Wireless Headphones",
    price: "99",
    description: "High-quality sound with noise cancellation.",
    image: "/images/headphones.png",
  });

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20 w-full max-w-md">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Edit Product</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-white mb-1">Product Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-1">Price (₹)</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-1">Description</label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter product description"
                rows="3"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
