"use client";
import { DataTable } from "@/components/shareds/datatable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { columns } from "./columns";
import { useState } from "react";

export default function SalesClients(){
  const {id} = useParams();
  const salesRepId = Number(id);

  const fetchSalesClients = async (id: string) => {
    const res = await axios.get('/api/sales/' + id + '/clients');
    const data = await res.data;
    return data;
  }

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['sales-clients', salesRepId],
    queryFn: () => fetchSalesClients(String(salesRepId)),
    enabled: !!salesRepId,
  });

    const [pagination, setPagination] = useState({
      pageIndex: 0, //initial page index
      pageSize: 5, //default page size
    });
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Clients for Sales Rep #{salesRepId}</h1>
      <DataTable columns={columns} data={data?.data?.clients ?? []} isLoading={isLoading || isFetching} error={error} pagination={pagination} />
    </div>
  )
}