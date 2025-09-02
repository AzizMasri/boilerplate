"use client"

import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Eye, PencilIcon, Trash2 } from "lucide-react"
import { router } from "@inertiajs/react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string
  name: string
  email: string
  group: string
  department: string
  role: string
}

interface ColumnProps {
  onDelete: (userId: string) => void;
}


export const getColumns = ({ onDelete }: ColumnProps): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },

  {
    accessorKey: "email",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    )
  },
    {
    accessorKey: "group",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group" />
    ),
  },
    {
    accessorKey: "department",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
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