

import useScrollView from "@/lib/useScrollView";
import { Link } from "react-router-dom";

import DarkMode from "./DarkMode";

import Login from "./Login";

const Header = () => {
  const visible = useScrollView(60);

  return (
    <header
      className={`w-full flex-center relative border-b-[1px] bg-gray-100 dark:bg-gray-950 z-[9] ${
        visible && "sticky top-0 z-10"
      }   `}
    >
      <div className="container px-3 py-1">
        <div className="flex items-center justify-between py-4">
          <Link to={"/"} className="text-xl font-bold ">
            <span className="text-primary">
              <i className="fa-solid fa-code"></i>
            </span>
            <span className="">
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


