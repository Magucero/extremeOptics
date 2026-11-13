"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Navbar() {
  const { usuario, cargando, autenticado, cerrarSesion } = useAuth();

  return (
    <header className="w-full border-b border-[#e8e0d4] bg-[#fcf9f2] text-[#1c1c18]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-[#1c1c18]"
        >
          EXTREME OPTICS
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/">Inicio</Link>
          <Link href="/anteojos">Anteojos</Link>
          <Link href="/categorias">Categorías</Link>
          <Link href="/contacto">Contacto</Link>

          {autenticado && usuario?.isStaff === true && (
            <Link href="/dashboard">Panel</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {cargando ? (
            <span className="text-sm text-gray-500">Verificando...</span>
          ) : autenticado ? (
            <>
              <span className="text-sm text-[#1c1c18]">
                {usuario?.username || "Mi cuenta"}
              </span>

              <button
                type="button"
                onClick={cerrarSesion}
                className="rounded-md bg-[#855230] px-4 py-2 text-sm text-white transition hover:bg-[#6d4127]"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Iniciar sesión</Link>
              <Link
                href="/registro"
                className="rounded-md bg-[#855230] px-4 py-2 text-sm text-white transition hover:bg-[#6d4127]"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
