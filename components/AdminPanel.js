"use client";

import { useState } from "react";

import {
  useProductos
}
from "@/context/ProductosContext";

export default function AdminPanel(){

  const {
    productos,
    setProductos
  } = useProductos();

  const [
    nombre,
    setNombre
  ] = useState("");

  const [
    precio,
    setPrecio
  ] = useState("");

  const [
    imagen,
    setImagen
  ] = useState("");

  function agregarProducto(){

    const nuevo = {

      id: Date.now(),

      nombre,

      precio:
      Number(precio),

      imagen
    };

    setProductos([
      ...productos,
      nuevo
    ]);

    setNombre("");
    setPrecio("");
    setImagen("");
  }

  function eliminarProducto(id){

    setProductos(

      productos.filter(
        p => p.id !== id
      )

    );
  }

  function editarProducto(id){

    const nuevoNombre =
    prompt(
      "Nuevo nombre"
    );

    const nuevoPrecio =
    prompt(
      "Nuevo precio"
    );

    setProductos(

      productos.map(
        p =>
          p.id === id
          ? {
              ...p,
              nombre:
              nuevoNombre,
              precio:
              Number(
                nuevoPrecio
              )
            }
          : p
      )

    );
  }

  return (

    <div
      className="admin-panel"
    >

      <h2>
        Administrar Productos
      </h2>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e)=>
          setNombre(
            e.target.value
          )
        }
      />

      <input
        placeholder="Precio"
        value={precio}
        onChange={(e)=>
          setPrecio(
            e.target.value
          )
        }
      />

      <input
        placeholder="Imagen"
        value={imagen}
        onChange={(e)=>
          setImagen(
            e.target.value
          )
        }
      />

      <button
        onClick={
          agregarProducto
        }
      >
        Agregar
      </button>

      <hr />

      {
        productos.map(
          producto => (

            <div
              key={
                producto.id
              }
            >

              <strong>

                {
                  producto.nombre
                }

              </strong>

              {" - $"}

              {
                producto.precio
              }

              <button
                onClick={() =>
                  editarProducto(
                    producto.id
                  )
                }
              >
                Editar
              </button>

              <button
                onClick={() =>
                  eliminarProducto(
                    producto.id
                  )
                }
              >
                Eliminar
              </button>

            </div>

          )
        )
      }

    </div>

  );
}