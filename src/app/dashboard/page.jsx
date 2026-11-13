import Link from "next/link";
import { obtenerAnteojos } from "@/services/anteojos";

export default async function DashboardPage({ searchParams }) {
  const parametros = await searchParams;
  const paginaSolicitada = Number(parametros.page);

  const paginaActual =
    Number.isSafeInteger(paginaSolicitada) && paginaSolicitada > 0
      ? paginaSolicitada
      : 1;

  const datos = await obtenerAnteojos({ page: paginaActual });
  const anteojos = datos.results;

  return (
    <main className="bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Administración
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-6">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
            Panel de gestión
          </h1>

          <Link
            href="/dashboard/anteojos/nuevo"
            className="bg-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#855230]"
          >
            Nuevo anteojo
          </Link>
        </div>

        <p className="mt-5 text-[#444748]">
          Productos registrados: {datos.count}
        </p>

        <section
          aria-label="Gestión del catálogo"
          className="mt-10 overflow-x-auto border border-black/10 bg-white"
        >
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 bg-[#f1eee7]">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Producto
                </th>
                <th scope="col" className="px-6 py-4">
                  SKU
                </th>
                <th scope="col" className="px-6 py-4">
                  Precio
                </th>
                <th scope="col" className="px-6 py-4">
                  Stock
                </th>
                <th scope="col" className="px-6 py-4">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {anteojos.map((anteojo) => (
                <tr
                  key={anteojo.id}
                  className="border-b border-black/10 last:border-b-0"
                >
                  <th scope="row" className="px-6 py-4 font-semibold">
                    {anteojo.nombre}
                  </th>

                  <td className="px-6 py-4">{anteojo.sku}</td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    }).format(Number(anteojo.precio))}
                  </td>

                  <td className="px-6 py-4">{anteojo.stock}</td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/anteojos/${anteojo.id}/editar`}
                      className="font-semibold text-[#855230] underline underline-offset-4"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {anteojos.length === 0 && (
            <p className="p-6 text-[#444748]">
              No hay productos en esta página.
            </p>
          )}
        </section>

        <nav
          aria-label="Paginación del panel"
          className="mt-8 flex items-center justify-center gap-4"
        >
          {datos.previous && (
            <Link
              href={`/dashboard?page=${paginaActual - 1}`}
              className="border border-black px-4 py-2 hover:bg-black hover:text-white"
            >
              ← Anterior
            </Link>
          )}

          <span className="text-sm">Página {paginaActual}</span>

          {datos.next && (
            <Link
              href={`/dashboard?page=${paginaActual + 1}`}
              className="border border-black px-4 py-2 hover:bg-black hover:text-white"
            >
              Siguiente →
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}