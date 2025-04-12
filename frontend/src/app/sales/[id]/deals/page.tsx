"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export default function SalesDeals(){
  const params = useParams();
  const salesRepId = Number(params?.id);

  const fetchSalesDeals = async (id: string) => {
    const res = await axios.get('/api/sales/' + id + '/deals');
    const data = await res.data;
    return data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['sales-deals', salesRepId],
    queryFn: () => fetchSalesDeals(String(salesRepId)),
    enabled: !!salesRepId,
  });
  
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Deals for Sales Rep #{salesRepId}</h1>
      {/* <DataTable columns={columns} data={deals} isLoading={isLoading} error={error} /> */}
    </div>
  )
}