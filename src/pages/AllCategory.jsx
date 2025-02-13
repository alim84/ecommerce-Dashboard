import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    description: "",
    image: null,
  });

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/category/allcategory"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle category deletion
  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/category/deletecategory/${id}`,
        {
          headers: { Cookie: `token=${token}` },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setCategories(categories.filter((category) => category._id !== id));
        alert("Category deleted successfully!");
      } else {
        alert("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("An error occurred while deleting the category.");
    }
  };

  // Handle category edit button click
  const handleEditClick = (category) => {
    setEditCategory(category);
    setUpdatedData({
      name: category.name,
      description: category.description,
      image: null,
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle category update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editCategory) return;

    const formData = new FormData();
    formData.append("name", updatedData.name);
    formData.append("description", updatedData.description);
    if (updatedData.image) formData.append("image", updatedData.image);

    const token = Cookies.get("token");

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/category/updatecategory/${editCategory._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCategories(
          categories.map((cat) =>
            cat._id === editCategory._id ? response.data.data : cat
          )
        );
        setEditCategory(null);
        alert("Category updated successfully!");
      } else {
        alert("Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("An error occurred while updating the category.");
    }
  };

  return (
    <div className="w-[1200px] p-6">
      <h1 className="text-4xl font-bold text-center my-6">All Categories</h1>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Category Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="px-4 py-2 text-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2">{category.description}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Category Form */}
      {editCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
            <form onSubmit={handleUpdate}>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
                required
              />

              <label className="block mb-2">Description</label>
              <input
                type="text"
                name="description"
                value={updatedData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
                required
              />

              <label className="block mb-2">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
              />

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditCategory(null)}
                  className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategory;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const AllCategory = () => {
//   const [categories, setCategories] = useState([]);

//   // Fetch all categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/category/allcategory"
//         );
//         setCategories(response.data.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Handle category deletion
//   const handleDelete = async (id) => {
//     const token = Cookies.get("token");
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/v1/category/deletecategory/${id}`,
//         {
//           headers: {
//             Cookie: `token=${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       if (response.data.success) {
//         // Remove the deleted category from the state
//         setCategories(categories.filter((category) => category._id !== id));
//         alert("Category deleted successfully!");
//       } else {
//         alert("Failed to delete category.");
//       }
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       alert("An error occurred while deleting the category.");
//     }
//   };

//   return (
//     <div className="w-[1200px] p-6">
//       <h1 className="text-4xl font-bold text-center my-6">All Categories</h1>

//       {/* Categories Table */}
//       <div className="mt-8 overflow-x-auto">
//         <table className="min-w-full table-auto">
//           <thead>
//             <tr className="bg-indigo-600 text-white">
//               <th className="px-4 py-2">Image</th>
//               <th className="px-4 py-2">Category Name</th>
//               <th className="px-4 py-2">Description</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category) => (
//               <tr key={category._id} className="border-b">
//                 <td className="px-4 py-2 text-center">
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="w-20 h-20 object-cover rounded-md"
//                   />
//                 </td>
//                 <td className="px-4 py-2">{category.name}</td>
//                 <td className="px-4 py-2">{category.description}</td>
//                 <td className="px-4 py-2 text-center">
//                   <button
//                     onClick={() => handleDelete(category._id)}
//                     className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllCategory;

// // import { useState, useEffect } from "react";
// // import axios from "axios";

// // // Static categories (you can replace this with an API call or data from your backend)
// // // const staticCategories = [
// // //   {
// // //     categoryName: "Electronics",
// // //     categoryDescription: "Latest gadgets and electronics",
// // //     categoryImage: "https://picsum.photos/200/300", // Example static image path
// // //   },
// // //   {
// // //     categoryName: "Clothing",
// // //     categoryDescription: "Fashionable and trendy clothes",
// // //     categoryImage: "https://picsum.photos/200/300", // Example static image path
// // //   },
// // //   {
// // //     categoryName: "Furniture",
// // //     categoryDescription: "Furniture for all your needs",
// // //     categoryImage: "https://picsum.photos/200/300", // Example static image path
// // //   },
// // // ];

// // const AllCategory = () => {
// //   const [categories, setCategories] = useState([]);

// //   useEffect(() => {
// //     let allCategory = async () => {
// //       const data = await axios.get(
// //         "http://localhost:5000/api/v1/category/allcategory"
// //       );
// //       setCategories(data.data.data);

// //     };
// //     allCategory();
// //   }, []);

// //   return (
// //     <div className=" w-[1200px] p-6">
// //       <h1 className="text-4xl font-bold text-center my-6">All Categories</h1>

// //       {/* Categories Table */}
// //       <div className="mt-8 overflow-x-auto">
// //         <table className="min-w-full table-auto">
// //           <thead>
// //             <tr className="bg-indigo-600 text-white ">
// //               <th className="px-4 py-2">Image</th>
// //               <th className="px-4 py-2">Category Name</th>
// //               <th className="px-4 py-2">Description</th>
// //             </tr>
// //           </thead>
// //           <tbody className="mt-14">
// //             {categories.map((category, index) => (
// //               <tr key={index} className="border-b">
// //                 <td className="px-4 py-2 text-center">
// //                   {/* {category.image && ( */}
// //                     <img
// //                       src={category.image} // Static image or dynamically sourced
// //                       // alt={category.name}
// //                       className="w-20 h-20 object-cover rounded-md"
// //                     />
// //                   {/* )} */}
// //                 </td>
// //                 <td className="px-4 py-2">{category.name}</td>
// //                 <td className="px-4 py-2">{category.description}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllCategory;
