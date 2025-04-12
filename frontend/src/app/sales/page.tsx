"use client"
import { DataTable, DataTableRef } from "@/components/shareds/datatable";
import { columns, SalesRep } from "./columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { PaginationComponent } from "@/components/shareds/pagination";
import { PageSizeSelector } from "@/components/shareds/page-sizer";

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

    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 5, //default page size
    });

    const tableRef = useRef<DataTableRef<SalesRep>>(null);

    return (
        <div className="p-12 w-full h-full flex flex-col gap-y-8">

            <div className="flex flex-row w-full justify-between">
               <div>
                    <h1 className="font-bold">
                        List of sale's
                    </h1>
               </div>
                <PageSizeSelector
                    value={pagination.pageSize}
                    onChange={(size) =>
                    setPagination((prev) => ({ ...prev, pageSize: size, pageIndex: 0 }))
                    }
                />
            </div>

            <DataTable
                ref={tableRef}
                columns={columns ?? []} 
                data={data?.data?.salesReps ?? []} 
                error={error} 
                isLoading={isLoading}
                pagination={pagination}
            />

            <PaginationComponent
                pageIndex={pagination.pageIndex}
                pageSize={pagination.pageSize}
                totalItems={data?.data?.salesReps?.length ?? 0}
                onPageChange={(newPage) =>
                    setPagination((prev) => ({ ...prev, pageIndex: newPage }))
                }
            />
        </div>
    )
}