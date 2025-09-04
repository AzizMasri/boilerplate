"use client"

import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Eye, PencilIcon, Trash2 } from "lucide-react"
import { router } from "@inertiajs/react"
import { Value } from "@radix-ui/react-select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string
  name: string
  email: string
  group: string
  department: string
  roles: string[]
  profile_path: string
}


interface ColumnProps {
  onDelete: (userId: string) => void;
}

const arrayValueFilter = (row: any, id: string, filterValues: string[]): boolean => {
  const userValues = row.getValue(id) as string[]
  return filterValues.some(filterValue => userValues.includes(filterValue))
}


export const getColumns = ({ onDelete }: ColumnProps): ColumnDef<User>[] => [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-3 items-center">
          <Avatar>
            <AvatarImage src={row.original.profile_path} alt="@shadcn" />
            <AvatarFallback>BP</AvatarFallback>
          </Avatar>
          <span className="capitalize">{row.original.name}</span>
        </div>
      )
    },
  },

  {
    accessorKey: "email",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "roles",
    id: "role",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const roles = row.original.roles;

      if (!roles || roles.length === 0) {
        return <span className="text-muted-foreground text-xs">No Role</span>;
      }

      return (
        <div className="flex flex-wrap gap-1">
          {roles.map((role, index) => (
            <span
              key={index}
              className="capitalize inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {role}
            </span>
          ))}
        </div>
      );
    },

    filterFn: (row, id, value) => {
      return arrayValueFilter(row, id, value)
    },

  },
  {
    accessorKey: "group",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group" />
    ),
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.group}</span>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "department",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.department}</span>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex flex-row gap-2">
          <Button variant="secondary" size="icon" className="size-8 cursor-pointer" onClick={() => router.visit(`/posts/${user.id}`)}>
            <Eye />
          </Button>
          <Button variant="secondary" size="icon" className="size-8 cursor-pointer" onClick={() => router.visit(`/posts/${user.id}/edit`)}>
            <PencilIcon />
          </Button>
          <Button variant="destructive" className="text-sm bg-red-600/70" size="icon" onClick={() => onDelete(user.id)}>
            <Trash2 />
          </Button>
        </div>

      )
    },
  },
]