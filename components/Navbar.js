import Link from "next/link";

export default function Navbar() {
  return (
    <nav>

      <h2>☕ XPRESSO</h2>

      <div>

        <Link href="/">
          Inicio
        </Link>

        <Link href="/nosotros">
          Sobre Nosotros
        </Link>

        <Link href="/login">
          Login
        </Link>

        <Link href="/admin">
          Admin
        </Link>

      </div>

    </nav>
  );
}