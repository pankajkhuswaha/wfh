import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { cn } from "@/lib/utils";
  import { SidebarRouteProps } from "@/types/global";
import { Link } from "react-router-dom";
  
  const SidebarDesktop = ({ routes }: { routes: SidebarRouteProps[] }) => {
    
    return (
      <>
        <Accordion type="multiple">
          {routes.map((ele, id) => {
            return (
              <AccordionItem key={id} value={ele.name}>
                <AccordionTrigger
                  className={cn(" no-underline hover:no-underline")}
                >
                  <Link to={`${ele?.Link}`} className="flex gap-4 items-center">
                    {ele.logo}
                    {ele.name}
                  </Link>
                </AccordionTrigger>
                {ele.child && (
                  <AccordionContent>
                    {ele.child.map((ele, id) => {
                      return (
                        <Link
                          to={`${ele?.Link}`}
                          key={id}
                          className={` ${id !== 0 ? "mt-4" : ""}  flex gap-4`}
                        >
                          {ele.logo}
                          {ele.name}
                        </Link>
                      );
                    })}
                  </AccordionContent>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </>
    );
  };
  
  export default SidebarDesktop;
  