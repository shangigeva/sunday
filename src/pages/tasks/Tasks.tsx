import React, { useState } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { tasks } from "./data/data";
import { Button } from "@/components/ui/button";
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
const Tasks = () => {
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
      {" "}
      <div className="md:hidden">
        <img
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <img
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
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
        <Button onClick={openModal}>Create New Task</Button>
        {isModalOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-black opacity-50"></div>{" "}
              <div className="bg-white p-4 rounded shadow-md w-96 relative z-10">
                <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
                <label className="block mt-2">Title:</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
                />
                <label className="block mt-2">Status:</label>
                <select
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <label className="block mt-2">Label:</label>{" "}
                <select
                  value={newTask.label}
                  onChange={(e) =>
                    setNewTask({ ...newTask, label: e.target.value })
                  }
                  className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
                >
                  {labels.map((label) => (
                    <option key={label.value} value={label.value}>
                      {label.label}
                    </option>
                  ))}
                </select>
                <label className="block mt-2">Priority:</label>
                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                  className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
                >
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleSaveTask}
                    className="bg-blue-500 text-white mr-2"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={closeModal}
                    className="border border-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
