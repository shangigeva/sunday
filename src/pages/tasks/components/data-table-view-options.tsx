"use client";

import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { CreateTasks, ProjectInput, TaskInput } from "@/lib/types";
import CreateTask from "./CreateTask";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/bigPie";
import axios from "axios";
import { toast } from "react-toastify";
import { userInfo } from "os";
interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}
const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<TaskInput>({
    title: "",
    status: "",
    priority: "",
    label: "",
    subtitle: "",
    owner: "",
    project: "",
  });
  const [newProject, setNewProject] = useState<ProjectInput>({
    label: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    console.log(id);
    console.log(userData?.payload.isAdmin);

    setNewProject((currentState) => ({
      ...currentState,
      [id]: value,
    }));
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
    }));
  };
  console.log(newProject);
  const handleProjectSave = async () => {
    try {
      const { data } = await axios.post("/tasks/createProject", newProject);
      console.log("Project saved successfully:", data);
      toast.success("Project created successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setNewProject({ ...newProject, label: "" });
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Error creating project");
      setNewProject({ ...newProject, label: "" });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createTaskProps: CreateTasks = {
    isModalOpen,
    closeModal,
    newTask,
    setNewTask,
  };

  return (
    <>
      {" "}
      <label
        className="inline-flex items-center justify-center rounded-md px-3 py-1 mr-4 bg-[#9584FF] text-white text-sm lg:text-base cursor-pointer"
        onClick={openModal}
      >
        Create New Task
      </label>
      {userData?.payload.isAdmin && (
        <div>
          <label
            htmlFor="my_modal_6"
            className="inline-flex items-center justify-center rounded-md px-3 py-1 mr-4 bg-[#9584FF] text-white text-sm lg:text-base cursor-pointer"
          >
            Create New Project
          </label>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box text-black">
              <h3 className="font-bold text-lg">Add project</h3>
              <input
                id="label"
                type="text"
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
                value={newProject.label}
                onChange={handleInputChange}
              />
              <div className="modal-action flex justify-end mt-4">
                <label
                  htmlFor="my_modal_6"
                  className="btn bg-[#715CF8] text-white mr-2 border-[#715CF8]"
                  onClick={handleProjectSave}
                >
                  Save
                </label>
                <label
                  htmlFor="my_modal_6"
                  className="btn bg-[#9484ffa9] text-white mr-2 border-[#9484ff7f]"
                >
                  Cancel
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      {isModalOpen && <CreateTask {...createTaskProps} />}
    </>
  );
}
