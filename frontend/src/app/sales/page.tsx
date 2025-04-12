"use client"
import { DataTable } from "@/components/shareds/datatable";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Sales() {

    const fetchSales = async () => {
        const res = await axios.get('/api/sales');
        const data = await res.data;
        return data;
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['sales'],
        queryFn: fetchSales,
    });

    return (
        <div className="p-12 w-full h-full">
            <DataTable columns={columns ?? []} data={data?.data?.salesReps ?? []} error={error} isLoading={isLoading}/>
        </div>
    )
}