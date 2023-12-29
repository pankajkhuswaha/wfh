import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-full bg-[#302e2e2f] absolute z-[999] flex justify-center items-center">
      <Loader
        size={60}
        color="white"
        className="animate-spin"
        strokeWidth={1}
      />
    </div>
  );
};

export default Loading;
