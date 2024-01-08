import  { useEffect, useState } from "react";

const useScrollView = (width: number) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > width) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [width]);

  return visible;
};

export default useScrollView;

export const scrolltoTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
