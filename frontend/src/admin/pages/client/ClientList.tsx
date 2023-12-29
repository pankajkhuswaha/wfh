"use client";
import { useAppSelector } from "@/app/hook";
import RenderTable from "@/lib/RenderTable";
import { data, datatablecol } from "@/types/global";
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const columns: datatablecol[] = [
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Mobile",
      field: "mobile",
    },
  ];
  const user = useAppSelector((st) => st.auth.user);
  const navigate = useNavigate();
  const edit = (data: data) => {
    navigate(`/employee/client/${data._id}`);
  };
  return (
    <>
      <RenderTable
        title={"Client List"}
        route={"clients"}
        cols={columns}
        handleEdit={edit}
        selection={user && user.role == "admin" ? true : false}
        deleteable={user && user.role == "admin" ? true : false}
        keyToHide={["password", "cart", "empId"]}
      />
    </>
  );
};

export default ClientList;
