import Link from "next/link";

export default function AnteojosLayout({ children }) {
  return (
    <div className="bg-[#fcf9f2] text-[#1c1c18]">
      <nav
        aria-label="Categorías del catálogo"
        className="border-b border-black/10 bg-[#f1eee7] px-5 py-4 lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap gap-6 text-xs font-semibold uppercase tracking-wider">
          <Link href="/anteojos" className="hover:text-[#855230]">
            Todos
          </Link>

          <Link href="/anteojos/sol" className="hover:text-[#855230]">
            Sol
          </Link>

          <Link href="/anteojos/luz-azul" className="hover:text-[#855230]">
            Luz Azul
          </Link>

          <Link href="/anteojos/recetados" className="hover:text-[#855230]">
            Recetados
          </Link>
        </div>
      </nav>

      {children}
    </div>
  );
}
