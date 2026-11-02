import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { obtenerAnteojoPorId } from "@/services/anteojos";

export default async function DetalleAnteojoPage({ params }) {
  const { id } = await params;
  const anteojo = await obtenerAnteojoPorId(id);

  if (!anteojo) {
    notFound();
  }

  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(Number(anteojo.precio));

  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/anteojos"
          className="text-sm font-semibold underline underline-offset-4 hover:text-[#855230]"
        >
          ← Volver al catálogo
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-[#855230]">
          {anteojo.marca.nombre}
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          {anteojo.nombre}
        </h1>

        <section
          aria-label="Fotografías del anteojo"
          className="mt-10 grid gap-6 sm:grid-cols-2"
        >
          {anteojo.imagenes.map((imagen) => (
            <figure
              key={imagen.id}
              className="border border-black/10 bg-white p-4"
            >
              <div className="relative aspect-square bg-[#f1eee7]">
                <Image
                  src={imagen.imagen}
                  alt={
                    imagen.es_modelo
                      ? `Persona usando ${anteojo.nombre}`
                      : `Anteojo ${anteojo.nombre}`
                  }
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>

              <figcaption className="mt-3 text-xs uppercase tracking-wider text-[#444748]">
                {imagen.es_modelo
                  ? "Así quedan puestos"
                  : "Vista del producto"}
              </figcaption>
            </figure>
          ))}
        </section>

        <section
          aria-label="Información del anteojo"
          className="mt-10 border border-black/10 bg-white p-8"
        >
          <p className="text-3xl font-bold">{precioFormateado}</p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="font-semibold">Categoría</dt>
              <dd className="mt-1 text-[#444748]">
                {anteojo.categoria.nombre}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Material</dt>
              <dd className="mt-1 text-[#444748]">
                {anteojo.material.nombre}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Color del marco</dt>
              <dd className="mt-1 text-[#444748]">
                {anteojo.color_marco}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Color del lente</dt>
              <dd className="mt-1 text-[#444748]">
                {anteojo.color_lente}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Código SKU</dt>
              <dd className="mt-1 text-[#444748]">{anteojo.sku}</dd>
            </div>

            <div>
              <dt className="font-semibold">Disponibilidad</dt>
              <dd className="mt-1 text-[#444748]">
                {anteojo.stock > 0
                  ? `${anteojo.stock} unidades disponibles`
                  : "Sin stock"}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}