import Link from "next/link";
import AnteojoForm from "@/components/dashboard/AnteojoForm";

export default function NuevoAnteojoPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard"
          className="text-sm font-semibold underline underline-offset-4 hover:text-[#855230]"
        >
          ← Volver al panel
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Administración del catálogo
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Nuevo anteojo
        </h1>

        <p className="mt-5 max-w-xl leading-7 text-[#444748]">
          Completá los datos para incorporar un nuevo modelo al catálogo.
        </p>

        <section
          aria-label="Formulario de alta de anteojo"
          className="mt-10 border border-black/10 bg-white p-6 sm:p-8"
        >
          <AnteojoForm />
        </section>
      </div>
    </main>
  );
}
