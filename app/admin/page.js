"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Admin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function ingresar(e) {
    e.preventDefault();
    setError("");
    setCargando(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setCargando(false);

    if (!res.ok) {
      setError(data.error || "No se pudo iniciar sesión.");
      return;
    }

    if (data.usuario.rol !== "admin") {
      setError("Esta cuenta no tiene permisos de administrador.");
      return;
    }

    router.push("/admin/panel");
    router.refresh();
  }

  return (
    <>
      <Navbar />

      <div className="contenedor">
        <h1>Login Admin</h1>

        <form onSubmit={ingresar} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-texto">{error}</p>}

          <button disabled={cargando}>
            {cargando ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </div>
    </>
  );
}
