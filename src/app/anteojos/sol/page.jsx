import AnteojoCard from "@/components/AnteojoCard";
import { obtenerAnteojos } from "@/services/anteojos";

export default async function AnteojosSolPage() {
  const datos = await obtenerAnteojos({ categoria: 2 });
  const anteojos = datos.results;

  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Nuestra colección
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Anteojos de sol
        </h1>

        <p className="mt-5 text-[#444748]">
          Productos encontrados: {datos.count}
        </p>

        <section
          aria-label="Catálogo de anteojos de sol"
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {anteojos.map((anteojo) => (
            <AnteojoCard key={anteojo.id} anteojo={anteojo} />
          ))}
        </section>

        {anteojos.length === 0 && (
          <p className="mt-8 text-[#444748]">
            No hay anteojos de sol disponibles.
          </p>
        )}
      </div>
    </main>
  );
}