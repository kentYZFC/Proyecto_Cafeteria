import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verificarToken } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import CerrarSesionBoton from "@/components/CerrarSesionBoton";

export default async function Cuenta() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const sesion = await verificarToken(token);

  if (!sesion || sesion.rol !== "cliente") {
    redirect("/login");
  }

  return (
    <>
      <Navbar />

      <div className="contenedor">
        <h1>Hola, {sesion.nombre} 👋</h1>
        <p>Bienvenido a tu cuenta en Cafetería Xpresso.</p>
        <p>Desde aquí, más adelante podrás ver tu historial de pedidos.</p>

        <CerrarSesionBoton />
      </div>
    </>
  );
}
