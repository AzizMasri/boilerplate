"use client"

import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Eye, PencilIcon, Trash2 } from "lucide-react"
import { router } from "@inertiajs/react"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Role = {
    id: string
    name: string
    permissions: string[]
}

interface ColumnProps {
    onActionButtonClick: (roleId: string, actionType: string) => void;
}


export const getColumns = ({ onActionButtonClick }: ColumnProps): ColumnDef<Role>[] => [

    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => {
            return <span className="capitalize">{row.original.name}</span>
        }
    },

    {
        accessorKey: "permissions",

        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Permissions" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex flex-wrap gap-1">
                    {row.original.permissions.map((permission, index) => (
                        <div key={index}>
                            <Badge className="capitalize">{permission}</Badge>
                        </div>
                    ))}
                </div>
            )

        }
    },


    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const role = row.original
            return (
                <div className="flex flex-row gap-2">

                    <Button variant="secondary" size="icon" className="size-8 cursor-pointer" onClick={() => {onActionButtonClick(role.id, "edit")}}>
                        <PencilIcon />
                    </Button>
                    <Button variant="destructive" className="text-sm bg-red-600/70" size="icon" onClick={() => {onActionButtonClick(role.id, "delete")}}>
                        <Trash2 />
                    </Button>
                </div>

            )
        },
    },
]