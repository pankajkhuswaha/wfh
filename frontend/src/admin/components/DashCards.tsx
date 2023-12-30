import { BarChart4 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
type Props = {
  icon?: JSX.Element;
  value: number;
  title: string;
  to: string;
};
const Cards = ({ icon, value, title, to }: Props) => {
  return (
    <Card className="w-[49%] md:w-[300px]">
      <Link to={to}>
        <CardContent>
          <div className="flex flex-col py-4 px-4 gap-4 mx-auto items-center">
            {icon || <BarChart4 size={40} />}
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-4xl font-bold ">{value}</p>
              <CardTitle>{title}</CardTitle>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default Cards;
