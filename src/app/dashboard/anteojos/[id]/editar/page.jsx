import Link from "next/link";
import { notFound } from "next/navigation";
import AnteojoForm from "@/components/dashboard/AnteojoForm";
import { obtenerAnteojoPorId } from "@/services/anteojos";

export default async function EditarAnteojoPage({ params }) {
  const { id } = await params;
  const anteojo = await obtenerAnteojoPorId(id);

  if (!anteojo) {
    notFound();
  }

  return (
    <main className="bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard"
          className="text-sm font-semibold underline underline-offset-4 hover:text-[#855230]"
        >
          ← Volver al panel
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Administración / Catálogo
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Editar anteojo
        </h1>

        <p className="mt-5 text-[#444748]">
          Modificando: {anteojo.nombre}
        </p>

        <div className="mt-10 border border-black/10 bg-white p-6 sm:p-8">
          <AnteojoForm anteojo={anteojo} />
        </div>
      </div>
    </main>
  );
}