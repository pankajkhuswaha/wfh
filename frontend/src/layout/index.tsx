
import Header from "./Header/Header";
const LayOut = ({ children }: ChildProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default LayOut;
