import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Administración
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Panel de gestión
        </h1>

        <p className="mt-5 max-w-xl leading-7 text-[#444748]">
          Desde esta sección podrás administrar los anteojos
          del catálogo.
        </p>

        <section
          aria-labelledby="gestion-catalogo"
          className="mt-10 border border-black/10 bg-white p-8"
        >
          <h2
            id="gestion-catalogo"
            className="text-xl font-bold uppercase"
          >
            Catálogo de anteojos
          </h2>

          <p className="mt-4 leading-7 text-[#444748]">
            Acá incorporaremos las opciones para crear,
            editar y eliminar productos.
          </p>

          <Link
            href="/anteojos"
            className="mt-6 inline-block bg-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#855230]"
          >
            Ver catálogo
          </Link>
        </section>
      </div>
    </main>
  );
}