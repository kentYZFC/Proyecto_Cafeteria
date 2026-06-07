import Navbar from "@/components/Navbar";

export default function Nosotros() {
  return (
    <>
      <Navbar />

      <div className="contenedor">

        <h1>Sobre Nosotros</h1>

        <h2>Misión</h2>

        <p>
          Ofrecer experiencias únicas
          a través del mejor café.
        </p>

        <h2>Visión</h2>

        <p>
          Convertirnos en la cafetería
          referente de la región.
        </p>

        <h2>Valores</h2>

        <ul>
          <li>Calidad</li>
          <li>Respeto</li>
          <li>Innovación</li>
          <li>Compromiso</li>
        </ul>

      </div>
    </>
  );
}