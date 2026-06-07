import Navbar
from "@/components/Navbar";

import LoginForm
from "@/components/LoginForm";

export default function Login() {

  return (

    <>
      <Navbar />

      <div className="contenedor">

        <h1>
          Login Cliente
        </h1>

        <LoginForm />

      </div>

    </>

  );
}