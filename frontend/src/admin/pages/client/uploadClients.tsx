import BulkUpload from "@/admin/components/excel/BulkUpload";

const UploadClients = () => {
  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center w-full">
        <BulkUpload />
      </div>
    </>
  );
}

export default UploadClients