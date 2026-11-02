export async function obtenerAnteojos(filtros = {}) {
  const parametros = new URLSearchParams(filtros);

  const respuesta = await fetch(
    `${process.env.API_BASE_URL}/anteojos/?${parametros.toString()}`,
    { cache: "no-store" }
  );

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los anteojos");
  }

  return respuesta.json();
}

export async function obtenerAnteojoPorId(id) {
  const respuesta = await fetch(
    `${process.env.API_BASE_URL}/anteojos/${encodeURIComponent(id)}/`,
    { cache: "no-store" }
  );

  if (respuesta.status === 404) {
    return null;
  }

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el anteojo");
  }

  return respuesta.json();
}