import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json({ usuario: null }, { status: 200 });
    }

    const baseUrl = process.env.API_BASE_URL?.replace(/\/+$/, "");

    if (!baseUrl) {
      return NextResponse.json(
        { error: "La URL de la API no está configurada." },
        { status: 500 },
      );
    }

    const respuesta = await fetch(`${baseUrl}/usuarios/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (respuesta.status === 401 || respuesta.status === 403) {
      return NextResponse.json({ usuario: null }, { status: 200 });
    }

    if (!respuesta.ok) {
      return NextResponse.json(
        { error: "No se pudo consultar la sesión." },
        { status: 502 },
      );
    }

    const usuario = await respuesta.json();

    return NextResponse.json({
      usuario: {
        id: usuario.id,
        username: usuario.username,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        isStaff: usuario.is_staff,
      },
    });
  } catch (error) {
    console.error("Error consultando sesión:", error);

    return NextResponse.json(
      { error: "Error al consultar la sesión." },
      { status: 500 },
    );
  }
}
