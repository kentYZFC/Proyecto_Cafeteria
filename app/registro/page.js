import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";

export default function Registro() {
  return (
    <>
      <Navbar />

      <div className="contenedor">
        <h1>Crear cuenta</h1>

        <RegisterForm />
      </div>
    </>
  );
}
