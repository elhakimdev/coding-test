"use client"
"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface Deal {
  client: string;
  value: number;
  status: 'Closed Won' | 'In Progress' | 'Closed Lost';
}

export interface Client {
  name: string; 
  industry: string;
  contact: string;
}

export interface SalesRep {
  id: number;
  name: string;
  role: string;
  region: string;
  skills: string[];
  deals: Deal[];
  clients: Client[];
}

export interface SalesData {
  salesReps: SalesRep[];
}


export const columns: ColumnDef<SalesRep, unknown>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({cell, row}) => {
      const salesRep = row.original;
      const id = salesRep.id;
      return (
        <div className="flex flex-row items-center w-full">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-4 font-semibold text-slate-700 flex flex-col">
            <div className="">{row.original.name}</div>
            <div className="text-xs text-slate-500 gap-x-1 flex">
              <Link href={`/sales/${id}/deals`} className="underline">Deals ({salesRep.deals?.length || 0})</Link>
              &bull;
              <Link href={`/sales/${id}/clients`} className="underline">Clients ({salesRep.clients?.length || 0})</Link>
            </div>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "region",
    header: "Region"
  },
  {
    accessorKey: "skills",
    header: "Skills",
    cell({cell, row}) {
      return <div>
        {row.original.skills.map((skill) => (
          <div key={skill}>
            {skill}
          </div>
        ))}
      </div>
    },
  }
]
