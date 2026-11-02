export default function LoadingAnteojos() {
  return (
    <main
      aria-busy="true"
      className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p
          role="status"
          className="text-sm font-semibold uppercase tracking-widest text-[#855230]"
        >
          Cargando anteojos…
        </p>

        <div
          aria-hidden="true"
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border border-black/10 bg-white p-4 motion-safe:animate-pulse"
            >
              <div className="aspect-square bg-[#e5e2db]" />
              <div className="mt-4 h-5 w-3/4 bg-[#e5e2db]" />
              <div className="mt-3 h-4 w-1/3 bg-[#e5e2db]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}