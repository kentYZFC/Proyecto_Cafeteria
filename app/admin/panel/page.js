import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verificarToken } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import AdminPanel from "@/components/AdminPanel";
import CerrarSesionBoton from "@/components/CerrarSesionBoton";

export default async function PanelAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const sesion = await verificarToken(token);

  if (!sesion || sesion.rol !== "admin") {
    redirect("/admin");
  }

  return (
    <>
      <Navbar />

      <div className="contenedor">
        <h1>Panel de administración</h1>
        <p>Sesión iniciada como {sesion.nombre} ({sesion.email})</p>
        <CerrarSesionBoton />
      </div>

      <AdminPanel />
    </>
  );
}