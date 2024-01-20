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
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/bigPie";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/Routes/ROUTES";
import { TaskInput, TaskType } from "@/lib/types";
import { Task } from "../data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<Task>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<TaskInput>({
    title: "",
    subtitle: "",
    status: "",
    priority: "",
    label: "",
    owner: "",
    taskId: "",
    project: "",
  });

  const navigate = useNavigate();
  const openModal = () => {
    console.log("Modal opened");

    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);

  const task = row.original;
  const handleDeleteTask = () => {
    if (userData?.payload.isAdmin && task?._id) {
      axios
        .delete(`/tasks/${task._id}`)
        .then(function (response) {
          if (response.status === 200) {
            console.log("Task deleted successfully!");
            window.location.reload();
          } else {
            console.error("Error deleting task:", response.statusText);
          }
        })
        .catch(function (error) {
          console.error("Error deleting task:", error);
          toast.error("Unable to delete card", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      console.log("User does not have permission to delete tasks");
    }
  };

  const editTaskProps: EditTasks = {
    isModalOpen,
    closeModal,
    editTask,
    setEditTask,
    taskId: task._id,
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
        <DropdownMenuItem
          className="flex items-center"
          onClick={() => navigate(`${ROUTES.TASKS}/${row?.original?._id}`)}
        >
          <InfoIcon className="mr-2 h-5 w-5" />
          more
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center" onClick={openModal}>
          <ModeEditIcon className="mr-2 h-5 w-5" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <ContentCopyIcon className="mr-2 h-5 w-5" />
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <FavoriteIcon className="mr-2 h-5 w-5" />
          Favorite
        </DropdownMenuItem>
        {userData?.payload.isAdmin && (
          <DropdownMenuItem
            className="flex items-center"
            onClick={handleDeleteTask}
          >
            <DeleteIcon className="mr-2 h-5 w-5" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
      {isModalOpen && <EditTask {...editTaskProps} />}
    </DropdownMenu>
  );
}
