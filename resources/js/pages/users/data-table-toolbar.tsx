"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import { DataTableFacetedFilter } from "../../components/custom/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table-toggle"

export type FilterOption = {
    value: string
    label: string
}

export type FilterOptions = {
    departments: FilterOption[]
    groups: FilterOption[]
    roles: FilterOption[]
}

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    filterOptions: FilterOptions
}


export function DataTableToolbar<TData>({
    table,
    filterOptions
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;




    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
                <Input
                    placeholder="Search User..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("role") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("role")}
                        title="Role"
                        options={filterOptions.roles}
                    />
                )}
                {table.getColumn("department") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("department")}
                        title="Department"
                        options={filterOptions.departments}
                    />
                )}
                {table.getColumn("group") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("group")}
                        title="Group"
                        options={filterOptions.groups}
                    />
                )}

                {isFiltered && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => table.resetColumnFilters()}
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <DataTableViewOptions table={table} />
                <Button size="sm" onClick={() => { }}>Add User</Button>
            </div>
        </div>
    )
}