import Header from "./Header/Header";
const LayOut = ({ children }: ChildProps) => {

  return (
    <div className="w-full min-h-screen dark:text-white text-black bg-gray-100 dark:bg-[#0A0A0A]">
      <Header />
      {children}
    </div>
  );
};

export default LayOut;
