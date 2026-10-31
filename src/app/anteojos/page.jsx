export default function AnteojosPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Nuestra colección
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Anteojos
        </h1>

        <p className="mt-5 max-w-xl leading-7 text-[#444748]">
          Explorá nuestros anteojos de sol y armazones recetados.
          Encontrá el diseño que acompaña tu estilo.
        </p>

        <section
          aria-label="Catálogo de anteojos"
          className="mt-10 border border-black/10 bg-white p-8"
        >
          <p className="text-[#444748]">
            Próximamente mostraremos acá los productos de nuestra API.
          </p>
        </section>
      </div>
    </main>
  );
}