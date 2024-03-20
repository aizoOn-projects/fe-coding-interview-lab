import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "@/pages/Tasks";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useContext, useEffect, useState } from "react";
import { TasksContext } from "@/pages/HomePage";

const TaskDialog = ({
  handleSubmit,
}: {
  handleSubmit: (task: Task) => void;
}) => {
  const { currentTaskData, setCurrentTaskData } = useContext(TasksContext);
  const [formData, setFormData] = useState(currentTaskData);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement> | string | number,
    property: string
  ) => {
    const newValue =
      typeof e === "string" || typeof e === "number" ? e : e.target.value;
    setFormData(
      (old): Task => ({ ...old!, [property as keyof Task]: newValue })
    );
  };

  useEffect(() => {
    setFormData(currentTaskData);
  }, [currentTaskData]);

  return (
    <Dialog open={!!currentTaskData}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to the task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              defaultValue={currentTaskData?.title}
              className="col-span-3"
              value={formData?.title}
              onChange={(e) => handleFormChange(e, "title")}
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              defaultValue={formData?.description}
              className="col-span-3"
              onChange={(e) => handleFormChange(e, "description")}
            />
          </div>

          {/* Priority */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <div className="w-full">
              <Select
                defaultValue={currentTaskData?.priority.toString()}
                onValueChange={(e) => handleFormChange(parseInt(e), "priority")}
              >
                <SelectTrigger className="w-[278px]">
                  <SelectValue
                    placeholder="Select Priority"
                    defaultValue={formData?.priority}
                  />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((a, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              defaultValue={currentTaskData?.status}
              onValueChange={(e) => handleFormChange(e, "status")}
            >
              <SelectTrigger className="w-[278px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {["new", "pending", "in progress", "completed"].map((a, i) => (
                  <SelectItem key={i} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose onClick={() => setCurrentTaskData(null)}>
            <Button type="submit" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="default"
            disabled={!formData?.title || !formData?.description}
            onClick={() => {
              handleSubmit({
                ...formData!,
                updatedAt: new Date(),
              });
              setFormData(null);
              setCurrentTaskData(null);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
