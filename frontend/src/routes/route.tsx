import Signup from "../auth/signUp";
import Login from "./../auth/login";
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
    // element: <About />,
  },
];

export default AppRoute;
