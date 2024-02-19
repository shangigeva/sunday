import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import CreateTask from "./components/CreateTask";
import { CreateTasks, TaskInput } from "@/lib/types";
import { Task } from "./data/schema";

const Tasks: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<TaskInput>({
    title: "",
    status: "",
    priority: "",
    label: "",
    subtitle: "",
    owner: "",
    project: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getTasks = async (): Promise<Task[]> => {
      try {
        const { data } = await axios.get("/tasks");
        setTasks(data);
        return data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
      }
    };
    getTasks();
  }, []);
  const createTaskProps: CreateTasks = {
    isModalOpen,
    closeModal,
    newTask,
    setNewTask,
  };

  return (
    <>
      <div className=" h-full flex-1 flex-col space-y-2 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your team tasks
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
        <Button onClick={openModal} className="bg-[#9584FF]">
          Create New Task
        </Button>
        {isModalOpen && <CreateTask {...createTaskProps} />}
      </div>
    </>
  );
};

export default Tasks;
