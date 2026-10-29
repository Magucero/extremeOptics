export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Columna de texto */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 bg-black"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
              Colección 2026 // Óptica
            </p>
          </div>

          <h1 className="text-6xl font-black uppercase leading-[0.95] tracking-tighter sm:text-7xl xl:text-8xl">
            Tu estilo.
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: "1.5px #1c1c18" }}
            >
              Tu forma
            </span>
            de ver.
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-[#444748] sm:text-lg">
            Anteojos que acompañan tu forma de vivir. Explorá
            nuestros modelos de sol y armazones recetados, y
            encontrá el diseño que va con vos.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-4 bg-black px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#855230]"
            >
              Explorar colección
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="#categorias"
              className="text-xs font-semibold uppercase tracking-widest underline underline-offset-8 transition-colors hover:text-[#855230]"
            >
              Encontrá tu estilo
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-black/15 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#444748]">
                Colección
              </p>
              <p className="mt-2 text-lg font-bold">Anteojos de sol</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#444748]">
                Todos los días
              </p>
              <p className="mt-2 text-lg font-bold">Recetados</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#444748]">
                Tu identidad
              </p>
              <p className="mt-2 text-lg font-bold">Tu mirada</p>
            </div>
          </div>
        </div>

        {/* Collage editorial */}
        <div className="relative mx-auto w-full max-w-lg pb-16 pl-6 sm:pl-12">
          <div className="absolute right-0 top-0 z-20 -rotate-6 bg-black px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white sm:-right-2">
            Una nueva forma de mirar
          </div>

          {/* Fotografía principal */}
          <div className="bg-white p-3 shadow-xl">
            <div className="relative aspect-[4/5] bg-[#e5e2db]">
              <div className="flex h-full items-center justify-center p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-[#444748]">
                  Fotografía de campaña
                </p>
              </div>

              <span className="absolute bottom-3 left-3 bg-[#fcf9f2]/95 px-3 py-2 text-[9px] font-semibold uppercase tracking-widest">
                Colección editorial / 2026
              </span>
            </div>
          </div>

          {/* Fotografía superpuesta del producto */}
          <div className="absolute bottom-0 left-0 z-10 w-3/5 bg-white p-3 shadow-2xl">
            <div className="relative flex aspect-square items-center justify-center bg-[#f1eee7] p-4">
              <span className="absolute left-2 top-2 bg-black px-2 py-1 text-[8px] uppercase tracking-widest text-white">
                Detalles que distinguen
              </span>

              <p className="text-center text-[10px] uppercase tracking-widest text-[#444748]">
                Fotografía del anteojo
              </p>
            </div>

            <p className="pt-3 text-[10px] font-semibold uppercase tracking-wider">
              Diseño en cada mirada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}