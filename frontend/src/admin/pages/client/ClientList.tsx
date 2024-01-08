import { useAppSelector } from "@/app/hook";
import RenderTable from "@/lib/RenderTable";
import { data, datatablecol } from "@/types/global";
import { BookOpenCheck, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RemarksList from "./viewRemark";
import { useState } from "react";
import whatsapp from "../../../assets/whatsapp.svg";

const ClientList = () => {
  const [remark, setremark] = useState<data[] | null>(null);

  const columns: datatablecol[] = [
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Mobile",
      field: "mobile",
      style:{
        minWidth:100
      },
      renderCell: (params) => {
        const mobile = params.mobile as number;
        return (
          <div className="flex gap-4">
            <a target="blank" href={`https://wa.me/${mobile}`}>
              <img src={whatsapp} width={"30px"} alt="" />
            </a>
            <a href={`tel:${mobile}`} className="ml-4">
              <Phone />
            </a>
          </div>
        );
      },
    },
    {
      headerName: "Remark",
      field: "mobile",
      renderCell: (params) => {
        return (
          <BookOpenCheck onClick={() => setremark(params.remarks as data[])} />
        );
      },
    },
  ];
  const user = useAppSelector((st) => st.auth.user);
  const navigate = useNavigate();
  const edit = (data: data) => {
    navigate(`/employee/client/${data._id}`, { state: data });
  };
  const isAdmin = user && user.role == "admin";
  return (
    <>
      <RemarksList setremark={setremark} remarks={remark} />
      <RenderTable
        title={"Client List"}
        route={"clients"}
        cols={columns}
        handleEdit={!isAdmin?edit:undefined}
        selection={isAdmin ? true : false}
        deleteable={isAdmin ? true : false}
        keyToHide={["password", "cart", "empId"]}
      />
    </>
  );
};

export default ClientList;
