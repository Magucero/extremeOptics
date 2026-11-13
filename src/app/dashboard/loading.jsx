export default function LoadingDashboard() {
  return (
    <main
      aria-busy="true"
      className="bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p
          role="status"
          className="text-sm font-semibold uppercase tracking-widest text-[#855230]"
        >
          Cargando panel de gestión…
        </p>

        <div
          aria-hidden="true"
          className="mt-8 space-y-4 border border-black/10 bg-white p-6 motion-safe:animate-pulse"
        >
          <div className="h-10 bg-[#e5e2db]" />

          {[1, 2, 3, 4].map((fila) => (
            <div key={fila} className="h-14 bg-[#f1eee7]" />
          ))}
        </div>
      </div>
    </main>
  );
}