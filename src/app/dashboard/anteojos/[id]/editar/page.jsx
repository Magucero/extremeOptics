import Link from "next/link";
import { Suspense } from "react";

async function ContenidoEditarAnteojo({ params }) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Administración / Catálogo
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Editar anteojo
        </h1>

        <p className="mt-5 leading-7 text-[#444748]">
          Estás preparando la edición del anteojo con identificador: {id}.
        </p>

        <section className="mt-10 border border-black/10 bg-white p-8">
          <p className="leading-7 text-[#444748]">
            El formulario de edición se incorporará en esta sección.
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-block bg-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#855230]"
          >
            Volver al panel
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function EditarAnteojoPage({ params }) {
  return (
    <Suspense
      fallback={
        <p className="min-h-screen bg-[#fcf9f2] p-10 text-[#444748]">
          Cargando edición...
        </p>
      }
    >
      <ContenidoEditarAnteojo params={params} />
    </Suspense>
  );
}
