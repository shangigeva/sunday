"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { taskSchema } from "../data/schema";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);

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
          <ModeEditIcon className="mr-2 h-5 w-5" />
          Edit{" "}
        </DropdownMenuItem>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
