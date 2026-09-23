"use client";

import { useRouter } from "next/navigation";

export default function CerrarSesionBoton() {
  const router = useRouter();

  async function cerrarSesion() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={cerrarSesion}>
      Cerrar sesión
    </button>
  );
}