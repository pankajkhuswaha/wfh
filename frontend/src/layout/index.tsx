import Header from "./Header";

const LayOut = ({ children }: ChildProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default LayOut;
