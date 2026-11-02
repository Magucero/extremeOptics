import Image from "next/image";
import Link from "next/link";

export default function AnteojoCard({ anteojo }) {
  const imagenPrincipal = anteojo.imagenes.find(
    (imagen) => !imagen.es_modelo
  );

  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(Number(anteojo.precio));

  return (
    <article className="flex flex-col border border-black/10 bg-white p-4">
      <div className="relative aspect-square overflow-hidden bg-[#f1eee7]">
        {imagenPrincipal ? (
          <Image
            src={imagenPrincipal.imagen}
            alt={anteojo.nombre}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#444748]">
            Imagen no disponible
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-2 pt-5">
        <p className="text-xs uppercase tracking-widest text-[#855230]">
          {anteojo.marca.nombre}
        </p>

        <h2 className="mt-3 text-xl font-bold">
          {anteojo.nombre}
        </h2>

        <p className="mt-3 text-sm text-[#444748]">
          Categoría: {anteojo.categoria.nombre}
        </p>

        <p className="mt-4 text-2xl font-bold">
          {precioFormateado}
        </p>

        <Link
          href={`/anteojos/${anteojo.id}`}
          className="mt-6 inline-block self-start bg-black px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#855230]"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}