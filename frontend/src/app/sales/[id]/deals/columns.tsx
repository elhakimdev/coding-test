import { ColumnDef } from "@tanstack/react-table";
import { Deal } from "../../columns";

export const columns: ColumnDef<Deal, unknown>[] = [
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell(props) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      })

      return (
        <span>{formatter.format(props.row.original.value)}</span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  }
]