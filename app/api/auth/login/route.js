import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";
import { crearToken } from "@/lib/auth";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Correo y contraseña son obligatorios." },
      { status: 400 }
    );
  }

  const pool = getPool();
  const [filas] = await pool.query(
    "SELECT id, nombre, email, password_hash, rol FROM usuarios WHERE email = ?",
    [email]
  );

  const usuario = filas[0];

  if (!usuario) {
    return NextResponse.json(
      { error: "Credenciales inválidas." },
      { status: 401 }
    );
  }

  const valido = await bcrypt.compare(password, usuario.password_hash);

  if (!valido) {
    return NextResponse.json(
      { error: "Credenciales inválidas." },
      { status: 401 }
    );
  }

  const token = await crearToken({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  });

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  return NextResponse.json({
    ok: true,
    usuario: { nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
  });
}
