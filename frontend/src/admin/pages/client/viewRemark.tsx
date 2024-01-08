import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Datatable from "usereactable";

type Props = {
  remarks: data[] | null;
  setremark: React.Dispatch<React.SetStateAction<data[] | null>>;
};
const RemarksList = ({ remarks, setremark }: Props) => {
  const cloumns: datatablecol[] = [
    {
      headerName: "Remark",
      field: "val",
    },
    {
      headerName: "Remark",
      field: "val",
      renderCell: (params) => {
        return new Date(params.time as string).toLocaleString();
      },
    },
  ];
  if (remarks == null) {
    return;
  }

  return (
    <AnimatePresence>
      <motion.div
        onClick={() => {
          setremark(null);
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        whileTap={{ y: "-100vh" }}
        className="absolute cursor-pointer w-full min-h-screen overflow-hidden h-full top-0 left-0 z-[99] bg-[#0a0a0a8c] dark:bg-[#fffcfc49] "
      ></motion.div>
      <motion.div
        initial={{ scale: 0, y: -100 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="z-[100] w-full left-0 top-20 absolute p-4 flex items-center justify-center"
      >
        <X
          onClick={() => {
            setremark(null);
          }}
          size={40}
          className="border border-red-500 bg-red-600 transition-all cursor-pointer absolute -top-8 right-10 p-2 rounded-full text-4xl"
        />
        <Datatable
          searchAble={false}
          title="Remarks"
          className="bg-white dark:bg-gray-900 p-4 rounded w-full md:w-[90%]"
          columns={cloumns}
          rows={remarks}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default RemarksList;
