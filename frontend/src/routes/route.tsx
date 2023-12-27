import AdminLayout from "@/components/dashLayout/DashbordLayout";
import Signup from "../auth/signUp";
import Login from "./../auth/login";
import AdminPannel from "@/admin/AdminPannel";
const AppRoute: RouteProps[] = [
  {
    name: "Home",
    path: "/",
  },

  {
    name: "SignUp",
    path: "/signup",
    element: <Signup />,
  },

  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Not Found",
    path: "/*",
    // element: <NotFound />,
  },
  {
    name: "AdminPannel",
    path: "/admin/*",
    element: <AdminPannel />,
  },
];

export default AppRoute;
