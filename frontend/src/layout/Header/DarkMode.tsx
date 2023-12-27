



import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const DarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const switchTheme = () => {
    setIsDark((prevIsDark) => {
      const newIsDark = !prevIsDark;
      document.documentElement.classList.toggle("dark", newIsDark);
      document.documentElement.classList.toggle("light", !newIsDark);
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
      return newIsDark;
    });
  };

  return (
    <div
      className={cn("p-2", "rounded-full", "cursor-pointer", "bg-white", isDark && "dark:bg-gray-800")}
      onClick={switchTheme}
    >
      {isDark ? <Moon /> : <Sun />}
    </div>
  );
};

export default DarkMode;
