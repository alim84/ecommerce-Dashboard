import  { useState } from "react";

const AddProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here, like sending the data to an API
    console.log({
      productName,
      productDescription,
      productImage,
      productPrice,
      productCategory,
    });
  };

  return (
    <div className=" mx-auto w-[1200px] mt-10 pt-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div className="flex flex-col">
          <label htmlFor="productName" className="text-lg text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col">
          <label htmlFor="productDescription" className="text-lg text-gray-700">
            Product Description
          </label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            rows="4"
            required
          />
        </div>

        {/* Product Image */}
        <div className="flex flex-col">
          <label htmlFor="productImage" className="text-lg text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            id="productImage"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            className="mt-2 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Product Price */}
        <div className="flex flex-col">
          <label htmlFor="productPrice" className="text-lg text-gray-700">
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Enter product price"
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Product Category */}
        <div className="flex flex-col">
          <label htmlFor="productCategory" className="text-lg text-gray-700">
            Product Category
          </label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home & Living</option>
            <option value="beauty">Beauty</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-10 py-3 mt-4 p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
