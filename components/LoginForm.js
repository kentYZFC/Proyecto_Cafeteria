"use client";

import { useState } from "react";

export default function LoginForm() {

  const [usuario,setUsuario] =
  useState("");

  const [password,setPassword] =
  useState("");

  function iniciarSesion(e){

    e.preventDefault();

    localStorage.setItem(
      "cliente",
      JSON.stringify({
        usuario,
        password
      })
    );

    alert(
      "Sesión iniciada"
    );
  }

  return (

    <form
      onSubmit={iniciarSesion}
      className="login-form"
    >

      <input
        type="text"
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

      <button>
        Ingresar
      </button>

    </form>

  );
}