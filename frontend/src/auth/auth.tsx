import { useAppDispatch } from "@/app/hook";
import Loading from "@/components/Loader";
import { addUserToStore } from "@/features/userSlice";
import fetchApi from "@/lib/axios";
import { useQueries } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [{ data: user, isLoading }] = useQueries({
    queries: [
      {
        queryKey: ["profile"],
        queryFn: async () => await fetchApi("GET", "users/profile"),
        retry: false,
      },
    ],
  });
  if (isLoading) {
    return <Loading />;
  }

  if (pathname === "/login" || pathname === "/signup") {
    return;
  }
  if (!user && !isLoading) {
    window.location.href = "/login";
  }
  if (user) {
    dispatch(addUserToStore(user));
  }
};

export default Auth;
