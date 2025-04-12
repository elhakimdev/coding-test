import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { SalesRep } from '@/app/sales/columns';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context?.params

    const response = await axios.get(`http://localhost:8000/api/data`);
    const sales = await response?.data;
    const matchedSales = (sales?.salesReps as SalesRep[])?.find((sale) => sale.id === Number(id));

    if (!matchedSales) {
      return NextResponse.json(
        { message: 'Sales rep not found' },
        { status: 404 }
      );
    }

    const data = {
      name: matchedSales.name,
      region: matchedSales.region,
      role: matchedSales.role,
      skills: matchedSales.skills,
      clients: matchedSales.clients,
    };

    return NextResponse.json(
      { message: 'Clients fetched successfully', data },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}
