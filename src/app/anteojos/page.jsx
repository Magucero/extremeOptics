import AnteojoCard from "@/components/AnteojoCard";
import Paginacion from "@/components/Paginacion";
import BuscadorAnteojos from "@/components/BuscadorAnteojos";
import { obtenerAnteojos } from "@/services/anteojos";

export default async function AnteojosPage({ searchParams }) {
  const parametros = await searchParams;

  const busqueda =
    typeof parametros.search === "string"
      ? parametros.search.trim()
      : "";

  const paginaSolicitada = Number(parametros.page);

    const paginaActual =
      Number.isSafeInteger(paginaSolicitada) && paginaSolicitada > 0
        ? paginaSolicitada
        : 1;

    const filtros = {
      page: paginaActual,
    };

    if (busqueda) {
      filtros.search = busqueda;
    }

const datos = await obtenerAnteojos(filtros);

  const anteojos = datos.results;

  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Nuestra colección
        </p>

        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
            Anteojos
          </h1>

          <div className="w-full lg:w-1/2">
            <BuscadorAnteojos busqueda={busqueda} />
          </div>
        </div>

        <p className="mt-6 text-[#444748]">
          Productos encontrados: {datos.count}
        </p>

        <section
          aria-label="Catálogo de anteojos"
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {anteojos.map((anteojo) => (
            <AnteojoCard key={anteojo.id} anteojo={anteojo} />
          ))}
        </section>
        <Paginacion
          paginaActual={paginaActual}
          hayAnterior={Boolean(datos.previous)}
          haySiguiente={Boolean(datos.next)}
          busqueda={busqueda}
        />

        {anteojos.length === 0 && (
          <p className="mt-8 text-[#444748]">
            No se encontraron anteojos con esos criterios.
          </p>
        )}
      </div>
    </main>
  );
}