import { Square } from "./square";
import { Card, CardContent } from "./ui/card";
import { Circle } from "lucide-react";

export const Board = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card>
        <CardContent className="flex">
          <div>
            <Square content="2"/>
            <Square content={<Circle />}/>
          </div>
          <div>
            <Square content={<Circle />}/>
            <Square content="2"/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
