export async function obtenerCategorias() {
  const respuesta = await fetch(
    `${process.env.API_BASE_URL}/categorias/`,
    { cache: "no-store" }
  );

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener las categorías");
  }

  return respuesta.json();
}