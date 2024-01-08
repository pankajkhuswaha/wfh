import { BarChart4 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
type Props = {
  icon?: JSX.Element;
  value: number;
  title: string;
  to: string;
};
const Cards = ({ icon, value, title, to }: Props) => {
  return (
    <Card className="w-[48%] md:w-[300px] my-2">
      <Link to={to}>
        <CardContent>
          <div className="flex flex-col py-4 px-4 gap-4 items-center justify-center">
            <div className="flex flex- items-center justify-center gap-4">
              {icon || <BarChart4 size={40} />}
              <p className="text-4xl font-bold ">{value}</p>
            </div>
            <p className="text-center text-md md:text-2xl font-semibold">{title}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default Cards;
