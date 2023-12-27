
import SideBar from "./sidebar";
import SidebarDesktop from "./SidebarDesktop";
import { ChildrenProps } from "@/types/global";
import { Sidebardata } from "../../admin/_data";
interface DashoardLayoutProp extends ChildrenProps {
  routes: Sidebardata[];
}
const DashLayout = ({ children, routes }: DashoardLayoutProp) => {
  return (
    <div>
      <div className="md:flex md:flex-row gap-4">
        <div className="flex-[2] px-2">
          <div className="block md:hidden">
            <SideBar routes={routes} />
          </div>

          <div className="hidden md:block">
            <SidebarDesktop routes={routes} />
          </div>
        </div>

        <div className="flex-[8]">{children}</div>
      </div>
    </div>
  );
};

export default DashLayout;
