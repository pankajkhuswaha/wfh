import fetchApi from "@/lib/axios";
import Cards from "../components/DashCards";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
    const { data } = useQuery({
      queryKey: ["dashboard"],
      queryFn: () => fetchApi("GET", "clients/stats"),
    });
    console.log(data)
  return (
    <div className="flex flex-wrap justify-between p-4 gap-2">
      {data?.map((stat: data, i: number) => (
        <Cards
          key={i}
          to="/employee/client/clientList"
          title={stat.title as string}
          value={stat.value as number}
        />
      ))}
    </div>
  );
};

export default Dashboard;
