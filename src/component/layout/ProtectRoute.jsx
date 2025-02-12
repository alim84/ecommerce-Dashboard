import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Cookies from "js-cookie";

const ProtectRoute = () => {
  const navigate = useNavigate();
  const user = Cookies.get("user");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  console.log(user);
  return <>{user ? <Outlet /> : navigate("/login")}</>;
};

export default ProtectRoute;
