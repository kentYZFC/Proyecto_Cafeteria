"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function registrar(e) {
    e.preventDefault();
    setError("");

    if (!nombre || !email || !password) {
      setError("Completa todos los campos.");
      return;
    }

    setCargando(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setCargando(false);
      setError(data.error || "No se pudo crear la cuenta.");
      return;
    }

    const loginRes = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setCargando(false);

    if (!loginRes.ok) {
      router.push("/login");
      return;
    }

    router.push("/cuenta");
    router.refresh();
  }

  return (
    <form onSubmit={registrar} className="login-form">
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña (mínimo 6 caracteres)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="error-texto">{error}</p>}

      <button disabled={cargando}>
        {cargando ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}
