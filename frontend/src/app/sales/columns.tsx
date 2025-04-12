"use client"
"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Row } from "react-day-picker";
import { Cell } from "recharts";

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


export const columns: ColumnDef<SalesRep>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({cell, row}) => {
      return (
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
  },
  {
    id: "summaries",
    header: "Summaries",
    cell: ({row, cell}) => {
      return (
        <div>
          0 Clients, 0 Deals
        </div>
      )
    }
  }
]
