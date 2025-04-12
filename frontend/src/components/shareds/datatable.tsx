import React, { forwardRef, useImperativeHandle } from "react"
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  Table as ReactTableType
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Pagination {
  pageIndex: number
  pageSize: number
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  error?: Error | null
  isLoading?: boolean
  pagination?: Pagination
  setPagination?: React.Dispatch<React.SetStateAction<Pagination>>
}

// 👇 Ref type: expose anything from the internal table instance
export type DataTableRef<TData> = {
  table: ReactTableType<TData>
}

// 👇 ForwardRef component with generic support
function DataTableInner<TData, TValue>(
  {
    columns,
    data,
    error,
    isLoading,
    pagination,
    setPagination
  }: DataTableProps<TData, TValue>,
  ref: React.Ref<DataTableRef<TData>>
) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination
    }
  })

  useImperativeHandle(ref, () => ({
    table
  }))

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : header.column.columnDef.header instanceof Function
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <div className="flex justify-center items-center h-48">
                  <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
                    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                      <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                    </path>
                  </svg>
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.columnDef.cell instanceof Function
                      ? cell.column.columnDef.cell(cell.getContext())
                      : cell.column.columnDef.cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// 👇 Export the forward ref version with generics
export const DataTable = forwardRef(DataTableInner) as <
  TData,
  TValue = unknown
>(
  props: DataTableProps<TData, TValue> & { ref?: React.Ref<DataTableRef<TData>> }
) => ReturnType<typeof DataTableInner>
