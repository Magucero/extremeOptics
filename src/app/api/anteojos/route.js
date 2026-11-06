import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Obtener todos los anteojos
export async function GET(request) {
  try {
    const apiBaseUrl = process.env.API_BASE_URL?.replace(/\/+$/, "");

    if (!apiBaseUrl) {
      return NextResponse.json(
        { detail: "La URL de la API no está configurada." },
        { status: 500 },
      );
    }

    const { search } = new URL(request.url);

    const respuesta = await fetch(`${apiBaseUrl}/anteojos/${search}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const contenido = await respuesta.text();

    return new Response(contenido || null, {
      status: respuesta.status,
      headers: {
        "Content-Type":
          respuesta.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Error en GET /api/anteojos:", error);

    return NextResponse.json(
      { detail: "No se pudieron obtener los anteojos." },
      { status: 500 },
    );
  }
}

// Crear un anteojo
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { detail: "No hay una sesión activa." },
        { status: 401 },
      );
    }

    const datos = await request.json();

    const apiBaseUrl = process.env.API_BASE_URL?.replace(/\/+$/, "");

    if (!apiBaseUrl) {
      return NextResponse.json(
        { detail: "La URL de la API no está configurada." },
        { status: 500 },
      );
    }

    const respuesta = await fetch(`${apiBaseUrl}/anteojos/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(datos),
      cache: "no-store",
    });

    const contenido = await respuesta.text();

    return new Response(contenido || null, {
      status: respuesta.status,
      headers: {
        "Content-Type":
          respuesta.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Error en POST /api/anteojos:", error);

    return NextResponse.json(
      { detail: "No se pudo procesar la solicitud." },
      { status: 500 },
    );
  }
}
