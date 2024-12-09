import { NextResponse } from "next/server";
import data from "@/data.json";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const user = data.filter((x) => params.id == x.id.toString());

  return NextResponse.json({
    user
  });
}
