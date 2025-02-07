
import { Outlet } from "react-router";
import { DefaultSidebar } from "./Sidebar";

const Rootlayout = () => {
  return (
    <div className="flex gap-8">
      <DefaultSidebar />
      <Outlet />
    </div>
  );
};

export default Rootlayout;
