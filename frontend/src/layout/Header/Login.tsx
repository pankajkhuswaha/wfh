import { useAppSelector } from "@/app/hook";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const Login = () => {
  const user = useAppSelector((st) => st.auth.user);
  const logOut = () => {
    localStorage.removeItem("token");
    toast.success("Log Out Sucessfully");
    window.location.href = "/login";
  };
  return (
    <div>
      {user ? (
        <div className="flex gap-4 items-center">
          <p className="hidden md:block whitespace-nowrap">
            Hi {user.fullName} !!
          </p>
          <Button size={"sm"} onClick={logOut} variant="destructive">
            LogOut
          </Button>
        </div>
      ) : (
        <Button size={"sm"}>
          <Link to={"/login"}>Login</Link>
        </Button>
      )}
    </div>
  );
};

export default Login;
