import useScrollView from "@/lib/useScrollView";
import { Link, useLocation } from "react-router-dom";

import DarkMode from "./DarkMode";

import Login from "./Login";
import { useAppSelector } from "@/app/hook";

const Header = () => {
  const visible = useScrollView(60);
  const { pathname } = useLocation();
  const user = useAppSelector((st) => st.auth.user);

  const is = ["/admin", "/employee"].some((val) => pathname.includes(val));
  return (
    <header
      className={`w-full flex-center relative bg-gray-200 dark:bg-gray-950 z-[9] ${
        visible && "sticky top-0 z-10"
      }   `}
    >
      <div className="md:container">
        <div className="flex items-center h-[60px] justify-between">
          <Link
            to={`/${user?.role}`}
            className={`${is ? "ml-12 md:ml-0" : ""} text-xl font-bold`}
          >
            <span className="text-primary">
              <i className="fa-solid fa-code"></i>
            </span>
            <span className="whitespace-nowrap">
              Work From <span className="text-blue-500">Home</span>
            </span>
          </Link>
          <div className="flex gap-4">
            <Login />
            <DarkMode />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
