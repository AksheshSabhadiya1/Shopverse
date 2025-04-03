import React, { useState } from "react";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Added:", { productName, price, description });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Product Name</label>
            <input 
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Price ($)</label>
            <input 
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
