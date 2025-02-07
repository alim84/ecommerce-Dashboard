import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Rootlayout from "./component/layout/Rootlayout";
import Addproduct from "./pages/Addproduct";
import { Allproduct } from "./pages/Allproduct";
import AddCategory from "./pages/AddCategory";
import AllCategory from "./pages/AllCategory";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rootlayout />}>
          <Route index element={<Home />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/allproduct" element={<Allproduct />} />
          <Route path="/allcategory" element={<AllCategory />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
