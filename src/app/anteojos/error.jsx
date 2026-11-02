"use client";

import Link from "next/link";

export default function ErrorAnteojos({ reset }) {
  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#855230]">
          Ocurrió un problema
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight">
          No pudimos cargar esta sección
        </h1>

        <p role="alert" className="mt-6 leading-7 text-[#444748]">
          Intentá nuevamente en unos momentos.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-black px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#855230]"
          >
            Reintentar
          </button>

          <Link
            href="/"
            className="border border-black px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}