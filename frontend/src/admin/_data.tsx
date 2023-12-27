import {
  BarChart4,
  CircleUser,
  MonitorUp,
  GanttChartSquare,
} from "lucide-react";

export interface Sidebardata {
  name: string;
  logo: JSX.Element;
  Link?: string;
  child?: Sidebardata[];
}

export const adminRoute: Sidebardata[] = [
  {
    name: "DashBoard",
    logo: <BarChart4 />,
    Link: "/admin",
  },
  {
    name: "User",
    logo: <CircleUser />,
    Link: "/admin/userlist",
  },
  {
    name: "Clients",
    logo: <GanttChartSquare />,
    Link: "/admin/client/clientList",
    child: [
      {
        name: "Clients List",
        logo: <GanttChartSquare />,
        Link: "/admin/client/clientList",
      },
      {
        name: "Upload Data",
        logo: <MonitorUp />,
        Link: "/admin/client/uploadata",
      },
    ],
  },
];
