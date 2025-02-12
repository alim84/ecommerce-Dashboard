import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Rootlayout from "./component/layout/Rootlayout";
import Addproduct from "./pages/Addproduct";
import { Allproduct } from "./pages/Allproduct";
import AddCategory from "./pages/AddCategory";
import AllCategory from "./pages/AllCategory";
import ProtectRoute from "./component/layout/ProtectRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rootlayout />}>

        <Route element={<ProtectRoute/>}>

          <Route index element={<Home />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/allproduct" element={<Allproduct />} />
          <Route path="/allcategory" element={<AllCategory />} />
        </Route>

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
