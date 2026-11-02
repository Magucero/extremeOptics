import Link from "next/link";

export default function Paginacion({
  paginaActual,
  hayAnterior,
  haySiguiente,
  busqueda = "",
}) {
  function crearEnlace(pagina) {
    const parametros = new URLSearchParams();

    parametros.set("page", String(pagina));

    if (busqueda) {
      parametros.set("search", busqueda);
    }

    return `/anteojos?${parametros.toString()}`;
  }

  if (!hayAnterior && !haySiguiente) {
    return null;
  }

  return (
    <nav
      aria-label="Paginación del catálogo"
      className="mt-10 flex flex-wrap items-center justify-center gap-4"
    >
      {hayAnterior && (
        <Link
          href={crearEnlace(paginaActual - 1)}
          className="border border-black px-4 py-3 text-sm hover:bg-black hover:text-white"
        >
          ← Anterior
        </Link>
      )}

      <span className="text-sm text-[#444748]">
        Página {paginaActual}
      </span>

      {haySiguiente && (
        <Link
          href={crearEnlace(paginaActual + 1)}
          className="border border-black px-4 py-3 text-sm hover:bg-black hover:text-white"
        >
          Siguiente →
        </Link>
      )}
    </nav>
  );
}