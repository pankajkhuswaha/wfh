import { adminRoute, empRoute } from "./routes";
import DashLayout from "../components/dashLayout/DashboardLayout";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hook";
import { toast } from "react-toastify";

const AdminPannel = () => {
  const user = useAppSelector((st) => st.auth.user);
  const navigate = useNavigate();
  let route;
  if (user?.role == "admin") {
    route = adminRoute;
  } else if (user?.role == "employee") {
    route = empRoute;
  } else if (user?.role == "user") {
    toast.info("You are not authorized to access this page");
    navigate("/login");
  }
  return (
    <DashLayout routes={route || []}>
      <Routes>
        {route?.map((route, i) => {
          if (route.child) {
            return route.child.map((child, j) => (
              <Route
                key={j}
                path={child.Link?.replace(`/${user?.role}`, "")}
                element={child.element}
              />
            ));
          } else {
            return (
              <Route
                key={i}
                path={route.Link?.replace(`/${user?.role}`, "")}
                element={route.element}
              />
            );
          }
        })}
      </Routes>
    </DashLayout>
  );
};

export default AdminPannel;
