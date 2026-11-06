import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function obtenerToken() {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
}

async function obtenerUrlApi() {
  const baseUrl = process.env.API_BASE_URL?.replace(/\/+$/, "");

  if (!baseUrl) {
    throw new Error("La URL de la API no está configurada.");
  }

  return baseUrl;
}

// Obtener un anteojo por ID
export async function GET(request, { params }) {
  try {
    const token = await obtenerToken();

    if (!token) {
      return NextResponse.json(
        { detail: "No hay una sesión activa." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const baseUrl = await obtenerUrlApi();

    const respuesta = await fetch(
      `${baseUrl}/anteojos/${encodeURIComponent(id)}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    const contenido = await respuesta.text();

    return new Response(contenido || null, {
      status: respuesta.status,
      headers: {
        "Content-Type":
          respuesta.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Error en GET /api/anteojos/[id]:", error);

    return NextResponse.json(
      { detail: "No se pudo obtener el anteojo." },
      { status: 500 },
    );
  }
}

// Actualizar un anteojo
export async function PATCH(request, { params }) {
  try {
    const token = await obtenerToken();

    if (!token) {
      return NextResponse.json(
        { detail: "No hay una sesión activa." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const datos = await request.json();
    const baseUrl = await obtenerUrlApi();

    const respuesta = await fetch(
      `${baseUrl}/anteojos/${encodeURIComponent(id)}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(datos),
        cache: "no-store",
      },
    );

    const contenido = await respuesta.text();

    return new Response(contenido || null, {
      status: respuesta.status,
      headers: {
        "Content-Type":
          respuesta.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Error en PATCH /api/anteojos/[id]:", error);

    return NextResponse.json(
      { detail: "No se pudo actualizar el anteojo." },
      { status: 500 },
    );
  }
}

// Eliminar un anteojo
export async function DELETE(request, { params }) {
  try {
    const token = await obtenerToken();

    if (!token) {
      return NextResponse.json(
        { detail: "No hay una sesión activa." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const baseUrl = await obtenerUrlApi();

    const respuesta = await fetch(
      `${baseUrl}/anteojos/${encodeURIComponent(id)}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    if (respuesta.status === 204) {
      return new Response(null, { status: 204 });
    }

    const contenido = await respuesta.text();

    return new Response(contenido || null, {
      status: respuesta.status,
      headers: {
        "Content-Type":
          respuesta.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Error en DELETE /api/anteojos/[id]:", error);

    return NextResponse.json(
      { detail: "No se pudo eliminar el anteojo." },
      { status: 500 },
    );
  }
}
