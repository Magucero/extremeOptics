import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-20 text-[#1c1c18]">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold tracking-widest text-[#855230]">
          ERROR 404
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight">
          Página no encontrada
        </h1>

        <p className="mt-6 leading-7 text-[#444748]">
          La dirección que buscás no existe o ya no está disponible.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block bg-black px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#855230]"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}