import { useState, useEffect } from "react";
import axios from "axios";

// Static categories (you can replace this with an API call or data from your backend)
// const staticCategories = [
//   {
//     categoryName: "Electronics",
//     categoryDescription: "Latest gadgets and electronics",
//     categoryImage: "https://picsum.photos/200/300", // Example static image path
//   },
//   {
//     categoryName: "Clothing",
//     categoryDescription: "Fashionable and trendy clothes",
//     categoryImage: "https://picsum.photos/200/300", // Example static image path
//   },
//   {
//     categoryName: "Furniture",
//     categoryDescription: "Furniture for all your needs",
//     categoryImage: "https://picsum.photos/200/300", // Example static image path
//   },
// ];

const AllCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let allCategory = async () => {
      const data = await axios.get(
        "http://localhost:5000/api/v1/category/allcategory"
      );
      setCategories(data.data.data);
     
    };
    allCategory();
  }, []);

  return (
    <div className=" w-[1200px] p-6">
      <h1 className="text-4xl font-bold text-center my-6">All Categories</h1>

      {/* Categories Table */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-indigo-600 text-white ">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Category Name</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody className="mt-14">
            {categories.map((category, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-center">
                  {/* {category.image && ( */}
                    <img
                      src={category.image} // Static image or dynamically sourced
                      // alt={category.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  {/* )} */}
                </td>
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2">{category.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategory;
