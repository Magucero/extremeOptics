async function procesarRespuesta(respuesta, mensajeError) {
  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => null);

    if (respuesta.status === 401) {
      throw new Error("Tu sesión expiró. Volvé a iniciar sesión.");
    }

    if (respuesta.status === 403) {
      throw new Error("No tenés permisos para realizar esta operación.");
    }

    throw new Error(error?.detail || error?.message || mensajeError);
  }

  if (respuesta.status === 204) {
    return null;
  }

  return respuesta.json();
}

// Read functions are called from Server Components, where fetch requires an
// absolute URL. They query the Django API directly through API_BASE_URL
// (server-only variable). Mutations below go through /api route handlers
// because they are called from Client Components and need the session cookie.
function urlApi(ruta) {
  const baseUrl = process.env.API_BASE_URL?.replace(/\/+$/, "");

  if (!baseUrl) {
    throw new Error("La URL de la API no está configurada.");
  }

  return `${baseUrl}${ruta}`;
}

// Obtener todos los anteojos con filtros opcionales
export async function obtenerAnteojos(filtros = {}) {
  const parametros = new URLSearchParams(filtros);
  const query = parametros.toString();

  const respuesta = await fetch(
    urlApi(`/anteojos/${query ? `?${query}` : ""}`),
    { cache: "no-store" },
  );

  return procesarRespuesta(respuesta, "No se pudieron obtener los anteojos.");
}

// Obtener el detalle de un anteojo con marca, categoría, material e imágenes
// anidadas. The API detail endpoint returns flat ids without images, while the
// list endpoint returns the nested shape, so the product is looked up in the
// list by its unique SKU.
export async function obtenerDetalleAnteojo(id) {
  const anteojo = await obtenerAnteojoPorId(id);

  if (!anteojo) {
    return null;
  }

  const datos = await obtenerAnteojos({ search: anteojo.sku });

  return datos.results.find((item) => item.id === anteojo.id) ?? null;
}

// Obtener un anteojo por ID (formato plano de la API, con ids relacionados)
export async function obtenerAnteojoPorId(id) {
  const respuesta = await fetch(
    urlApi(`/anteojos/${encodeURIComponent(id)}/`),
    { cache: "no-store" },
  );

  if (respuesta.status === 404) {
    return null;
  }

  return procesarRespuesta(respuesta, "No se pudo obtener el anteojo.");
}

// Crear un anteojo
export async function crearAnteojo(datos) {
  const respuesta = await fetch("/api/anteojos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return procesarRespuesta(respuesta, "No se pudo crear el anteojo.");
}

// Actualizar un anteojo
export async function actualizarAnteojo(id, datos) {
  const respuesta = await fetch(`/api/anteojos/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return procesarRespuesta(respuesta, "No se pudo actualizar el anteojo.");
}

// Eliminar un anteojo
export async function eliminarAnteojo(id) {
  const respuesta = await fetch(`/api/anteojos/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  return procesarRespuesta(respuesta, "No se pudo eliminar el anteojo.");
}
