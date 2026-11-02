import Link from "next/link";

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

        <h1 className="mt-8 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Nuevo anteojo
        </h1>

        <section
          aria-label="Alta de anteojo"
          className="mt-10 border border-black/10 bg-white p-8"
        >
          <p className="text-[#444748]">
            Acá incorporaremos el formulario para agregar
            un anteojo al catálogo.
          </p>
        </section>
      </div>
    </main>
  );
}