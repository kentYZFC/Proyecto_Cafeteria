"use client";

import {
  useState
} from "react";

import Navbar
from "@/components/Navbar";

import AdminPanel
from "@/components/AdminPanel";

export default function Admin(){

  const [
    usuario,
    setUsuario
  ] = useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const [
    autorizado,
    setAutorizado
  ] = useState(false);

  function ingresar(){

    if(
      usuario === "admin"
      &&
      password === "1234"
    ){

      setAutorizado(
        true
      );

    }

    else{

      alert(
        "Credenciales incorrectas"
      );
    }
  }

  return (

    <>

      <Navbar />

      {
        !autorizado ?

        (

          <div
            className="contenedor"
          >

            <h1>
              Login Admin
            </h1>

            <input
              placeholder="Usuario"
              value={usuario}
              onChange={(e)=>
                setUsuario(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e)=>
                setPassword(
                  e.target.value
                )
              }
            />

            <button
              onClick={
                ingresar
              }
            >
              Entrar
            </button>

          </div>

        )

        :

        <AdminPanel />

      }

    </>

  );
}