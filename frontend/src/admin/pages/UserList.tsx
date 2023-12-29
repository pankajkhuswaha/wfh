import RenderTable from "@/lib/RenderTable";
import fetchApi from "@/lib/axios";
import { datatablecol, row } from "@/types/global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const UserList = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["updateRole"],
    mutationFn: (data: data) => fetchApi("PUT", `users/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const changeUserType =
    (id: string) => async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const role = e.target.value;
      const data = { id, role };
      try {
        await mutateAsync(data);
        toast.success("Role updated successfully !!");
      } catch (error) {
        toast.error("Error updating role !!");
      }
    };
  const columns: datatablecol[] = [
    {
      headerName: "Name",
      field: "fullName",
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "Mobile",
      field: "mobile",
    },
    {
      headerName: "Role",
      field: "role",
      renderCell: (row: row) => (
        <select
          className="bg-gray-50 border my-1 border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 "
          value={row?.role as string}
          onChange={changeUserType(row?._id as string)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
      ),
    },
  ];

  return (
    <>
      {isPending && <>Loading...</>}
      <RenderTable
        title={"User List"}
        route={"users"}
        cols={columns}
        selection
        deleteable
        keyToHide={["password", "cart"]}
      />
    </>
  );
};

export default UserList;
