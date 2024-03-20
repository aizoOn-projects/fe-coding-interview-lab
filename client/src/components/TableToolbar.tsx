import { Plus, Search, SearchIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "@/pages/HomePage";

const TableToolbar = () => {
  const { tasksData, setFilteredTasksData, setCurrentTaskData } =
    useContext(TasksContext);
  const [searchText, setSearchText] = useState("");

  const handleFilterTasks = () => {
    const searchValue = searchText.toLocaleLowerCase().trim();
    const newTasksData = tasksData.filter((task) =>
      JSON.stringify(task).trim().toLocaleLowerCase().includes(searchValue)
    );
    setFilteredTasksData(newTasksData);
  };

  useEffect(() => {
    if (tasksData?.length) {
      handleFilterTasks();
    }
  }, [tasksData]);

  return (
    <div className="flex flex-row space-x-2 relative">
      <Input
        placeholder="Search for a value (enter to confirm)"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="pl-12 relative"
        onKeyDown={(e) => (e.key === "Enter" ? handleFilterTasks() : null)}
      />
      <Button
        className="absolute -left-2 rounded-r-none"
        variant="outline"
        size="icon"
        onClick={() => setSearchText("")}
      >
        {searchText ? (
          <X className="w-4 h-4" />
        ) : (
          <SearchIcon className="w-4 h-4" />
        )}
      </Button>
      <Button variant={"outline"} onClick={handleFilterTasks}>
        Search <Search className="ml-2 w-4 h-4" />
      </Button>
      <Button
        variant={"default"}
        onClick={() => {
          setCurrentTaskData({
            id: Math.max(...tasksData.map((task) => task.id)) + 1,
            title: "",
            description: "",
            status: "new",
            priority: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }}
      >
        Add Task <Plus className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
};

export default TableToolbar;
