import getMockTasks from "@/api/getMockTasks";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Edit,
  Frown,
  Trash,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import PageSkeleton from "@/components/PageSkeleton";
import TableToolbar from "@/components/TableToolbar";
import TaskDialog from "@/components/TaskDialog";
import { TasksContext } from "./HomePage";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: "new" | "in progress" | "pending" | "complete";
  priority: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

type ActionType = "string" | "number" | "date";
type SortType = {
  property: string;
  direction: "asc" | "desc";
};

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full overflow-y-auto relative border rounded-md p-4">
      {children}
    </div>
  );
};

const HeaderAction = ({
  title,
  property,
  callback,
  activeSort,
}: {
  title: string;
  property: string;
  callback: () => void;
  activeSort: SortType;
}) => {
  return (
    <TableHead>
      <Button
        variant={"ghost"}
        onClick={callback}
        className={activeSort.property === property ? "text-blue-600" : ""}
      >
        {title}
        {activeSort.property === property && activeSort.direction === "desc" ? (
          <ArrowDownNarrowWide className="ml-2 w-4 h-4" />
        ) : activeSort.property === property ? (
          <ArrowUpNarrowWide className="ml-2 w-4 h-4" />
        ) : null}
      </Button>
    </TableHead>
  );
};

const Tasks = () => {
  const { theme } = useTheme();
  const {
    tasksData,
    setTasksData,
    setCurrentTaskData,
    filteredTasksData,
    setFilteredTasksData,
  } = useContext(TasksContext);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [activeSort, setActiveSort] = useState<SortType>({
    property: "id",
    direction: "asc",
  });

  const tableColumnsDefinition = [
    { property: "id", title: "#", actionType: "number" },
    { property: "title", title: "Title", actionType: "string" },
    { property: "description", title: "Description", actionType: "string" },
    { property: "status", title: "Status", actionType: "string" },
    { property: "priority", title: "Priority", actionType: "number" },
    { property: "createdAt", title: "Created At", actionType: "date" },
    { property: "updatedAt", title: "Updated At", actionType: "date" },
  ];

  const getTableRowColor = (status: string) => {
    switch (status) {
      case "new":
        return theme === "light" ? "bg-gray-300" : "bg-gray-600";
      case "in progress":
        return theme === "light" ? "bg-blue-300" : "bg-blue-900";
      case "completed":
        return theme === "light" ? "bg-green-300" : "bg-green-900";
      case "pending":
        return theme === "light" ? "bg-yellow-300" : "bg-yellow-900";
      default:
        return "";
    }
  };

  const handleSubmit = (newTaskData: Task) => {
    if (tasksData.find((t) => t.id === newTaskData.id)) {
      setTasksData((old): Task[] =>
        old?.map(
          (task): Task => (task.id === newTaskData.id ? newTaskData : task)
        )
      );
    } else {
      setTasksData((old): Task[] => [...old, newTaskData]);
    }
  };

  const handleDelete = (id: number) => {
    setTasksData((old): Task[] => old.filter((task) => task.id !== id));
  };

  const sortTasksActions = (actionType: ActionType, property: keyof Task) => {
    const dataToSort = [...tasksData];

    switch (actionType) {
      case "string":
        setTasksData(() =>
          dataToSort.sort((a: Task, b: Task) =>
            activeSort.direction === "asc"
              ? (a[property] as string).localeCompare(b[property] as string)
              : (b[property] as string).localeCompare(a[property] as string)
          )
        );
        break;
      case "number":
        setTasksData(() =>
          dataToSort.sort(
            activeSort.direction === "asc"
              ? (a: Task, b: Task) =>
                  (a[property] as number) - (b[property] as number)
              : (a: Task, b: Task) =>
                  (b[property] as number) - (a[property] as number)
          )
        );
        break;
      case "date":
        setTasksData(() =>
          dataToSort.sort((a: Task, b: Task) =>
            activeSort.direction === "asc"
              ? new Date(a[property] as string).getTime() -
                new Date(b[property] as string).getTime()
              : new Date(b[property] as string).getTime() -
                new Date(a[property] as string).getTime()
          )
        );
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    setIsFetchingData(true);
    getMockTasks().then((data) => {
      setTasksData(data);
      setFilteredTasksData(data);
      setIsFetchingData(false);
    });
  }, []);

  if (isFetchingData && !tasksData.length) {
    return (
      <PageContainer>
        <PageSkeleton />
      </PageContainer>
    );
  }

  if (!isFetchingData && !tasksData.length) {
    return (
      <PageContainer>
        <div className="flex items-center">
          <Frown className="w-6 h-6 mr-2" />
          No data available
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Table>
        <TableCaption>Tasks</TableCaption>
        <TableHeader>
          <TableRow>
            {tableColumnsDefinition.map((column) => (
              <HeaderAction
                key={column.title}
                title={column.title}
                property={column.property}
                callback={() => {
                  sortTasksActions(
                    column.actionType as ActionType,
                    column.property as keyof Task
                  );
                  setActiveSort(
                    (old): SortType => ({
                      property: column.property,
                      direction: old.direction === "asc" ? "desc" : "asc",
                    })
                  );
                }}
                activeSort={activeSort}
              />
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasksData?.map((task: Task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Badge
                  className={`whitespace-nowrap text-primary ${getTableRowColor(
                    task.status
                  )} hover:${getTableRowColor(task.status)}`}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                {new Date(task.createdAt).toLocaleDateString("it-IT")}
              </TableCell>
              <TableCell>
                {new Date(task.updatedAt).toLocaleDateString("it-IT")}
              </TableCell>
              <TableCell className="space-x-2 flex">
                <Button
                  variant={"secondary"}
                  size="icon"
                  onClick={() => {
                    setCurrentTaskData(task);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant={"secondary"}
                  size="icon"
                  onClick={() => handleDelete(task.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Tasks </TableCell>
            <TableCell className="text-right" colSpan={5}>
              {filteredTasksData.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <TaskDialog handleSubmit={handleSubmit} />
    </PageContainer>
  );
};

export default Tasks;
