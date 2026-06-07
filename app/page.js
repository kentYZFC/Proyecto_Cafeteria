"use client";

import { useState } from "react";

import Navbar from "../components/Navbar";
import MenuCard from "../components/MenuCard";
import Carrito from "../components/Carrito";
import Footer from "../components/Footer";

import { useProductos } from "../context/ProductosContext";

export default function Home() {

  const { productos } = useProductos();

  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto) {

    setCarrito([
      ...carrito,
      producto
    ]);

  }

  function eliminarDelCarrito(index) {

    const nuevoCarrito = [...carrito];

    nuevoCarrito.splice(index, 1);

    setCarrito(nuevoCarrito);

  }

  function pagar() {

    const cliente =
      localStorage.getItem("cliente");

    if (!cliente) {

      alert(
        "Debe iniciar sesión antes de comprar."
      );

      return;

    }

    alert(
      "Compra realizada correctamente."
    );

    setCarrito([]);

  }

  return (

    <>

      <Navbar />



      <div className="hero">

        <h1>
          ☕ Cafetería Xpresso
        </h1>

        <p>
          El mejor café artesanal
          de la ciudad
        </p>

      </div>

      <div className="productos">

        {
          productos.map(
            (producto) => (

              <MenuCard
                key={producto.id}
                producto={producto}
                agregarAlCarrito={
                  agregarAlCarrito
                }
              />

            )
          )
        }

      </div>

      <Carrito
        carrito={carrito}
        eliminarDelCarrito={
          eliminarDelCarrito
        }
        pagar={pagar}
      />

      <Footer />

    </>

  );

}