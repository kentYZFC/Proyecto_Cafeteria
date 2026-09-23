import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const payload = await verificarToken(token);

  if (!payload) {
    return NextResponse.json({ usuario: null });
  }

  return NextResponse.json({
    usuario: {
      nombre: payload.nombre,
      email: payload.email,
      rol: payload.rol,
    },
  });
}
