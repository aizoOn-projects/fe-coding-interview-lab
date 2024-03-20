// import TableToolbar from "@/components/TableToolbar";
import Tasks from "./Tasks";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  return (
    <div className="p-5 space-y-4 h-full flex flex-col container">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-extralight">
          Interview Project - Task Management
        </h1>
      </div>
      <Tasks />
      <div className="flex space-x-4 items-center">
        <div className="flex w-full items-end space-x-4">
          <a className="text-xs font-light" href="https://www.aizoongroup.com/">
            <img src="/logo.png" width={"108px"} />
            aizoongroup.com
          </a>
        </div>
        <div className="flex space-x-1 items-center">
          <span className="text-xs font-light">version </span>
          <Badge variant={"secondary"}>{APP_VERSION}</Badge>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
