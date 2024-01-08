import { Sidebardata } from "@/admin/routes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const SidebarDesktop = ({ routes }: { routes: Sidebardata[] }) => {
  return (
    <>
      {routes.map((ele, id) => {
        if(ele.hide){
          return
        }

        if (ele.child) {
          return (
            <Accordion key={id} type="multiple">
              <AccordionItem value={ele.name}>
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
            </Accordion>
          );
        }else{
          return (
            <Link
              key={id}
              to={`${ele?.Link}`}
              className="flex gap-4 items-center border-b py-4"
            >
              {ele.logo}
              {ele.name}
            </Link>
          );
        }
      })}
    </>
  );
};

export default SidebarDesktop;
