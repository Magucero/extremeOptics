export default function BuscadorAnteojos({ busqueda = "" }) {
  return (
    <form
      action="/anteojos"
      method="GET"
      role="search"
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label
          htmlFor="busqueda-anteojos"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider"
        >
          Buscar anteojos
        </label>

        <input
          id="busqueda-anteojos"
          name="search"
          type="search"
          defaultValue={busqueda}
          placeholder="Nombre, marca, SKU o color"
          className="w-full border border-black/20 bg-white px-4 py-3 text-sm focus:border-[#855230] focus:outline-none focus:ring-2 focus:ring-[#855230]"
        />
      </div>

      <button
        type="submit"
        className="bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#855230]"
      >
        Buscar
      </button>
    </form>
  );
}