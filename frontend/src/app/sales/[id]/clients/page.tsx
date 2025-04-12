"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export default function SalesClients(){
  const {id} = useParams();
  const salesRepId = Number(id);

  const fetchSalesClients = async (id: string) => {
    const res = await axios.get('/api/sales/' + id + '/clients');
    const data = await res.data;
    return data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['sales-clients', salesRepId],
    queryFn: () => fetchSalesClients(String(salesRepId)),
    enabled: !!salesRepId,
  });
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Clients for Sales Rep #{salesRepId}</h1>
      {/* <DataTable columns={columns} data={deals} isLoading={isLoading} error={error} /> */}
    </div>
  )
}