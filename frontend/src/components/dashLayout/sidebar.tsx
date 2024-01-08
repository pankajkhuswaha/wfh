

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
  } from "@/components/ui/sheet";
  
  import { Menu } from "lucide-react";
  import { SidebarRouteProps } from "@/types/global";
  import SidebarDesktop from "./SidebarDesktop";
  
  const SideBar = ({ routes}: { routes: SidebarRouteProps[]}) => {
    return (
      <>
        <Sheet>
          <div className="fixed top-5 left-2 z-[9]">
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
          </div>
          <SheetContent side={"left"}>
            <SheetHeader className="z-[999]">
              <SheetDescription>
                <SidebarDesktop routes={routes} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </>
    );
  };
  
  export default SideBar;
  