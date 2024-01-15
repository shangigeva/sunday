"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import EditTask, { EditTasks } from "@/pages/editTask.tsx/EditTask";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
interface TaskType {
  _id: string;
  title: string;
  status: string;
  priority: string;
  label: string;
}
interface TaskInput {
  title: string;
  status: string;
  priority: string;
  label: string;
}

export function DataTableRowActions<TData extends TaskType>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<TaskInput>({
    title: "",
    status: "",
    priority: "",
    label: "",
  });
  // console.log(row?.original?._id);

  const openModal = () => {
    console.log("Modal opened");

    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editTaskProps: EditTasks = {
    isModalOpen,
    closeModal,
    editTask,
    setEditTask,
    taskId: row?.original?._id,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="flex items-center">
          <InfoIcon className="mr-2 h-5 w-5" />
          more{" "}
        </DropdownMenuItem>{" "}
        <DropdownMenuItem className="flex items-center" onClick={openModal}>
          <ModeEditIcon className="mr-2 h-5 w-5" />
          Edit
        </DropdownMenuItem>{" "}
        <DropdownMenuItem className="flex items-center">
          <ContentCopyIcon className="mr-2 h-5 w-5" />
          Make a copy{" "}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <FavoriteIcon className="mr-2 h-5 w-5" />
          Favorite{" "}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center">
          <DeleteIcon className="mr-2 h-5 w-5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>{" "}
      {isModalOpen && <EditTask {...editTaskProps} />}
    </DropdownMenu>
  );
}
