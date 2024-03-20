import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { Task } from "./Tasks";

const DashboardSection = () => {
  const tasksData: Task[] = [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      status: "new",
      priority: "High",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      status: "in progress",
      priority: "Medium",
      createdAt: "2022-01-02",
      updatedAt: "2022-01-02",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description 3",
      status: "pending",
      priority: "Low",
      createdAt: "2022-01-03",
      updatedAt: "2022-01-03",
    },
    {
      id: 4,
      title: "Task 4",
      description: "Description 4",
      status: "complete",
      priority: "High",
      createdAt: "2022-01-04",
      updatedAt: "2022-01-04",
    },
    {
      id: 5,
      title: "Task 5",
      description: "Description 5",
      status: "new",
      priority: "Medium",
      createdAt: "2022-01-05",
      updatedAt: "2022-01-05",
    },
    {
      id: 6,
      title: "Task 6",
      description: "Description 6",
      status: "in progress",
      priority: "Low",
      createdAt: "2022-01-06",
      updatedAt: "2022-01-06",
    },
    {
      id: 7,
      title: "Task 7",
      description: "Description 7",
      status: "pending",
      priority: "High",
      createdAt: "2022-01-07",
      updatedAt: "2022-01-07",
    },
    {
      id: 8,
      title: "Task 8",
      description: "Description 8",
      status: "complete",
      priority: "Medium",
      createdAt: "2022-01-08",
      updatedAt: "2022-01-08",
    },
  ];
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
