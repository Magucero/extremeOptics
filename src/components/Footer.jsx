export default function Footer() {
  return (
    <footer className="border-t border-[#1c1c18]/15 bg-[#fcf9f2] px-5 py-10 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              EXTREME OPTICS
              <span className="text-[#997343]">.</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#1c1c18]/65">
              Anteojos que combinan diseño, comodidad y personalidad.
              Descubrí una nueva forma de ver y expresar tu estilo.
            </p>
          </div>

          <div className="md:justify-self-end">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em]">
              Integrantes
            </h3>

            <ul className="mt-4 grid gap-2 text-sm text-[#1c1c18]/65">
              <li>Perez Lucas</li>
              <li>Neira Leonardo</li>
              <li>Rodríguez Joaquín</li>
              <li>Pereyra Thomas</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1c1c18]/15 pt-6">
          <p className="text-xs text-[#1c1c18]/55">
            © {new Date().getFullYear()} Extreme Optics. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}