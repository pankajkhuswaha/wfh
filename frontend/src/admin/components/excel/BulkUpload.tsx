import { useMutation } from "@tanstack/react-query";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import fetchApi from "@/lib/axios";
import { datatablecol } from "@/types/global";
import { useState } from "react";
import Datatable, { downloadExcel } from "usereactable";
import ReadExcel from "./renderExcelUpload";
import { toast } from "react-toastify";
import { ExcelData } from "@/utils/excel";

const columns: datatablecol[] = [
  {
    headerName: "name",
    field: "name",
  },
  {
    headerName: "Mobile",
    field: "mobile",
  },
  {
    headerName: "EmployeeId",
    field: "empId",
  },
];
const BulkUpload = () => {
  const [excelData, setExcelData] = useState<ExcelData[] | null>(null);

  const {
    isPending,
    mutateAsync: uploadExcelData,
    data,
  } = useMutation({
    mutationKey: ["client", "upload"],
    mutationFn: () => fetchApi("POST", "clients", { excelData }),
  });

  const handleUpload = async () => {
    try {
      await uploadExcelData();
      toast.success("Data's has been successfully uploaded !!");
      setExcelData(null);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <>
      <h1 className="text-2xl font-semibold text-center mb-4 w-full">
        Upload User data in bulk using Excel file
      </h1>
      <ReadExcel setExcel={setExcelData} />
      {isPending && <BarLoader color="#0099ff" />}
      <div className="flex relative flex-col w-full mt-4 items-center gap-4 justify-center">
        {excelData && (
          <>
            <Datatable
              columns={columns}
              rows={excelData}
              pagination
              tableheadstyle={{
                color: "#0099ff",
              }}
              searchAble
              className="w-full mt-4"
              title={"Fetched Data's from Excel"}
            />
            <p className="text-red-600 w-full text-sm mt-2">
              ** This is fetched user data from your excelsheet.
            </p>
            <Button
              onClick={handleUpload}
              variant="destructive"
              className=" mt-3 absolute -top-2 right-4"
            >
              Confirm Upload
            </Button>
          </>
        )}
        {data?.faultyData && (
          <>
            {data?.insertedCount > 1 && (
              <p className="text-green-600">
                {data?.insertedCount} {`user's`} data is Uploaded sucessfully.
              </p>
            )}
            <p className="text-red-600">
              There is {data?.faultyData.length} invalid data in excel !!
            </p>
            <Button
              onClick={() => downloadExcel(data.faultyData!, "InavlidUserData")}
            >
              Download Invalid Data
            </Button>
            {/* <Datatable
              columns={columns}
              rows={data.faultyData}
              pagination
              tableheadstyle={{
                color: "#0099ff",
              }}
              searchAble
              className="w-full"
              title={"Invalid Data's from Excel"}
            /> */}
          </>
        )}
      </div>
    </>
  );
};

export default BulkUpload;
