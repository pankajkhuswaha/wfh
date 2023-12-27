

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
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader className="z-[999]">
              <SheetDescription>
                <SidebarDesktop routes={routes}/>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </>
    );
  };
  
  export default SideBar;
  