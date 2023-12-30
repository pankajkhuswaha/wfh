"use client";
import { useAppSelector } from "@/app/hook";
import RenderTable from "@/lib/RenderTable";
import { data, datatablecol } from "@/types/global";
import { BookOpenCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RemarksList from "./viewRemark";
import { useState } from "react";

const ClientList = () => {
  const [remark, setremark] = useState<data[]|null>(null);

  const columns: datatablecol[] = [
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Mobile",
      field: "mobile",
    },
    {
      headerName: "Remark",
      field: "mobile",
      renderCell: (params) => {
        return <BookOpenCheck onClick={()=>setremark(params.remarks as data[])} />;
      },
    },
  ];
  const user = useAppSelector((st) => st.auth.user);
  const navigate = useNavigate();
  const edit = (data: data) => {
    navigate(`/employee/client/${data._id}`, { state: data });
  };
  return (
    <>
      <RemarksList setremark={setremark} remarks={remark} />
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
