export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Estamos para ayudarte
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Contacto
        </h1>

        <p className="mt-5 max-w-xl leading-7 text-[#444748]">
          Consultanos sobre nuestros anteojos, disponibilidad
          y atención en la óptica.
        </p>

        <section
          aria-labelledby="datos-contacto"
          className="mt-10 border border-black/10 bg-white p-8"
        >
          <h2
            id="datos-contacto"
            className="text-xl font-bold uppercase"
          >
            Nuestros datos
          </h2>

          <p className="mt-4 text-[#444748]">
            Próximamente agregaremos la dirección, los horarios
            y los medios de contacto.
          </p>
        </section>
      </div>
    </main>
  );
}