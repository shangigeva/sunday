import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import CreateTask from "../tasks/components/CreateTask";
import { columns } from "../tasks/components/columns";
import { DataTable } from "../tasks/components/data-table";
import { CreateTasks, TaskInput } from "@/lib/types";

const MyTasks: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
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
    const getTasks = async () => {
      try {
        const { data } = await axios.get("/tasks/mytasks");
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
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
      <div className=" h-full flex-1 flex-col space-y-2 p-8 md:flex">
        <DataTable data={tasks} columns={columns} />
        <Button onClick={openModal} className=" bg-[#9584FF]">
          Create New Task
        </Button>
        {isModalOpen && <CreateTask {...createTaskProps} />}
      </div>
    </>
  );
};

export default MyTasks;
