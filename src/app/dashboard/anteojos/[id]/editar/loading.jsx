export default function LoadingEditarAnteojo() {
  return (
    <main
      aria-busy="true"
      className="bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <p
          role="status"
          className="text-sm font-semibold uppercase tracking-widest text-[#855230]"
        >
          Cargando datos del anteojo…
        </p>

        <div
          aria-hidden="true"
          className="mt-8 space-y-6 border border-black/10 bg-white p-8 motion-safe:animate-pulse"
        >
          <div className="h-8 w-2/3 bg-[#e5e2db]" />
          <div className="h-12 bg-[#e5e2db]" />
          <div className="h-12 bg-[#e5e2db]" />
          <div className="h-12 bg-[#e5e2db]" />
        </div>
      </div>
    </main>
  );
}