import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params;
  const targetPath = path.join("/");
  
  try {
    const body = await req.json();
    const response = await axios.post(`${BACKEND_URL}/auth/${targetPath}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const data = error.response?.data || { message: "Internal Server Error" };
      return NextResponse.json(data, { status });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
