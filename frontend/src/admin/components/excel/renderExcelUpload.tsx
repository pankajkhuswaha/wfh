import { FileSpreadsheet } from "lucide-react";
import React, { useState } from "react";
import { BarLoader } from "react-spinners";
import "./excel.css";
import { Button } from "@/components/ui/button";
import { ExcelData } from "@/utils/excel";
import { readExcelFile } from "usereactable";
type ReadExcelProps = {
  setExcel: React.Dispatch<React.SetStateAction<ExcelData[] | null>>;
};

const ReadExcel = ({ setExcel }: ReadExcelProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setIsPending(true);

    if (file) {
      readExcelFile(file)
        .then((data) => {
          setExcel(data as ExcelData[]);
        })
        .catch((error) => {
          console.error("Error reading Excel file:", error);
        });
    }
    setIsPending(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-4 justify-center">
        <label className="custum-file-upload" htmlFor="file">
          <FileSpreadsheet color="#1d6f42" size={80} />
          <div className="text text-dark dark:text-white">
            <span>Click to upload excel </span>
          </div>
          <input
            id="file"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
        </label>
        <p className="text-center text-blue-400">
          Make sure before upload your excel file that your excel is written in
          right format. <br />
          if it not fomat in correct way it will not uplaoded !!
          <br /> Here is reference excel file download it and start uploading
        </p>

        <Button>
          <a href="/bulkproduct.xlsx" download className="btn btn-primary">
            Download Excel
          </a>
        </Button>

        {isPending && (
          <>
            <BarLoader color="#1d6f42" width={300} />
            Processing excel
          </>
        )}
      </div>
    </div>
  );
};

export default ReadExcel;
