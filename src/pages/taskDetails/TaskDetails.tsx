import React, { useState } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { tasks } from "../tasks/data/data";
const statuses = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "Todo" },
  { value: "in progress", label: "In Progress" },
];
const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];
export const labels = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "documentation", label: "Documentation" },
];
const TaskDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    status: "",
    priority: "",
    label: "",
  });
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);

    setNewTask({ title: "", status: "", priority: "", label: "" });
  };
  const handleSaveTask = () => {
    setNewTask({ title: "", status: "", priority: "", label: "" });
    closeModal();
  };
  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <DataTable data={tasks} columns={columns} />{" "}
      </div>
    </>
  );
};

export default TaskDetails;
