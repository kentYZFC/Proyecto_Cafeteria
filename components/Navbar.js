"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(undefined); // undefined = cargando

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUsuario(data.usuario))
      .catch(() => setUsuario(null));
  }, []);

  async function cerrarSesion() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUsuario(null);
    router.push("/");
    router.refresh();
  }

  return (
    <nav>
      <h2>☕ XPRESSO</h2>

      <div>
        <Link href="/">Inicio</Link>
        <Link href="/nosotros">Sobre Nosotros</Link>

        {usuario?.rol === "cliente" && <Link href="/cuenta">Mi cuenta</Link>}
        {usuario?.rol === "admin" && <Link href="/admin/panel">Panel admin</Link>}

        {!usuario && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/admin">Admin</Link>
          </>
        )}

        {usuario && (
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        )}
      </div>
    </nav>
  );
}
