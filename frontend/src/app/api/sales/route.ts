import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios';
export async function GET() {
  try {
    const response = await axios.get('http://localhost:8000/api/data')
    return NextResponse.json({message: "Successfuly fetch data", data: response.data}, {status: 200})
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 })
  }
}