import {
  BarChart4,
  CircleUser,
  MonitorUp,
  GanttChartSquare,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import ClientList from "./pages/client/ClientList";
import UploadClients from "./pages/client/uploadClients";
import AddClient from "./pages/client/AddClient";

export interface Sidebardata {
  name: string;
  logo: JSX.Element;
  Link?: string;
  child?: Sidebardata[];
  element?: React.ReactNode;
  hide?: boolean;
}

export const adminRoute: Sidebardata[] = [
  {
    name: "DashBoard",
    logo: <BarChart4 />,
    Link: "/admin",
    element: <Dashboard />,
  },
  {
    name: "User",
    logo: <CircleUser />,
    Link: "/admin/userlist",
    element: <UserList />,
  },

  {
    name: "Clients",
    logo: <GanttChartSquare />,
    Link: "/admin/client/clientList",
    element: <ClientList />,
    child: [
      {
        name: "Clients List",
        logo: <GanttChartSquare />,
        Link: "/admin/client/clientList",
        element: <ClientList />,
      },
      {
        name: "Upload Data",
        logo: <MonitorUp />,
        Link: "/admin/client/upload",
        element: <UploadClients />,
      },
    ],
  },
];
export const empRoute: Sidebardata[] = [
  {
    name: "DashBoard",
    logo: <BarChart4 />,
    Link: "/employee",
    element: <Dashboard />,
  },
  {
    name: "Clients",
    logo: <GanttChartSquare />,
    Link: "/employee/client/clientList",
    element: <ClientList />,
  },
  {
    name: "update Client",
    logo: <MonitorUp />,
    Link: "/employee/client/:_id",
    element: <AddClient />,
    hide: true,
  },

  // {
  //   name: "Clients",
  //   logo: <GanttChartSquare />,
  //   Link: "/employee/client/clientList",
  //   element: <ClientList />,
  //   child: [
  //     {
  //       name: "Clients List",
  //       logo: <GanttChartSquare />,
  //       Link: "/employee/client/clientList",
  //       element: <ClientList />,
  //     },
  //     {
  //       name: "Add Client",
  //       logo: <MonitorUp />,
  //       Link: "/employee/client/:_id",
  //       element: <AddClient />,
  //       hide: true,
  //     },
  //   ],
  // },
];
