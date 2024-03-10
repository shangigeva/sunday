"use client";

import { ColumnDef } from "@tanstack/react-table";
import { labels, owners, priorities, projects, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import UserSelectComponent from "./UserSelect";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "TaskNumb",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        <span className="max-w-[500px] truncate font-medium">
          TASK-{row.getValue("TaskNumb")}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "createTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Create Time" />
    ),
    cell: ({ row }) => {
      const createTime: Date = new Date(row.getValue("createTime") as string);
      const formattedDate = createTime.toLocaleDateString("en-US");
      const formattedTime = createTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      return (
        <div className="w-36">
          <span className="max-w-48 truncate font-medium">
            {formattedDate} {formattedTime}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "project",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-24 items-center">
          <span>{row.getValue("project")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="label" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.getValue("label")
      );

      if (!label) {
        return null;
      }

      return (
        <div className="flex w-24">
          {label && <Badge variant="outline">{label.label}</Badge>}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span
            className="max-w-40 truncate font-medium"
            title={row.getValue("title")}
          >
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "subtitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subtitle" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span
            className="max-w-48 truncate font-medium"
            title={row.getValue("subtitle")}
          >
            {row.getValue("subtitle")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-28 items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          {status.badgeType && (
            <span className={status.badgeType}>{status.label}</span>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex w-20 items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned to" />
    ),
    cell: ({ row }) => {
      return <UserSelectComponent selectedUser={row.getValue("owner")} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];
