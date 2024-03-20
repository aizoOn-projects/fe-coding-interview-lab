import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useContext, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { Task } from "./Tasks";
import { TasksContext } from "./HomePage";

const DashboardSection = () => {
  const { tasksData } = useContext(TasksContext);

  const chart1Data = useMemo(
    () =>
      tasksData.reduce(
        (acc: { [key: string]: number }, curr: Task) => {
          acc[curr.status] += 1;

          return acc;
        },
        {
          new: 0,
          "in progress": 0,
          pending: 0,
          completed: 0,
        }
      ),
    [tasksData.length]
  );

  const chart2Data = useMemo(
    () =>
      tasksData.reduce((acc: { [key: string]: number }, curr: Task) => {
        if (acc[curr.updatedAt as string]) {
          acc[curr.updatedAt as string] += 1;
        } else {
          acc[curr.updatedAt as string] = 1;
        }

        return acc;
      }, {}),
    [tasksData.length]
  );

  return (
    <div className="h-[16rem] flex space-x-4">
      <Card className="w-full h-full flex flex-col">
        <CardHeader>
          <CardDescription>Tasks priority distribution</CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          <ReactECharts
            option={{
              xAxis: {
                type: "category",
                data: ["new", "in progress", "pending", "completed"],
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: Object.values(chart1Data),
                  type: "bar",
                },
              ],
            }}
            notMerge={true}
            lazyUpdate={true}
            style={{
              height: "264px",
              width: "100%",
              marginTop: "-48px",
            }}
          />
        </CardContent>
      </Card>
      <Card className="w-full h-full flex flex-col">
        <CardHeader>
          <CardDescription>Tasks creation date distribution</CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          <ReactECharts
            option={{
              xAxis: {
                type: "category",
                data: Object.keys(chart2Data),
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: Object.values(chart2Data),
                  type: "line",
                },
              ],
            }}
            notMerge={true}
            lazyUpdate={true}
            style={{
              height: "264px",
              width: "100%",
              marginTop: "-48px",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSection;
