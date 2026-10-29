import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fcf9f2]/95 text-[#1c1c18] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 lg:px-8">
        {/* Marca */}
        <Link
          href="/"
          aria-label="Óptica - Inicio"
          className="text-2xl font-black uppercase tracking-tighter sm:text-3xl"
        >
          Óptica<span className="text-[#855230]">.</span>
        </Link>

        {/* Navegación */}
        <nav
          aria-label="Navegación principal"
          className="order-last flex w-full flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider lg:order-none lg:w-auto"
        >
          <Link
            href="/"
            className="bg-black px-3 py-2 text-white transition-colors hover:bg-[#855230]"
          >
            Inicio
          </Link>

          <a
            href="#sol"
            className="px-3 py-2 transition-colors hover:text-[#855230]"
          >
            Anteojos de sol
          </a>

          <a
            href="#recetados"
            className="px-3 py-2 transition-colors hover:text-[#855230]"
          >
            Anteojos recetados
          </a>

          <a
            href="#contacto"
            className="px-3 py-2 transition-colors hover:text-[#855230]"
          >
            Contacto
          </a>
        </nav>

        {/* Acceso de usuarios */}
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider sm:text-xs">
          <button
            type="button"
            className="border border-black px-3 py-2 transition-colors hover:bg-black hover:text-white"
          >
            Iniciar sesión
          </button>

          <button
            type="button"
            className="border border-black bg-black px-3 py-2 text-white transition-colors hover:border-[#855230] hover:bg-[#855230]"
          >
            Registrarse
          </button>
        </div>
      </div>
    </header>
  );
}