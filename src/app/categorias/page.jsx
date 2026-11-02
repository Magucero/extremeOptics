import Link from "next/link";
import { obtenerCategorias } from "@/services/categorias";

export default async function CategoriasPage() {
  const datos = await obtenerCategorias();
  const categorias = datos.results;

  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Encontrá tu estilo
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Categorías
        </h1>

        <p className="mt-5 max-w-xl leading-7 text-[#444748]">
          Explorá las categorías de nuestra colección.
        </p>

        <section
          aria-label="Categorías de anteojos"
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categorias.map((categoria) => (
            <article
              key={categoria.id}
              className="border border-black/10 bg-white p-8"
            >
              <h2 className="text-2xl font-bold uppercase">
                {categoria.nombre}
              </h2>

              <p className="mt-4 leading-7 text-[#444748]">
                {categoria.descripcion}
              </p>

              <Link
                href={`/anteojos/${categoria.slug}`}
                className="mt-6 inline-block bg-black px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#855230]"
              >
                Ver colección
              </Link>
            </article>
          ))}
        </section>

        {categorias.length === 0 && (
          <p className="mt-8 text-[#444748]">
            No hay categorías disponibles.
          </p>
        )}
      </div>
    </main>
  );
}