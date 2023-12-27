import { useAppSelector } from "@/app/hook";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";

const Login = () => {
  const user = useAppSelector((st) => st.auth.user);
  const logOut = async () => {
    try {
      const res = await fetchApi("GET", "/api/users/logout");
      toast.success(res.message);
    } catch (error) {
      toast.error("Error in LogOut");
    }
  };
  return (
    <div>
      {user ? (
        <div className="flex gap-4 items-center">
        <p>Hi {user.fullName} !!</p>
        <Button onClick={logOut} variant="destructive">
          LogOut
        </Button>
        </div>
      ) : (
        <Button>
          <Link
            to={"/login"}
          >
            Login
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Login;
