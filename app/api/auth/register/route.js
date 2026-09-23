import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";

export async function POST(request) {
  const { nombre, email, password } = await request.json();

  if (!nombre || !email || !password) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios." },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 6 caracteres." },
      { status: 400 }
    );
  }

  const pool = getPool();

  const [existentes] = await pool.query(
    "SELECT id FROM usuarios WHERE email = ?",
    [email]
  );

  if (existentes.length > 0) {
    return NextResponse.json(
      { error: "Ese correo ya está registrado." },
      { status: 409 }
    );
  }

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, 'cliente')",
    [nombre, email, hash]
  );

  return NextResponse.json({ ok: true });
}
