import { ColumnDef } from "@tanstack/react-table";
import { Client } from "../../columns";

export const columns: ColumnDef<Client, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name"
  }, 
  {
    accessorKey: "contact",
    header: "contact"
  },
  {
    accessorKey: "industry",
    header: "Industry"
  }
]