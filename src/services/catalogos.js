export async function obtenerCatalogos() {
  const respuesta = await fetch("/api/catalogos", {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar las opciones del formulario.");
  }

  return respuesta.json();
}
