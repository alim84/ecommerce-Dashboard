import { useState } from "react";
import axios, { toFormData } from "axios";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("name", categoryName);
    data.append("description", categoryDescription);
    if (categoryImage) {
      data.append("image", categoryImage);
    }

    axios
      .post("http://localhost:5000/api/v1/category/createcategory", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        console.log(data);
      }).catch((error)=>{
        console.log(error)
      })
    // {
    //   categoryName, categoryDescription, categoryImage;
    // }
  };
  console.log(categoryName)
  console.log(categoryDescription)
  return (
    <div className="mx-auto w-full max-w-4xl mt-10 pt-6 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add New Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div className="flex flex-col">
          <label htmlFor="categoryName" className="text-lg text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            
            placeholder="Enter category name"
            className="mt-2 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            required
          />
        </div>

        {/* Category Description */}
        <div className="flex flex-col">
          <label
            htmlFor="categoryDescription"
            className="text-lg text-gray-700"
          >
            Category Description
          </label>
          <textarea
            id="categoryDescription"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Enter category description"
            className="mt-2 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            rows="4"
            required
          />
        </div>

        {/* Category Image */}
        <div className="flex flex-col">
          <label htmlFor="categoryImage" className="text-lg text-gray-700">
            Category Image
          </label>
          <input
            type="file"
            id="categoryImage"
            accept="image/*"
            onChange={(e) => setCategoryImage(e.target.files[0])}
            className="mt-2 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-10 py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-all duration-300"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
