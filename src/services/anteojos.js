const API_BASE_URL =
  "https://efiingapi-production.up.railway.app/api";

async function procesarRespuesta(respuesta, mensajeError) {
  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => null);

    if (respuesta.status === 401) {
      throw new Error("Tu sesión expiró. Volvé a iniciar sesión.");
    }

    if (respuesta.status === 403) {
      throw new Error("No tenés permisos para realizar esta operación.");
    }

    throw new Error(
      error?.detail || error?.message || mensajeError
    );
  }

  if (respuesta.status === 204) {
    return null;
  }

  return respuesta.json();
}

// Obtener todos los anteojos con filtros opcionales
export async function obtenerAnteojos(filtros = {}) {
  const parametros = new URLSearchParams(filtros);
  const query = parametros.toString();

  const respuesta = await fetch(
    `${API_BASE_URL}/anteojos/${query ? `?${query}` : ""}`,
    {
      cache: "no-store",
    }
  );

  return procesarRespuesta(
    respuesta,
    "No se pudieron obtener los anteojos."
  );
}

// Obtener un anteojo por ID
export async function obtenerAnteojoPorId(id) {
  const respuesta = await fetch(
    `${API_BASE_URL}/anteojos/${encodeURIComponent(id)}/`,
    {
      cache: "no-store",
    }
  );

  if (respuesta.status === 404) {
    return null;
  }

  return procesarRespuesta(
    respuesta,
    "No se pudo obtener el anteojo."
  );
}

// Crear un anteojo mediante Next.js y sus cookies de sesión
export async function crearAnteojo(datos) {
  const respuesta = await fetch("/api/anteojos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return procesarRespuesta(
    respuesta,
    "No se pudo crear el anteojo."
  );
}

// Actualizar un anteojo
export async function actualizarAnteojo(id, datos) {
  const respuesta = await fetch(
    `/api/anteojos/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    }
  );

  return procesarRespuesta(
    respuesta,
    "No se pudo actualizar el anteojo."
  );
}

// Eliminar un anteojo
export async function eliminarAnteojo(id) {
  const respuesta = await fetch(
    `/api/anteojos/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );

  return procesarRespuesta(
    respuesta,
    "No se pudo eliminar el anteojo."
  );
}