import Datatable from "usereactable";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchApi from "./axios";
import swal from "sweetalert";
import { useAppSelector } from "../app/hook";

type props = {
  cols: datatablecol[];
  route: string;
  title: string;
  deleteable?: boolean;
  selection?: boolean;
  keyToHide?: string[];
  handleEdit?: (row: data) => void;
};

const RenderTable = (props: props) => {
  const { cols, route, title, deleteable, selection, keyToHide, handleEdit } =
    props;
  const queryClient = useQueryClient();

  // * Fetching the data from database
  const { data, isLoading } = useQuery({
    queryKey: [route],
    queryFn: () => fetchApi("GET", route),
  });

  // * mutation of deleting the single row from table
  const {
    mutateAsync: deleteRow,
    isPending: deleting,
    data: deleteData,
    error: deleteError,
  } = useMutation({
    mutationKey: [route],
    mutationFn: (id: string) => fetchApi("DELETE", `${route}/${id}`),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route] });
    },
  });

  //* Funtion to delete row
  const delRow = async (id: string) => {
    const sure = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want delete this data's?",
      icon: "warning",
      dangerMode: true,
    });
    if (sure) {
      try {
        await deleteRow(id);
        swal("Deleted!", deleteData.message, "success");
      } catch (error) {
        deleteError && toast.error("Error deleting Row !!");
      }
    }
  };

  // * mutation of deleting the multiple row's from table

  const {
    mutateAsync: bulkDelete,
    isPending: pending,
    data: bulkDeleteData,
    error: bulkError,
  } = useMutation({
    mutationKey: [route, "bulk"],
    mutationFn: (ids: string[]) => fetchApi("DELETE", route, { ids }),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route] });
    },
  });

  //* function to delete multiple row's
  const handleBulkDelete = async (selectedRow: row[]) => {
    const sure = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want delete these data's?",
      icon: "warning",
      dangerMode: true,
    });
    if (sure) {
      const ids: string[] = selectedRow.map((row) => row._id as string);
      try {
        await bulkDelete(ids);
        swal("Deleted!", bulkDeleteData.message, "success");
      } catch (error) {
        bulkError && toast.error("Error deleting Row's !!");
      }
    }
  };

  //* Keys to hide from view in table view button
  const hideKey = [
    "__v",
    "_id",
    "refreshToken",
    "createdAt",
    "updatedAt",
    "super",
    "isBlocked",
    "order",
    "address",
  ];
  const user = useAppSelector((st) => st.auth.user);

  return (
    <>
      {deleting && pending && isLoading && <>Loading...</>}
      {data && (
        <Datatable
          rows={data ? [...data].reverse() || [] : []}
          actionButtons
          columns={cols}
          pagination
          tableheadstyle={{ color: "gray" }}
          onDeleteBtnClick={
            deleteable && ((row: row) => delRow(row?._id as string))
          }
          title={title}
          selection={selection && selection}
          onSelectionDelete={
            selection
              ? (selectedRow) => handleBulkDelete(selectedRow)
              : undefined
          }
          onEditBtnClick={handleEdit && handleEdit}
          excelDownload={user && user.role == "admin" ? true : false}
          removefromExcel={hideKey}
          keysToExcludeFromView={
            keyToHide ? [...keyToHide, ...hideKey] : hideKey
          }
        />
      )}
    </>
  );
};

export default RenderTable;
