import { NextResponse } from "next/server";
import { productosIniciales } from "@/data/productos";

export async function GET() {
  return NextResponse.json(productosIniciales);
}