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
import { useState } from "react";
import { CreateTasks, TaskInput } from "@/lib/types";
import CreateTask from "./CreateTask";
import AddIcon from "@mui/icons-material/Add";
interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

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

  const openModal = () => {
    setIsModalOpen(true);
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
      <Button className=" h-8 lg:flex mr-4 bg-[#8ABBF6]" onClick={openModal}>
        Create New Task
      </Button>
      <div>
        <label htmlFor="my_modal_6" className=" btn lg:flex mr-4">
          <AddIcon />{" "}
        </label>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add project</h3>
            <input
              type="text"
              className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
            />
            <div className="modal-action flex justify-end mt-4">
              <label
                htmlFor="my_modal_6"
                className="btn bg-blue-500 text-white mr-2 border-blue-500"
              >
                Save
              </label>
              <label
                htmlFor="my_modal_6"
                className="btn bg-black text-white mr-2 border-black"
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
      </div>
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
