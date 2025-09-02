"use client"

import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Eye, PencilIcon, Trash2 } from "lucide-react"
import { router } from "@inertiajs/react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Post = {
  id: string
  title: string
  body: string
  category: string
  user: string
}

interface ColumnProps {
  onDelete: (postId: string) => void;
}


export const getColumns = ({ onDelete }: ColumnProps): ColumnDef<Post>[] => [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },

  {
    accessorKey: "category",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },

  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const post = row.original
      return (
        <div className="flex flex-row gap-2">
           <Button variant="secondary" size="icon" className="size-8 cursor-pointer" onClick={() => router.visit(`/posts/${post.id}`)}>
          <Eye />
        </Button>
        <Button variant="secondary" size="icon" className="size-8 cursor-pointer" onClick={() => router.visit(`/posts/${post.id}/edit`)}>
          <PencilIcon />
        </Button>
       <Button variant="destructive" className="text-sm bg-red-600/70" size="icon" onClick={() => onDelete(post.id)}>
          <Trash2 />
        </Button>
        </div>
        
      )
    },
  },
]